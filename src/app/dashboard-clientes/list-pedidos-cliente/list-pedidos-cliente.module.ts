import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPedidosClientePageRoutingModule } from './list-pedidos-cliente-routing.module';

import { ListPedidosClientePage } from './list-pedidos-cliente.page';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { ComponentsModule } from 'src/app/Components/components.module';
import { PedidosModule } from 'src/app/Modules/pedidos/pedidos.module';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    ComponentsModule,    
    PedidosModule,
    FormsModule,
    IonicModule,
    ListPedidosClientePageRoutingModule
  ],
  declarations: [ListPedidosClientePage]
})
export class ListPedidosClientePageModule {}
