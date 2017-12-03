// vim: set tabstop=2 expandtab filetype=javascript:
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttpSession } from '@app/common/auth.service';
import { BaseService } from '@app/common/base-service.service';
import { BaseComponent } from '@app/common/base-component.service';

import { ZoneData } from '@app/zones/services/zone-data';

@Injectable()
export class ZonesDetailService extends BaseService
{

  constructor(private http: AuthHttpSession)
  {
    super();
  }

  protected getZoneUrl(name: string): string
  {
    return '/api/v1/zones/' + name + '/entries';
  }

  getZoneData(c: BaseComponent, name: string): Observable<ZoneData>
  {
    c.setLoading();
    return this.http.get(this.getZoneUrl(name))
      .map((res: Response) =>
        {
          c.setLoaded();
          let data = this.extractObject(res);
          return data;
        }
      )
      .catch((res: Response) =>
        {
          c.setLoaded();
          return this.extractError(res);
        }
      );
  }
}
