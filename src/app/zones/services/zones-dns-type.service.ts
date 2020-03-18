// vim: set tabstop=2 expandtab filetype=javascript:
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AuthHttpSession } from '@app/common/auth.service';
import { BaseService } from '@app/common/base-service.service';
import { BaseComponent } from '@app/common/base-component.service';

import { DNSTypeList } from '@app/zones/services/zone-data';

@Injectable()
export class ZonesDNSTypeService extends BaseService {
  private static cache: DNSTypeList = null;

  constructor(private http: AuthHttpSession) {
    super();
  }

  getDNSType(c: BaseComponent): Observable<DNSTypeList> {
    if (ZonesDNSTypeService.cache !== null) {
      return Observable.of(ZonesDNSTypeService.cache);
    }

    c.setLoading();
    return this.http.get('/api/v1/record')
      .map((res: Response) => {
        const data = this.extractObject(res, c);
        ZonesDNSTypeService.cache = data;
        return data;
      })
      .catch((res: Response) => {
        return this.extractError(res, c);
      });
  }
}
