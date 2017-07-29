import { ZoneData } from '../zone-data';
import { ZoneListService } from '../zones-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-private',
    templateUrl: 'private.component.html',
    styleUrls: ['private.component.scss']
})

export class PrivateComponent implements OnInit {

    zones: ZoneData[];
    error: Error;

    constructor(private zoneListService: ZoneListService) { }

    ngOnInit() {
        this.zoneListService.getZones().subscribe(
            res => this.zones = res,
            err => this.error = err
        )
    }
}