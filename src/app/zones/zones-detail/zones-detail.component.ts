// vim: set tabstop=2 expandtab filetype=javascript:
import { Error } from '../../shared/error/error';
import { ActivatedRoute } from '@angular/router';
import { ZoneData } from './zone-data';
import { ZonesDetailService } from './zones-detail.service';
import { Component, OnInit } from '@angular/core';
import { AuthHttpSession } from '../../check-auth/auth.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-zones-detail',
  templateUrl: './zones-detail.component.html',
  styleUrls: ['./zones-detail.component.scss']
})
export class ZonesDetailComponent implements OnInit {

  zone: ZoneData;
  error: Error;

  constructor(private zonesDetailService: ZonesDetailService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: { name: string }) => {
      this.getZoneData(params.name);
    });
  }

  getZoneData(name: string) {
    this.zonesDetailService.getZoneData(name).subscribe(
      res => this.zone = res,
      err => this.error = err
    );
  }
}
