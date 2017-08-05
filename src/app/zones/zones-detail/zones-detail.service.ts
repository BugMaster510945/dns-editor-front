// vim: set tabstop=2 expandtab filetype=javascript:
import { Observable } from 'rxjs/Rx';
import { ZoneData } from '../../shared/zone-data';
import { BaseService } from '../../shared/base-service.service';
import { Response } from '@angular/http';
import { AuthHttpSession } from '../../check-auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ZonesDetailService extends BaseService {

    private static ZONE_DETAIL_URL = '/api/v1/zones/planchon.org/entries';

    constructor(private http: AuthHttpSession) {
        super();
    }

    getZoneData(name: string): Observable<ZoneData> {

        // TODO use name parameter in HTTP call

        return this.http.get(ZonesDetailService.ZONE_DETAIL_URL)
            .map((res: Response) => {
                let data = this.extractObject(res);
                return data['detail'];
            })
            .catch(this.extractError);
    }
}
