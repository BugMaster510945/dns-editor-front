// vim: set tabstop=2 expandtab filetype=javascript:
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '@app/common/base-service';
import { BaseComponent } from '@app/common/base-component';

import { ZoneData } from '@app/zones/services/zone-data';

@Injectable()
export class ZonesDetailService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  protected getZoneUrl(name: string): string {
    return '/api/v1/zones/' + name + '/entries';
  }

  getZoneData(c: BaseComponent, name: string): Observable<ZoneData> {
    return this.applyPipe<ZoneData>(
      this.http.get<ZoneData>(this.getZoneUrl(name)),
      c, true);
  }
}
