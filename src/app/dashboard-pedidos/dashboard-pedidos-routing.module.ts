import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPedidosPage } from './dashboard-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPedidosPageRoutingModule {}
