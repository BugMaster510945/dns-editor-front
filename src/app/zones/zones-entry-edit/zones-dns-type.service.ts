// vim: set tabstop=2 expandtab filetype=javascript:
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../../shared/base-service.service';
import { Response } from '@angular/http';
import { AuthHttpSession } from '../../check-auth/auth.service';
import { Injectable } from '@angular/core';
import { DNSTypeList } from '../../shared/zone-data';

@Injectable()
export class ZonesDNSTypeService extends BaseService
{

  constructor(private http: AuthHttpSession)
  {
    super();
  }

  getDNSType(): Observable<DNSTypeList>
  {
    return this.http.get('/api/v1/record')
      .map((res: Response) => {
        let data = this.extractObject(res);
        return data;
      })
      .catch(this.extractError);
  }
}
