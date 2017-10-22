// vim: set tabstop=2 expandtab filetype=javascript:
import { Error } from '../../shared/error/error';
import { ZonesListService } from '../services/zones-list.service';
import { Component, OnInit } from '@angular/core';
import { AuthHttpSession } from '../../check-auth/auth.service';
import { Response } from '@angular/http';
import { ZoneListData } from '../services/zone-list-data';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.scss']
})
export class ZonesListComponent implements OnInit {

  zones: ZoneListData[] = [];
  error: Error;

  constructor(private zoneListService: ZonesListService) { }

  ngOnInit() {
    this.zoneListService.getZones().subscribe(
      res => this.zones = res,
      err => this.error = err
    )
  }
}
