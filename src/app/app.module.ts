import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

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
import { ZoneListService } from './zones/zones-list/zones-list.service';

@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent,
    PageNotFoundComponent,
    ErrorComponent,
    LoginComponent,
    ZonesListComponent,
    ZonesDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    CheckAuthGuard, 
    AuthService, 
    AuthHttpSession,
    ZoneListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
