// vim: set tabstop=2 expandtab filetype=javascript:
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZonesListComponent } from './zones-list/zones-list.component';
import { ZonesDetailComponent } from './zones-detail/zones-detail.component';

const zonesRoutes: Routes = [
	{
		path: 'zones',
		component: ZonesListComponent
	},
	{
		path: 'zones/:name',
		component: ZonesDetailComponent
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(zonesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ZonesRoutingModule { }
