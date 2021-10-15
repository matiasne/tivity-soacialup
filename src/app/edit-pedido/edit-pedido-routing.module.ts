import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPedidoPage } from './edit-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: EditPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPedidoPageRoutingModule {}
