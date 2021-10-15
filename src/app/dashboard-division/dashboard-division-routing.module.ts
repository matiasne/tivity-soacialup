import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDivisionPage } from './dashboard-division.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDivisionPage,
    children: [
      {
        path: 'list-pedidos-division',
        loadChildren: () => import('./list-pedidos-division/list-pedidos-division.module').then( m => m.ListPedidosDivisionPageModule)
      },
      {
        path: 'list-reservas-division',
        loadChildren: () => import('./list-reservas-division/list-reservas-division.module').then( m => m.ListReservasDivisionPageModule)
      },
      {
        path: 'form-configuracion',
        loadChildren: () => import('./form-configuracion/form-configuracion.module').then( m => m.FormConfiguracionPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard-division/list-pedidos-division',
        pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDivisionPageRoutingModule {}
