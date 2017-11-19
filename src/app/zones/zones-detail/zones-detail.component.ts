// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Error } from '../../shared/error/error';
import { AuthHttpSession } from '../../check-auth/auth.service';
import { ZoneData, ZoneDataEntry } from '../services/zone-data';
import { ZonesDetailService } from '../services/zones-detail.service';
import { ZonesEntryEditOperation } from '../zones-entry-edit/zones-entry-edit.component';

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

export class ZonesDetailComponent implements OnInit {

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
    this.modalView = new modalData;
    this.modalView.button = new EventEmitter<ZonesEntryEditOperation>();
  }

  ngOnInit() {
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

  getZoneData(name: string) {
    this.zone = null;
    this.error = null;
    this.zonesDetailService.getZoneData(name).subscribe(
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
    this.modalWindow.close();
  }

  onEditFormSubmit()
  {
    this.modalView.button.emit(ZonesEntryEditOperation.save);
    this.modalWindow.close();
  }
}
