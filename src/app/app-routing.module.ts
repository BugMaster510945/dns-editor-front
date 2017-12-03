// vim: set tabstop=2 expandtab filetype=javascript:

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateComponent } from '@app/shared/private/private.component';
import { ZonesDetailComponent } from '@app/zones/zones-detail/zones-detail.component';
import { ZonesListComponent } from '@app/zones/zones-list/zones-list.component';
import { PageNotFoundComponent } from '@app/shared/page-not-found/page-not-found.component';
import { LoginComponent } from '@app/login/login.component';
import { CheckAuthGuard } from '@app/check-auth/check-auth.guard';

const privateRoutes: Routes = [
	{ path: '', redirectTo: '/zones', pathMatch: 'full' },
	{ path: 'zones', component: ZonesListComponent },
	{ path: 'zones/:name', component: ZonesDetailComponent },
	{ path: '**', component: PageNotFoundComponent }
];

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '',      component: PrivateComponent, children: privateRoutes, canActivate: [CheckAuthGuard] }
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
