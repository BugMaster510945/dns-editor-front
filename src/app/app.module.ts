// vim: set tabstop=2 expandtab filetype=javascript:
import * as Raven from 'raven-js';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PrivateComponent } from './shared/private/private.component';
import { ErrorComponent } from './shared/error/error.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { CheckAuthGuard } from './check-auth/check-auth.guard';
import { AuthService, AuthHttpSession } from './check-auth/auth.service';
import { AuthConfig } from 'angular2-jwt';
import { AppRoutingModule } from './app-routing.module';
import { ZonesListComponent } from './zones/zones-list/zones-list.component';
import { ZonesDetailComponent } from './zones/zones-detail/zones-detail.component';
import { ZonesListService } from './shared/zones-list.service';
import { ZonesDetailService } from './zones/zones-detail/zones-detail.service';
import { ReadableTimePipe } from './shared/readable-time.pipe';
import { FilterZoneEntryPipe } from './zones/zones-detail/filter-zone-entry.pipe';
import { ZonesEntryEditComponent } from './zones/zones-entry-edit/zones-entry-edit.component';
//Raven
//  .config('https://b82ebaeebb9d4f3c988c17f1ed99ca1e@sentry.io/206208')
//  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err);
  }
}

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
    ZonesEntryEditComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    CheckAuthGuard, 
    AuthService, 
    AuthHttpSession,
    ZonesListService,
    ZonesDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
