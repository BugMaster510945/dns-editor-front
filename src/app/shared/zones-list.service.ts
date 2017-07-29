import { AuthHttpSession } from '../check-auth/auth.service';
import { BaseService } from './base-service.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ZoneData } from './zone-data';

@Injectable()
export class ZoneListService extends BaseService {

    private static ZONE_LIST_URL = '/api/zones';

    constructor(private http: AuthHttpSession) {
        super();
    }

    getZones(): Observable<ZoneData[]> {
        return this.http.get(ZoneListService.ZONE_LIST_URL)
            .map((res: Response) => {
                let data = this.extractObject(res);
                return data['detail'];
            })
            .catch(this.extractError);
    }
}