import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ZoneData } from '../zone-data';
import { ZonesListService } from '../zones-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-private',
    templateUrl: 'private.component.html',
    styleUrls: ['private.component.scss']
})

export class PrivateComponent implements OnInit {

    zones: ZoneData[];
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