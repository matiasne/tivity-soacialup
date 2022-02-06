import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectCategoriaPage } from './select-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: SelectCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCategoriaPageRoutingModule {}
