// vim: set tabstop=2 expandtab filetype=javascript:
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

import { BaseComponent } from '@app/common/base-component';
import { AuthService } from '@app/common/auth.service';

import { ZoneListData } from '@app/zones/services/zone-list-data';
import { ZonesListService } from '@app/zones/services/zones-list.service';

@Component({
  selector: 'app-private',
  templateUrl: 'private.component.html',
  styleUrls: ['private.component.scss']
})

export class PrivateComponent extends BaseComponent implements OnInit {
  zones: ZoneListData[] = [];
  currentZoneName /* : string */ = '';

  constructor(
    private zoneListService: ZonesListService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.lazyUnsubscribe(
      this.zoneListService.getZones(this).subscribe(
        res => this.zones = res,
        err => this.handleError(err)
      )
    );

    const fc = this.route.firstChild;
    if (fc !== null) {
      // Init zone name with current route (if needed)
      this.lazyUnsubscribe(
        fc.params.subscribe((params) => {
          this.currentZoneName = params.name;
        })
      );
    }

    // Update zone name each time the router is used
    this.lazyUnsubscribe(
      this.router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd)
        )
        .subscribe(
          (event: NavigationEnd) => {
            this.currentZoneName = event.url.replace('/zones', '').replace('/', '');
          }
        )
    );
  }

  doLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
