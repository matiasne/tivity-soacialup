import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSubscripcionesClientePage } from './list-subscripciones-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ListSubscripcionesClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSubscripcionesClientePageRoutingModule {}
