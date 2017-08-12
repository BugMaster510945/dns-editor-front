// vim: set tabstop=2 expandtab filetype=javascript:
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ZoneListData } from '../zone-list-data';
import { ZonesListService } from '../zones-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-private',
    templateUrl: 'private.component.html',
    styleUrls: ['private.component.scss']
})

export class PrivateComponent implements OnInit {

    zones: ZoneListData[];
    currentZoneName: string;
    error: Error;

    constructor(private zoneListService: ZonesListService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.zoneListService.getZones().subscribe(
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
