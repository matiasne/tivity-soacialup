import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CobrarPedidoPageRoutingModule } from './cobrar-pedido-routing.module';

import { CobrarPedidoPage } from './cobrar-pedido.page';
import { PedidosModule } from '../Modules/pedidos/pedidos.module';

@NgModule({
  imports: [
    CommonModule,
    PedidosModule,
    FormsModule,
    IonicModule,
    CobrarPedidoPageRoutingModule
  ],
  declarations: [CobrarPedidoPage]
})
export class CobrarPedidoPageModule {}
