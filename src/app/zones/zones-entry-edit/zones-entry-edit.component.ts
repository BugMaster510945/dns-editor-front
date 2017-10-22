// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZonesDNSTypeService } from '../services/zones-dns-type.service';
import { ZoneDataEntry, DNSType, DNSTypeList } from '../services/zone-data';

@Component({
  selector: 'zones-entry-edit',
  templateUrl: './zones-entry-edit.component.html',
  styleUrls: ['./zones-entry-edit.component.scss']
})
export class ZonesEntryEditComponent implements OnInit {
  zoneDNSType: DNSTypeList;

  myForm: FormGroup;
  resetValue: ZoneDataEntry;

  @Input()  prefill: ZoneDataEntry;
  @Input()  entry: ZoneDataEntry;
  @Output() entryChange = new EventEmitter<ZoneDataEntry>();

  constructor(private zoneDNSTypeService: ZonesDNSTypeService) { }

  ngOnInit() {
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

    this.getZoneDNSType();
    this.DNSTypeValueChanged();
    this.myForm.get('type').setValue( /* Make uppercase if needed */
      this.myForm.get('type').value.toLocaleUpperCase()
    );
    this.resetValue = this.myForm.value;
  }

  getZoneDNSType()
  {
    this.zoneDNSType = [];
    this.zoneDNSTypeService.getDNSType().subscribe(
      res =>
      {
        this.zoneDNSType = res;
        // Apply validator
        this.updateDataValidator(this.myForm.get('type').value);
      }
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

  DNSTypeValueChanged() {
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
    );
  }

  onSubmit()
  {
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
