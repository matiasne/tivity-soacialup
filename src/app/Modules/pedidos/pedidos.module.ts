import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPedidoComponent } from './form-pedido/form-pedido.component';
import { ListPedidosComponent } from './list-pedidos/list-pedidos.component';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { ComponentsModule } from 'src/app/Components/components.module';
import { CardPedidoComponent } from './card-pedido/card-pedido.component';
import { ItemsModule } from '../items/items.module';
import { FormCobrarPedidoComponent } from './form-cobrar-pedido/form-cobrar-pedido.component';
import { FormDevolverPedidoComponent } from './form-devolver-pedido/form-devolver-pedido.component';
import { AfipModule } from '../afip/afip.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatModule } from '../chat/chat.module';
import { ImpresionModule } from '../impresion/impresion.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';



@NgModule({
  imports: [
    IonicModule,
    FormsModule ,
    ReactiveFormsModule,
    AfipModule,
    ChatModule,
    ImpresionModule,    
    CommonModule,
    ItemsModule,
    ComponentsModule,
    DirectivesModule
  ],
  declarations: [
    CardPedidoComponent,    
    FormPedidoComponent,    
    ListPedidosComponent,
    FormCobrarPedidoComponent,
    FormDevolverPedidoComponent
  ],
  exports:[
    CardPedidoComponent,    
    FormPedidoComponent,
    ListPedidosComponent,
    FormCobrarPedidoComponent,
    FormDevolverPedidoComponent
  ]
})
export class PedidosModule { }
