import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCtasCorrientesClientePage } from './list-ctas-corrientes-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ListCtasCorrientesClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCtasCorrientesClientePageRoutingModule {}
