import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComercioPage } from './edit-comercio.page';

const routes: Routes = [
  {
    path: '',
    component: EditComercioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditComercioPageRoutingModule {}
