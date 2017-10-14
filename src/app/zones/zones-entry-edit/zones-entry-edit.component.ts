// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZonesDNSTypeService } from './zones-dns-type.service';
import { ZoneDataEntry, DNSType, DNSTypeList } from '../../shared/zone-data';

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
      name: new FormControl(
        this.entry && this.entry.name || null,
        [
          Validators.required,
          Validators.pattern('^(?:@|(?!-)[^.@]{,63}(?:\.(?!-)[^.@]{,63})*)$')
        ]
      ),
      ttl:  new FormControl(
        this.entry && this.entry.ttl || null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(2**31-1)
        ]
      ),
      type: new FormControl(
        this.entry && this.entry.type || null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.pattern('^[A-Z]*$')
        ]
      ),
      data: new FormControl(
        this.entry && this.entry.data || null,
        [
          Validators.required,
          Validators.minLength(1)
        ]
      )
    });

    this.DNSTypeValueChanged();



  }

  getZoneDNSType() {
    this.zoneDNSType = [];
    this.zoneDNSTypeService.getDNSType().subscribe(
      res => this.zoneDNSType = res
    );
  }

  DNSTypeValueChanged() {
    this.myForm.get('type').valueChanges.subscribe(
      (newtype: string) =>
      {
        newtype = newtype.toLocaleUpperCase();
        var newpattern : string = '';
        var item : DNSType;
        // TODO: voir pour optimiser avec une hashmap
        for(item of this.zoneDNSType)
        {
          if( newtype == item.name )
          {
            newpattern = item.regexp
            break;
          }
        }
        this.myForm.get('data').setValidators([
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(newpattern)
        ]);
        this.myForm.get('data').updateValueAndValidity();
      }
    );
  }
}
