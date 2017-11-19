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

  private getEntryUrl(zone: ZoneData, data: ZoneDataEntry = null)
  {
    if( data == null )
      return '/api/v1/zones/' + zone.name + '/entries/';
    else
      return '/api/v1/zones/' + zone.name + '/entries/' + data.name;
  }

  add(zone: ZoneData, data: ZoneDataEntry): Observable<any>
  {
    return this.http.put(this.getEntryUrl(zone, data), data)
            .catch(this.extractError);
  }

  del(zone: ZoneData, data: ZoneDataEntry): Observable<any>
  {
    return this.http.delete(this.getEntryUrl(zone, data), {body: data})
            .catch(this.extractError);
  }

  update(zone: ZoneData, oldEntry: ZoneDataEntry, newEntry: ZoneDataEntry): Observable<any>
  {
    if( oldEntry.name == newEntry.name )
      return this.http.patch(this.getEntryUrl(zone, oldEntry), {'old': oldEntry, 'new': newEntry})
            .catch(this.extractError);
    else
      return this.http.patch(this.getEntryUrl(zone), {'old': oldEntry, 'new': newEntry})
            .catch(this.extractError);
  }
}
