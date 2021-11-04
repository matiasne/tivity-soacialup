import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditItemCategoriaPage } from './edit-item-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: EditItemCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditItemCategoriaPageRoutingModule {}
