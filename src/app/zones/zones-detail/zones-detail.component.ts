// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BaseComponent } from '@app/common/base-component.service';
import { Error } from '@app/common/error/error';
import { AuthHttpSession } from '@app/common/auth.service';

import { ZoneData, ZoneDataEntry } from '@app/zones/services/zone-data';
import { ZonesDetailService } from '@app/zones/services/zones-detail.service';
import { ZonesEntryEditOperation, ZonesEntryEditResultOperation, ZonesEntryEditResultOperationStatus } from '@app/zones/zones-entry-edit/zones-entry-edit.component';

class modalData
{
  title: string;
  hasDelete: boolean;
  canSubmit: boolean;
  button: EventEmitter<ZonesEntryEditOperation>;
}

@Component({
  selector: 'app-zones-detail',
  templateUrl: './zones-detail.component.html',
  styleUrls: ['./zones-detail.component.scss']
})

export class ZonesDetailComponent extends BaseComponent implements OnInit
{

  modalView: modalData;
  modalWindow: NgbModalRef;
  zone: ZoneData;
  error: Error;
  currentEntry: ZoneDataEntry;

  myForm: FormGroup;

  constructor(
    private zonesDetailService: ZonesDetailService, 
    private route: ActivatedRoute,
    private modalService: NgbModal
  )
  { 
    super();
    this.modalView = new modalData;
    this.modalView.button = new EventEmitter<ZonesEntryEditOperation>();
  }

  ngOnInit()
  {
    this.zone = null;
    this.modalView.title = null;
    this.modalView.hasDelete = false;
    this.modalView.canSubmit = false;
    this.myForm = new FormGroup(
    {
      filter_name: new FormControl(null),
      filter_ttl:  new FormControl(null),
      filter_type: new FormControl(null),
      filter_data: new FormControl(null)
    });
    this.route.params.subscribe((params: { name: string }) => {
      this.getZoneData(params.name);
    });
  }

  doUpdateZone()
  {
    if( this.zone && this.zone.name )
      this.getZoneData(this.zone.name);
  }

  getZoneData(name: string)
  {
    this.error = null;
    this.zonesDetailService.getZoneData(this, name).subscribe(
      res => this.zone = res,
      err => this.error = err
    );
  }

  edit(modele, entry: ZoneDataEntry)
  {
    this.currentEntry = entry;
    //this.modalWindow = this.modalService.open(modele).result.then((result) => {
    this.modalWindow = this.modalService.open(modele, 
      {
        beforeDismiss: () => 
        {
          this.modalView.button.emit(ZonesEntryEditOperation.cancel);
          return true;
        }
      }
    );
    this.modalWindow.result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.modalView.button.emit(ZonesEntryEditOperation.cancel);
    });
  }

  onEditFormReset()
  {
    this.modalWindow.dismiss();
  }

  onEditFormDelete()
  {
    this.modalView.button.emit(ZonesEntryEditOperation.delete);
  }

  onEditFormSubmit()
  {
    this.modalView.button.emit(ZonesEntryEditOperation.save);
  }

  doUpdateZoneEntry(data: ZonesEntryEditResultOperation)
  {
    switch( data.operationStatus )
    {
      case ZonesEntryEditResultOperationStatus.error:
    // retour.message
        this.modalWindow.close();
        break;
      case ZonesEntryEditResultOperationStatus.updated:
        this.zone.entries = this.zone.entries.map(
          (e: ZoneDataEntry) =>
            {
              if( ZoneDataEntry.isEqual(e, data.oldEntry) )
                return data.newEntry;
              return e;
            }
          );
        this.modalWindow.close();
        break;
      case ZonesEntryEditResultOperationStatus.added:
        let tmp = this.zone.entries.slice();
        tmp.push(data.newEntry);
        this.zone.entries = tmp;
        this.modalWindow.close();
        break;
      case ZonesEntryEditResultOperationStatus.deleted:
        this.zone.entries = this.zone.entries.filter( (e) => !ZoneDataEntry.isEqual(e, data.oldEntry));
        this.modalWindow.close();
        break;
      case ZonesEntryEditResultOperationStatus.canceled:
      default:
        break;
    }
  }
}
