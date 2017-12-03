// vim: set tabstop=2 expandtab filetype=javascript:
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { BaseService } from '@app/common/base-service.service';
import { AuthHttpSession } from '@app/common/auth.service';

import { ZoneListData } from '@app/zones/services/zone-list-data';

@Injectable()
export class ZonesListService extends BaseService
{

    private static ZONE_LIST_URL = '/api/v1/zones';

    constructor(private http: AuthHttpSession)
    {
        super();
    }

    getZones(): Observable<ZoneListData[]>
    {
        return this.http.get(ZonesListService.ZONE_LIST_URL)
            .map((res: Response) => {
                let data = this.extractObject(res);
                return data;
            })
            .catch(this.extractError);
    }
}
