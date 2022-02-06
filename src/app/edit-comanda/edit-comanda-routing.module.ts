import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComandaPage } from './edit-comanda.page';

const routes: Routes = [
  {
    path: '',
    component: EditComandaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditComandaPageRoutingModule {}
