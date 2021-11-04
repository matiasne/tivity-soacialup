import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPedidoPageRoutingModule } from './edit-pedido-routing.module';

import { EditPedidoPage } from './edit-pedido.page';
import { PedidosModule } from '../Modules/pedidos/pedidos.module';
import { ItemsModule } from '../Modules/items/items.module';
import { ChatModule } from '../Modules/chat/chat.module';
import { ImpresionModule } from '../Modules/impresion/impresion.module';

@NgModule({
  imports: [
    CommonModule,
    ChatModule,
    ImpresionModule,
    PedidosModule,
    ItemsModule,
    FormsModule,
    IonicModule,
    EditPedidoPageRoutingModule
  ],
  declarations: [EditPedidoPage]
})
export class EditPedidoPageModule {}
