// vim: set tabstop=2 expandtab filetype=javascript:

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@app/common/login/login.component';
import { CheckAuthGuard } from '@app/common/check-auth.guard';
import { PrivateComponent } from '@app/common/private/private.component';
import { PageNotFoundComponent } from '@app/common/page-not-found/page-not-found.component';

import { NgSwaggerUIComponent } from '@app/docs/ng-swagger-ui.component';
import { ZonesDetailComponent } from '@app/zones/zones-detail/zones-detail.component';
import { ZonesListComponent } from '@app/zones/zones-list/zones-list.component';

const privateRoutes: Routes = [
  { path: '', redirectTo: '/zones', pathMatch: 'full' },
  { path: 'zones', component: ZonesListComponent },
  { path: 'zones/:name', component: ZonesDetailComponent },
  { path: 'docs', redirectTo: '/docs/', pathMatch: 'full' },
  { path: 'docs/', component: NgSwaggerUIComponent },
  { path: '**', component: PageNotFoundComponent }
];

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: PrivateComponent, children: privateRoutes, canActivate: [CheckAuthGuard],  canActivateChild: [CheckAuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
