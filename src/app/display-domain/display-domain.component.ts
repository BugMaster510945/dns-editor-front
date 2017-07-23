// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit } from '@angular/core';
import { AuthHttpSession } from '../check-auth/auth.service';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

export interface zoneDataType {
  name: String;
  read: Boolean;
  write: Boolean;
}

@Component({
  selector: 'app-display-domain',
  templateUrl: './display-domain.component.html',
  styleUrls: ['./display-domain.component.scss']
})

export class DisplayDomainComponent implements OnInit {

  public zones: zoneDataType[] = [];
  //private zones;

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
