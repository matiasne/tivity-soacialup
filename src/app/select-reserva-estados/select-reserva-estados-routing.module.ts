import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectReservaEstadosPage } from './select-reserva-estados.page';

const routes: Routes = [
  {
    path: '',
    component: SelectReservaEstadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectReservaEstadosPageRoutingModule {}
