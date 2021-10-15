import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardClientesPage } from './dashboard-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardClientesPage,
    children: [
      {
        path: 'list-reservas-cliente',
        loadChildren: () => import('./list-reservas-cliente/list-reservas-cliente.module').then( m => m.ListReservasClientePageModule)
      },
      
      {
        path: 'list-pedidos-cliente',
        loadChildren: () => import('./list-pedidos-cliente/list-pedidos-cliente.module').then( m => m.ListPedidosClientePageModule)
      },
      
      {
        path: 'info-contacto',
        loadChildren: () => import('./info-contacto/info-contacto.module').then( m => m.InfoContactoPageModule)
      },
      {
        path: 'list-ctas-corrientes-cliente',
        loadChildren: () => import('./list-ctas-corrientes-cliente/list-ctas-corrientes-cliente.module').then( m => m.ListCtasCorrientesClientePageModule)
      },
      {
        path: 'list-subscripciones-cliente',
        loadChildren: () => import('./list-subscripciones-cliente/list-subscripciones-cliente.module').then( m => m.ListSubscripcionesClientePageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard-clientes/info-contacto',
        pathMatch: 'full'
      }
    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardClientesPageRoutingModule {}
