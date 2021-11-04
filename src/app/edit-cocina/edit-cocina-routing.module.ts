import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCocinaPage } from './edit-cocina.page';

const routes: Routes = [
  {
    path: '',
    component: EditCocinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCocinaPageRoutingModule {}
