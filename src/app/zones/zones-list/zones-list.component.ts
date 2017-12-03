// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { Error } from '@app/common/error/error';
import { AuthHttpSession } from '@app/common/auth.service';

import { ZonesListService } from '@app/zones/services/zones-list.service';
import { ZoneListData } from '@app/zones/services/zone-list-data';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.scss']
})
export class ZonesListComponent implements OnInit
{

  zones: ZoneListData[] = [];
  error: Error;

  constructor(private zoneListService: ZonesListService) { }

  ngOnInit()
  {
    this.zoneListService.getZones().subscribe(
      res => this.zones = res,
      err => this.error = err
    )
  }
}
