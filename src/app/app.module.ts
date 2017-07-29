// vim: set tabstop=2 expandtab filetype=javascript:
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { CheckAuthGuard } from './check-auth/check-auth.guard';
import { AuthService, AuthHttpSession } from './check-auth/auth.service';
import { AuthConfig } from 'angular2-jwt';
import { AppRoutingModule } from './app-routing.module';
import { ZonesListComponent } from './zones/zones-list/zones-list.component';
import { ZonesDetailComponent } from './zones/zones-detail/zones-detail.component';
import { ZonesRoutingModule } from './zones/zones-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ZonesListComponent,
    ZonesDetailComponent
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ZonesRoutingModule,
    AppRoutingModule
  ],
  providers: [CheckAuthGuard, AuthService, AuthHttpSession],
  bootstrap: [AppComponent]
})
export class AppModule { }
