// vim: set tabstop=2 expandtab filetype=javascript:
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '@app/common/base-service';
import { BaseComponent } from '@app/common/base-component';


import { ZoneData, ZoneDataEntry } from '@app/zones/services/zone-data';

@Injectable()
export class ZonesEntryService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  private getEntryUrl(zone: ZoneData, data?: ZoneDataEntry) {
    if (!data) {
      return '/api/v1/zones/' + zone.name + '/entries/';
    } else {
      return '/api/v1/zones/' + zone.name + '/entries/' + data.name;
    }
  }

  add(c: BaseComponent, zone: ZoneData, data: ZoneDataEntry): Observable<any> {
    return this.applyPipe(
      this.http.put(this.getEntryUrl(zone, data), data),
      c);
  }

  del(c: BaseComponent, zone: ZoneData, data: ZoneDataEntry): Observable<any> {
    return this.applyPipe(
      this.http.request('delete', this.getEntryUrl(zone, data), { body: data }),
      c);
  }

  update(c: BaseComponent, zone: ZoneData, oldEntry: ZoneDataEntry, newEntry: ZoneDataEntry): Observable<any> {
    if (oldEntry.name === newEntry.name) {
      return this.applyPipe(
        this.http.patch(this.getEntryUrl(zone, oldEntry), { old: oldEntry, new: newEntry }),
        c
      );
    } else {
      return this.applyPipe(
        this.http.patch(this.getEntryUrl(zone), { old: oldEntry, new: newEntry }),
        c
      );
    }
  }
}
