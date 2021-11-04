import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCajaAperturaPage } from './edit-caja-apertura.page';

const routes: Routes = [
  {
    path: '',
    component: EditCajaAperturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCajaAperturaPageRoutingModule {}
