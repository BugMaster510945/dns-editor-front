// vim: set tabstop=2 expandtab filetype=javascript:
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '@app/common/base-service';
import { BaseComponent } from '@app/common/base-component';

import { ZoneListData } from '@app/zones/services/zone-list-data';

@Injectable()
export class ZonesListService extends BaseService {

  private static ZONE_LIST_URL = '/api/v1/zones';

  constructor(private http: HttpClient) {
    super();
  }

  getZones(c: BaseComponent): Observable<ZoneListData[]> {
    return this.applyPipe<ZoneListData[]>(
      this.http.get<ZoneListData[]>(ZonesListService.ZONE_LIST_URL),
      c,
      true
    );
  }
}
