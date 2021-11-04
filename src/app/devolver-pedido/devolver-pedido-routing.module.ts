import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevolverPedidoPage } from './devolver-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: DevolverPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevolverPedidoPageRoutingModule {}
