// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit, EventEmitter, Input, Output, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BaseComponent } from '@app/common/base-component.service';

import { ZonesDNSTypeService } from '@app/zones/services/zones-dns-type.service';
import { ZonesEntryService } from '@app/zones/services/zones-entry.service';
import { ZoneData, ZoneDataEntry, DNSType, DNSTypeList } from '@app/zones/services/zone-data';

export enum ZonesEntryEditOperation
{
  save,
  delete,
  cancel
}

export enum ZonesEntryEditResultOperationStatus
{
  canceled,
  added,
  deleted,
  updated
}

export class ZonesEntryEditResultOperation
{
  operationStatus: ZonesEntryEditResultOperationStatus;
  oldEntry: ZoneDataEntry;
  newEntry: ZoneDataEntry;
}

@Component({
  selector: 'zones-entry-edit',
  templateUrl: './zones-entry-edit.component.html',
  styleUrls: ['./zones-entry-edit.component.scss']
})
export class ZonesEntryEditComponent extends BaseComponent implements OnInit
{
  zoneDNSType: DNSTypeList;

  myForm: FormGroup;
  resetValue: ZoneDataEntry;
  header: string;
  hasButton: boolean;
  needDeleteButton: boolean;

  subscription: Subscription[] = [];

  @Input()  zone: ZoneData;
  @Input()  prefill: ZoneDataEntry;
  @Input()  entry: ZoneDataEntry;
  @Output() entryChange = new EventEmitter<ZoneDataEntry>();

  @Input()  button: EventEmitter<ZonesEntryEditOperation>;
  @Output() title = new EventEmitter<string>();
  @Output() hasDelete = new EventEmitter<boolean>();
  @Output() canSubmit = new EventEmitter<boolean>();
  @Output() operationStatus = new EventEmitter<ZonesEntryEditResultOperation>();

  @ViewChild('modalContentValidTpl')
  private modalContentValidTpl: TemplateRef<any>;

  constructor(
    private zonesEntryService: ZonesEntryService, 
    private zoneDNSTypeService: ZonesDNSTypeService,
    private modalService: NgbModal
  )
  {
    super();
  }

  ngOnInit()
  {
    this.needDeleteButton = this.entry ? true : false;
    this.header = this.entry ? "Modification" : "Ajout";
    this.hasDelete.emit( this.needDeleteButton );
    this.hasButton = this.button ? false : true;
    //if( /* this.title.hasObservers()*/ )
    if( this.title.observers.length > 0 )
    {
      this.title.emit(this.header);
      this.header = null;
    }
    this.myForm = new FormGroup(
    {
      name: new FormControl(
        this.entry   && this.entry.name   ||
        this.prefill && this.prefill.name ||
        '',
        [
          Validators.required,
          Validators.pattern('(?:@|[^.@-][^.@]{0,62}(?:\.(?!-)[^.@]{1,63})*)')
        ]
      ),
      ttl:  new FormControl(
        this.entry   && this.entry.ttl   ||
        this.prefill && (this.prefill.ttl!=NaN) && this.prefill.ttl ||
        this.zone.minimum                ||
        '',
        [
          Validators.required,
          Validators.pattern('\\d+'),
          Validators.min(1),
          Validators.max(2**31-1)
        ]
      ),
      type: new FormControl(
        this.entry   && this.entry.type   ||
        this.prefill && this.prefill.type ||
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.pattern('[A-Z]*')
        ]
      ),
      data: new FormControl(
        this.entry   && this.entry.data   ||
        this.prefill && this.prefill.data ||
        '',
        [
          Validators.required,
          Validators.minLength(1)
        ]
      )
    });
    this.propagateValidity();
    this.subscribeButtonEvent();

    this.getZoneDNSType();
    this.DNSTypeValueChanged();
    this.myForm.get('type').setValue( /* Make uppercase if needed */
      this.myForm.get('type').value.toLocaleUpperCase()
    );
    this.resetValue = this.myForm.value;
  }


  isSubmitDisable()
  {
    return this.myForm.invalid || this.resetValue === undefined ||
           ZoneDataEntry.isEqual(this.resetValue, this.myForm.value);
  }

  propagateValidity()
  {
    this.lazyUnsubscribe(
      this.myForm.statusChanges.subscribe(
        data =>
        {
          this.canSubmit.emit( this.isSubmitDisable() );
        }
      )
    );
  }

  subscribeButtonEvent()
  {
    if( this.button )
      this.lazyUnsubscribe(
        this.button.subscribe(
          (buttonAction) =>
          {
            switch(buttonAction)
            {
              case ZonesEntryEditOperation.save:
              { 
                this.onSubmit();
                break; 
              } 
              case ZonesEntryEditOperation.delete:
              { 
                this.onDelete();
                break; 
              } 
              //case ZonesEntryEditOperation.cancel:
              default:
              { 
                this.onReset();
                break; 
              }
            }
          }
        )
      );
  }

  getZoneDNSType()
  {
    this.zoneDNSType = [];
    this.lazyUnsubscribe(
      this.zoneDNSTypeService.getDNSType(this).subscribe(
        res =>
        {
          this.zoneDNSType = res;
          // Apply validator
          this.updateDataValidator(this.myForm.get('type').value);
        }
      )
    );
  }

  getRegexpFromType(theType: string): string
  {
    var item : DNSType;
    // TODO: voir pour optimiser avec une hashmap
    for(item of this.zoneDNSType)
    {
      if( theType == item.name )
      {
        return item.regexp;
      }
    }
    return '';
  }

  updateDataValidator(theType: string)
  {
    this.myForm.get('data').setValidators([
      Validators.required,
      Validators.minLength(1),
      Validators.pattern(this.getRegexpFromType(theType))
     ]);
    this.myForm.get('data').updateValueAndValidity();
  }

  DNSTypeValueChanged()
  {
    this.lazyUnsubscribe(
      this.myForm.get('type').valueChanges.subscribe(
        (newtype: string) =>
        {
          var upValue = newtype.toLocaleUpperCase();
          if( upValue != newtype )
          {
            this.myForm.get('type').setValue(upValue);
            return;
          }
          this.updateDataValidator(newtype);
        }
      )
    );
  }

  onSubmit()
  {
    // Je base le test sur l'affichage du boutton suppression
    // initialisé lors du ngOnInit
    // Si présent ==> Modification sinon Ajout
    if( this.needDeleteButton )
      this.doSubmitUpdate();
    else
      this.doSubmitAdd();
  }

  doSubmitUpdate()
  {
    this.zonesEntryService.update(this, this.zone, this.resetValue, this.myForm.value).subscribe(
      (response) => 
      {
        let retour : ZonesEntryEditResultOperation = new ZonesEntryEditResultOperation();
        retour.operationStatus = ZonesEntryEditResultOperationStatus.updated;
        retour.oldEntry = this.resetValue;
        retour.newEntry = this.myForm.value;
    
        this.operationStatus.emit(retour);
      },
      (error) => {}
    );
  }

  doSubmitAdd()
  {
    this.zonesEntryService.add(this, this.zone, this.myForm.value).subscribe(
      (response) => 
      {
        let retour : ZonesEntryEditResultOperation = new ZonesEntryEditResultOperation();
        retour.operationStatus = ZonesEntryEditResultOperationStatus.added;
        retour.newEntry = this.myForm.value;
    
        this.operationStatus.emit(retour);
      }, 
      (error) => {}
    );
  }

  onReset()
  {
    this.myForm.reset(this.resetValue);
    this.updateDataValidator(this.resetValue.type);

    let retour : ZonesEntryEditResultOperation = new ZonesEntryEditResultOperation();
    retour.operationStatus = ZonesEntryEditResultOperationStatus.canceled;
    
    this.operationStatus.emit(retour);
  }

  onDelete()
  {
    this.modalService.open(this.modalContentValidTpl).result.then(
      (result) =>
      {
        if( result )
        {
          this.zonesEntryService.del(this, this.zone, this.resetValue).subscribe(
            (response) => 
            {
              let retour : ZonesEntryEditResultOperation = new ZonesEntryEditResultOperation();
              retour.operationStatus = ZonesEntryEditResultOperationStatus.deleted;
              retour.oldEntry = this.resetValue;
    
              this.operationStatus.emit(retour);
            },
            (error) => {}
          );
        }
        else
        // On annule toute modification
          this.onReset();
      },
      (reason) =>
      {
        // On annule toute modification
        this.onReset();
      }
    );
  }
}
