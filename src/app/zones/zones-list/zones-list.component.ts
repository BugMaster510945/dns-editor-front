// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { AuthHttpSession } from '@app/common/auth.service';
import { BaseComponent } from '@app/common/base-component.service';

import { ZonesListService } from '@app/zones/services/zones-list.service';
import { ZoneListData } from '@app/zones/services/zone-list-data';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.scss']
})
export class ZonesListComponent extends BaseComponent implements OnInit
{
  zones: ZoneListData[] = [];

  constructor(private zoneListService: ZonesListService)
  {
    super();
  }

  ngOnInit()
  {
    this.zoneListService.getZones(this).subscribe(
      res => this.zones = res,
      err => {}
    )
  }
}
