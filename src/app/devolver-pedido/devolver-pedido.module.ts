import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevolverPedidoPageRoutingModule } from './devolver-pedido-routing.module';

import { DevolverPedidoPage } from './devolver-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevolverPedidoPageRoutingModule
  ],
  declarations: [DevolverPedidoPage]
})
export class DevolverPedidoPageModule {}
