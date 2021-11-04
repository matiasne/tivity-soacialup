import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCajaPage } from './edit-caja.page';

const routes: Routes = [
  {
    path: '',
    component: EditCajaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCajaPageRoutingModule {}
