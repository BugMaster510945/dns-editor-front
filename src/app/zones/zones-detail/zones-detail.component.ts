// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit } from '@angular/core';
import { AuthHttpSession } from '../../check-auth/auth.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-zones-detail',
  templateUrl: './zones-detail.component.html',
  styleUrls: ['./zones-detail.component.scss']
})
export class ZonesDetailComponent implements OnInit {

  constructor(private http: AuthHttpSession) { }

  ngOnInit() {
    this.getZoneData();
  }

  getZoneData() {
    this.http.get('/api/zones/planchon.org/entries')
      .subscribe(
        (response: Response) =>
        {
          console.log(response.text());
          if(  response
            && response.status === 200 )
          {
            let data = response.json();

            //if( data['status'] === 200 )
              //this.zones = data['detail'];
          }
        }
      );
  }

}
