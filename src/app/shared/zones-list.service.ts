// vim: set tabstop=2 expandtab filetype=javascript:
import { AuthHttpSession } from '../check-auth/auth.service';
import { BaseService } from './base-service.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ZoneData } from './zone-data';

@Injectable()
export class ZonesListService extends BaseService {

    private static ZONE_LIST_URL = '/api/v1/zones';

    constructor(private http: AuthHttpSession) {
        super();
    }

    getZones(): Observable<ZoneData[]> {
        return this.http.get(ZonesListService.ZONE_LIST_URL)
            .map((res: Response) => {
                let data = this.extractObject(res);
                return data['detail'];
            })
            .catch(this.extractError);
    }
}
