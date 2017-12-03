// vim: set tabstop=2 expandtab filetype=javascript:
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '@app/common/base-component.service';

import { ZoneListData } from '@app/zones/services/zone-list-data';
import { ZonesListService } from '@app/zones/services/zones-list.service';

@Component({
    selector: 'app-private',
    templateUrl: 'private.component.html',
    styleUrls: ['private.component.scss']
})

export class PrivateComponent extends BaseComponent implements OnInit
{
    zones: ZoneListData[];
    currentZoneName: string;
    error: Error;

    constructor(
      private zoneListService: ZonesListService,
      private route: ActivatedRoute,
      private router: Router
    )
    {
      super();
    }

    ngOnInit()
    {
        this.zoneListService.getZones(this).subscribe(
            res => this.zones = res,
            err => this.error = err
        );

        // Init zone name with current route (if needed)
        this.route.firstChild.params.subscribe((params: { name: string }) => {
            this.currentZoneName = params.name;
        });

        // Update zone name each time the router is used
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                this.currentZoneName = event.url.replace('/zones', '').replace('/', '');
            });
    }
}
