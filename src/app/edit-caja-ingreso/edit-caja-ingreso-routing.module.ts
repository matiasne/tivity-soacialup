import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCajaIngresoPage } from './edit-caja-ingreso.page';

const routes: Routes = [
  {
    path: '',
    component: EditCajaIngresoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCajaIngresoPageRoutingModule {}
