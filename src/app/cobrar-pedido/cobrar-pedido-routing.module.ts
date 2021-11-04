import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CobrarPedidoPage } from './cobrar-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: CobrarPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CobrarPedidoPageRoutingModule {}
