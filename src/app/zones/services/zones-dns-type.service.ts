// vim: set tabstop=2 expandtab filetype=javascript:
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { BaseService } from '@app/common/base-service.service';
import { AuthHttpSession } from '@app/common/auth.service';
import { DNSTypeList } from '@app/zones/services/zone-data';

@Injectable()
export class ZonesDNSTypeService extends BaseService
{
  private static cache: DNSTypeList = null;

  constructor(private http: AuthHttpSession)
  {
    super();
  }

  getDNSType(): Observable<DNSTypeList>
  {
    if( ZonesDNSTypeService.cache !== null )
      return Observable.of(ZonesDNSTypeService.cache);

    return this.http.get('/api/v1/record')
      .map((res: Response) => {
        let data = this.extractObject(res);
        ZonesDNSTypeService.cache = data;
        return data;
      })
      .catch(this.extractError);
  }
}
