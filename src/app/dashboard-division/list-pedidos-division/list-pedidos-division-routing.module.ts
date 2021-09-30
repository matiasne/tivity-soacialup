import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPedidosDivisionPage } from './list-pedidos-division.page';

const routes: Routes = [
  {
    path: '',
    component: ListPedidosDivisionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPedidosDivisionPageRoutingModule {}
