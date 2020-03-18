// vim: set tabstop=2 expandtab filetype=javascript:
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BaseService } from '@app/common/base-service.service';
import { BaseComponent } from '@app/common/base-component.service';
import { AuthHttpSession } from '@app/common/auth.service';

import { ZoneData, ZoneDataEntry } from '@app/zones/services/zone-data';

@Injectable()
export class ZonesEntryService extends BaseService {

  constructor(private http: AuthHttpSession) {
    super();
  }

  private getEntryUrl(zone: ZoneData, data: ZoneDataEntry = null) {
    if (data == null) {
      return '/api/v1/zones/' + zone.name + '/entries/';
    } else {
      return '/api/v1/zones/' + zone.name + '/entries/' + data.name;
    }
  }

  add(c: BaseComponent, zone: ZoneData, data: ZoneDataEntry): Observable<any> {
    c.setLoading();
    return this.http.put(this.getEntryUrl(zone, data), data)
      .map(c.setLoaded)
      .catch((res: Response) => {
        return this.extractError(res, c);
      });
  }

  del(c: BaseComponent, zone: ZoneData, data: ZoneDataEntry): Observable<any> {
    c.setLoading();
    return this.http.delete(this.getEntryUrl(zone, data), { body: data })
      .map(c.setLoaded)
      .catch((res: Response) => {
        return this.extractError(res, c);
      });
  }

  update(c: BaseComponent, zone: ZoneData, oldEntry: ZoneDataEntry, newEntry: ZoneDataEntry): Observable<any> {
    c.setLoading();

    if (oldEntry.name === newEntry.name) {
      return this.http.patch(this.getEntryUrl(zone, oldEntry), { old: oldEntry, new: newEntry })
        .map(c.setLoaded)
        .catch((res: Response) => {
          return this.extractError(res, c);
        });
    } else {
      return this.http.patch(this.getEntryUrl(zone), { old: oldEntry, new: newEntry })
        .map(c.setLoaded)
        .catch((res: Response) => {
          return this.extractError(res, c);
        });
    }
  }
}
