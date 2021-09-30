import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPedidosDivisionPageRoutingModule } from './list-pedidos-division-routing.module';

import { ListPedidosDivisionPage } from './list-pedidos-division.page';
import { PedidosModule } from 'src/app/Modules/pedidos/pedidos.module';

@NgModule({
  imports: [
    CommonModule,
    PedidosModule,
    FormsModule,
    IonicModule,
    ListPedidosDivisionPageRoutingModule
  ],
  declarations: [ListPedidosDivisionPage]
})
export class ListPedidosDivisionPageModule {}
