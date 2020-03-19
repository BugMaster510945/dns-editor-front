// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { BaseComponent } from '@app/common/base-component';

import { ZoneData, ZoneDataEntry } from '@app/zones/services/zone-data';
import { ZonesDetailService } from '@app/zones/services/zones-detail.service';
import {
  ZonesEntryEditOperation,
  ZonesEntryEditResultOperation,
  ZonesEntryEditResultOperationStatus
} from '@app/zones/zones-entry-edit/zones-entry-edit.component';

class ModalData {
  title /* : string */ = '';
  hasDelete /* : boolean */ = false;
  canSubmit /* : boolean */ = false;
  button?: EventEmitter<ZonesEntryEditOperation>;
}

@Component({
  selector: 'app-zones-detail',
  templateUrl: './zones-detail.component.html',
  styleUrls: ['./zones-detail.component.scss']
})

export class ZonesDetailComponent extends BaseComponent implements OnInit {
  modalView /* : ModalData */ = new ModalData();
  modalWindow?: NgbModalRef;
  zone /* : ZoneData */ = new ZoneData();
  currentEntry /* : ZoneDataEntry */ = new ZoneDataEntry();

  myForm: FormGroup;

  constructor(
    private zonesDetailService: ZonesDetailService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    super();
    this.modalView.button = new EventEmitter<ZonesEntryEditOperation>();
    this.myForm = new FormGroup(
      {
        filter_name: new FormControl(null),
        filter_ttl: new FormControl(null),
        filter_type: new FormControl(null),
        filter_data: new FormControl(null)
      });
  }

  ngOnInit() {
    this.zone = new ZoneData();
    this.modalView.title = '';
    this.modalView.hasDelete = false;
    this.modalView.canSubmit = false;
    this.lazyUnsubscribe(
      this.route.params.subscribe(
        (params) => {
          this.getZoneData(params.name);
        }
      )
    );
  }

  doUpdateZone() {
    if (this.zone && this.zone.name) {
      this.getZoneData(this.zone.name);
    }
  }

  getZoneData(name: string) {
    this.zonesDetailService.getZoneData(this, name).subscribe(
      res => this.zone = res
    );
  }

  sendEntryOperation(v: ZonesEntryEditOperation) {
    if (this.modalView.button) {
      this.modalView.button.emit(v);
    }
  }

  edit(modele: any, entry: ZoneDataEntry) {
    this.currentEntry = entry;
    this.modalWindow = this.modalService.open(modele,
      {
        beforeDismiss: () => {
          this.sendEntryOperation(ZonesEntryEditOperation.cancel)
          return true;
        }
      }
    );
    this.modalWindow.result.then((_) => {
      // code is elsewhere
    });
  }

  onEditFormReset() {
    if (this.modalWindow) {
      this.modalWindow.dismiss();
    }
  }

  doClose() {
    if (this.modalWindow) {
      this.modalWindow.close();
    }
  }

  onEditFormDelete() {
    this.sendEntryOperation(ZonesEntryEditOperation.delete);
  }

  onEditFormSubmit() {
    this.sendEntryOperation(ZonesEntryEditOperation.save);
  }

  doUpdateZoneEntry(data: ZonesEntryEditResultOperation) {
    switch (data.operationStatus) {
      case ZonesEntryEditResultOperationStatus.updated:
        this.zone.entries = this.zone.entries.map(
          (e: ZoneDataEntry) => {
            if (ZoneDataEntry.isEqual(e, data.oldEntry)) {
              return data.newEntry;
            }
            return e;
          }
        );
        this.doClose();
        break;
      case ZonesEntryEditResultOperationStatus.added:
        const tmp = this.zone.entries.slice();
        tmp.push(data.newEntry);
        this.zone.entries = tmp;
        this.doClose();
        break;
      case ZonesEntryEditResultOperationStatus.deleted:
        this.zone.entries = this.zone.entries.filter((e) => !ZoneDataEntry.isEqual(e, data.oldEntry));
        this.doClose();
        break;
      case ZonesEntryEditResultOperationStatus.canceled:
      default:
        break;
    }
  }
}
