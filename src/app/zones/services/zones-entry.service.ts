// vim: set tabstop=2 expandtab filetype=javascript:
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../../shared/base-service.service';
import { AuthHttpSession } from '../../check-auth/auth.service';
import { ZoneData, ZoneDataEntry } from './zone-data';

@Injectable()
export class ZonesEntryService extends BaseService
{

  constructor(private http: AuthHttpSession)
  {
    super();
  }

  private getEntryUrl(zone: ZoneData,  data: ZoneDataEntry)
  {
    return '/api/v1/zones/' + zone.name + '/entries/' + data.name;
  }

  add(zone: ZoneData,  data: ZoneDataEntry): Observable<any>
  {
    return this.http.put(this.getEntryUrl(zone, data), data);
  }
}
