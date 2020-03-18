// vim: set tabstop=2 expandtab filetype=javascript:
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { BaseService } from '@app/common/base-service.service';
import { BaseComponent } from '@app/common/base-component.service';
import { AuthHttpSession } from '@app/common/auth.service';

import { ZoneListData } from '@app/zones/services/zone-list-data';

@Injectable()
export class ZonesListService extends BaseService {

  private static ZONE_LIST_URL = '/api/v1/zones';

  constructor(private http: AuthHttpSession) {
    super();
  }

  getZones(c: BaseComponent): Observable<ZoneListData[]> {
    c.setLoading();

    return this.http.get(ZonesListService.ZONE_LIST_URL)
      .map((res: Response) => {
        const data = this.extractObject(res, c);
        return data;
      })
      .catch((res: Response) => {
        return this.extractError(res, c);
      });
  }
}
