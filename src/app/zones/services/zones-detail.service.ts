// vim: set tabstop=2 expandtab filetype=javascript:
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttpSession } from '@app/common/auth.service';
import { BaseService } from '@app/common/base-service.service';
import { BaseComponent } from '@app/common/base-component.service';

import { ZoneData } from '@app/zones/services/zone-data';

@Injectable()
export class ZonesDetailService extends BaseService {

  constructor(private http: AuthHttpSession) {
    super();
  }

  protected getZoneUrl(name: string): string {
    return '/api/v1/zones/' + name + '/entries';
  }

  getZoneData(c: BaseComponent, name: string): Observable<ZoneData> {
    c.setLoading();
    return this.http.get(this.getZoneUrl(name))
      .map((res: Response) => {
        return this.extractObject(res, c);
      })
      .catch((res: Response) => {
        return this.extractError(res, c);
      });
  }
}
