// vim: set tabstop=2 expandtab filetype=javascript:
import * as Raven from 'raven-js';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AuthConfig } from 'angular2-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';

import { PrivateComponent } from '@app/common/private/private.component';
import { ErrorComponent } from '@app/common/error/error.component';
import { ReadableTimePipe } from '@app/common/readable-time.pipe';
import { PageNotFoundComponent } from '@app/common/page-not-found/page-not-found.component';
import { LoginComponent } from '@app/common/login/login.component';
import { CheckAuthGuard } from '@app/common/check-auth.guard';
import { AuthService, AuthHttpSession } from '@app/common/auth.service';

import { ZonesListService } from '@app/zones/services/zones-list.service';
import { ZonesDetailService } from '@app/zones/services/zones-detail.service';
import { ZonesDNSTypeService } from '@app/zones/services/zones-dns-type.service';
import { ZonesEntryService } from '@app/zones/services/zones-entry.service';
import { ZonesListComponent } from '@app/zones/zones-list/zones-list.component';
import { ZonesDetailComponent } from '@app/zones/zones-detail/zones-detail.component';
import { FilterZoneEntryPipe } from '@app/zones/zones-detail/filter-zone-entry.pipe';
import { ZonesEntryEditComponent } from '@app/zones/zones-entry-edit/zones-entry-edit.component';
import { FilterToEntryPipe } from '@app/zones/zones-detail/filter-to-entry.pipe';


/*
Raven
  .config('https://b82ebaeebb9d4f3c988c17f1ed99ca1e@sentry.io/206208')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err);
  }
}
*/

@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent,
    PageNotFoundComponent,
    ErrorComponent,
    LoginComponent,
    ZonesListComponent,
    ZonesDetailComponent,
    ReadableTimePipe,
    FilterZoneEntryPipe,
    ZonesEntryEditComponent,
    FilterToEntryPipe
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    //{ provide: ErrorHandler, useClass: RavenErrorHandler },
    CheckAuthGuard, 
    AuthService, 
    AuthHttpSession,
    ZonesListService,
    ZonesDetailService,
    ZonesDNSTypeService,
    ZonesEntryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
