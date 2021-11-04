import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCajaEgresoPage } from './edit-caja-egreso.page';

const routes: Routes = [
  {
    path: '',
    component: EditCajaEgresoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCajaEgresoPageRoutingModule {}
