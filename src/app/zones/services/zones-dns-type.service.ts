// vim: set tabstop=2 expandtab filetype=javascript:
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../../shared/base-service.service';
import { Response } from '@angular/http';
import { AuthHttpSession } from '../../check-auth/auth.service';
import { Injectable } from '@angular/core';
import { DNSTypeList } from './zone-data';

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
