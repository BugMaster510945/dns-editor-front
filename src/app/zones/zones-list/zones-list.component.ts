// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit } from '@angular/core';
import { AuthHttpSession } from '../../check-auth/auth.service';
import { Response } from '@angular/http';

export interface zoneDataType {
  name: String;
  read: Boolean;
  write: Boolean;
}

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.scss']
})
export class ZonesListComponent implements OnInit {

  public zones: zoneDataType[] = [];

  constructor(private http: AuthHttpSession) { }

  ngOnInit() {
    this.getZones();
  }

  getZones() {
    this.zones = new Array();
    this.http.get('/api/zones')
      .subscribe(
        (response: Response) =>
        {
          if(  response
            && response.status === 200 )
          {
            let data = response.json();

            if( data['status'] === 200 )
              this.zones = data['detail'];
          }
        }
      );
  }
}
