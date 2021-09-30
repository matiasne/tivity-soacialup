import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPedidosPageRoutingModule } from './dashboard-pedidos-routing.module';

import { DashboardPedidosPage } from './dashboard-pedidos.page';
import { ComponentsModule } from '../Components/components.module';
import { DirectivesModule } from '../Directives/directives.module';
import { PedidosModule } from '../Modules/pedidos/pedidos.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule, 
    DirectivesModule,
    PedidosModule,
    FormsModule,
    IonicModule,
    DashboardPedidosPageRoutingModule
  ],
  declarations: [DashboardPedidosPage]
})
export class DashboardPedidosPageModule {}
