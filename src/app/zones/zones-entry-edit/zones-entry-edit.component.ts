// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ZonesDNSTypeService } from './zones-dns-type.service';
import { ZoneDataEntry, DNSTypeList } from '../../shared/zone-data';

@Component({
  selector: 'zones-entry-edit',
  templateUrl: './zones-entry-edit.component.html',
  styleUrls: ['./zones-entry-edit.component.scss']
})
export class ZonesEntryEditComponent implements OnInit {
  zoneDNSType: DNSTypeList;

  myForm: FormGroup;

  @Input()  entry: ZoneDataEntry;
  @Output() entryChange = new EventEmitter<ZoneDataEntry>();

  constructor(private zoneDNSTypeService: ZonesDNSTypeService) { }

  ngOnInit() {
    this.getZoneDNSType();
    this.myForm = new FormGroup(
    {
      name: new FormControl(this.entry && this.entry.name || null),
      ttl:  new FormControl(this.entry && this.entry.ttl || null),
      type: new FormControl(this.entry && this.entry.type || null),
      data: new FormControl(this.entry && this.entry.data || null)
    });
  }

  getZoneDNSType() {
    this.zoneDNSType = [];
    this.zoneDNSTypeService.getDNSType().subscribe(
      res => this.zoneDNSType = res
    );
  }
}
