// vim: set tabstop=2 expandtab filetype=javascript:
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { ZonesListComponent } from './zones/zones-list/zones-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { CheckAuthGuard } from './check-auth/check-auth.guard';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/zones',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: '**',
		component: PageNotFoundComponent,
		canActivate: [CheckAuthGuard]
	}
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
