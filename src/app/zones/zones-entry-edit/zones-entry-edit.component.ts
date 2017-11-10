// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ZonesDNSTypeService } from '../services/zones-dns-type.service';
import { ZonesEntryService } from '../services/zones-entry.service';
import { ZoneData, ZoneDataEntry, DNSType, DNSTypeList } from '../services/zone-data';

export enum ZonesEntryEditOperation
{
  save,
  delete,
  cancel
}

@Component({
  selector: 'zones-entry-edit',
  templateUrl: './zones-entry-edit.component.html',
  styleUrls: ['./zones-entry-edit.component.scss']
})
export class ZonesEntryEditComponent implements OnInit, OnDestroy
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

  constructor(private zonesEntryService: ZonesEntryService, private zoneDNSTypeService: ZonesDNSTypeService) { }

  ngOnInit() {
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
          Validators.pattern('(?:@|(?!-)[^.@]{1,63}(?:\.(?!-)[^.@]{1,63})*)')
        ]
      ),
      ttl:  new FormControl(
        this.entry   && this.entry.ttl   ||
        this.prefill && this.prefill.ttl ||
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

  ngOnDestroy()
  {
    for (let sub of this.subscription)
    {
      sub.unsubscribe();
    }
  }

  lazyUnsubscribe(o: Subscription)
  {
    this.subscription.push(o);
  }

  propagateValidity()
  {
    this.lazyUnsubscribe(
      this.myForm.statusChanges.subscribe(
        data =>
        {
          this.canSubmit.emit(!this.myForm.valid);
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
            alert(buttonAction);
          }
        )
      );
  }

  getZoneDNSType()
  {
    this.zoneDNSType = [];
    this.lazyUnsubscribe(
      this.zoneDNSTypeService.getDNSType().subscribe(
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
    this.zonesEntryService.add(this.zone, this.myForm.value);
  }

  onReset()
  {
    this.myForm.reset(this.resetValue);
    this.updateDataValidator(this.resetValue.type);
  }

  onDelete()
  {
  }
}
