// vim: set tabstop=2 expandtab filetype=javascript:
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '@app/common/base-service';
import { BaseComponent } from '@app/common/base-component';

import { DNSTypeList } from '@app/zones/services/zone-data';

@Injectable()
export class ZonesDNSTypeService extends BaseService {
  private static cache: DNSTypeList | null = null;

  constructor(private http: HttpClient) {
    super();
  }

  getDNSType(c: BaseComponent): Observable<DNSTypeList> {
    if (ZonesDNSTypeService.cache !== null) {
      return of(ZonesDNSTypeService.cache);
    }

    return this.applyPipe<DNSTypeList>(
      this.http.get<DNSTypeList>('/api/v1/record').pipe(
        map(
          (data: DNSTypeList) => {
            ZonesDNSTypeService.cache = data;
            return data;
          }
        )
      ),
      c
    );
  }
}
