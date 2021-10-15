import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardCajaPage } from './dashboard-caja.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardCajaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardCajaPageRoutingModule {}
