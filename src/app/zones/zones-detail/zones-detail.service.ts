// vim: set tabstop=2 expandtab filetype=javascript:
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../../shared/base-service.service';
import { Response } from '@angular/http';
import { AuthHttpSession } from '../../check-auth/auth.service';
import { Injectable } from '@angular/core';
import { ZoneData } from '../../shared/zone-data';

@Injectable()
export class ZonesDetailService extends BaseService
{

  constructor(private http: AuthHttpSession)
  {
    super();
  }

  protected getZoneUrl(name: string): string
  {
    return '/api/v1/zones/' + name + '/entries'
  }

  getZoneData(name: string): Observable<ZoneData>
  {
    return this.http.get(this.getZoneUrl(name))
      .map((res: Response) => {
        let data = this.extractObject(res);
        return data;
      })
      .catch(this.extractError);
  }
}
