import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCajaCierrePage } from './edit-caja-cierre.page';

const routes: Routes = [
  {
    path: '',
    component: EditCajaCierrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCajaCierrePageRoutingModule {}
