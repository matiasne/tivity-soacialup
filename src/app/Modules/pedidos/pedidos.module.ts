import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPedidoComponent } from './form-pedido/form-pedido.component';
import { ListPedidosComponent } from './list-pedidos/list-pedidos.component';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { ComponentsModule } from 'src/app/Components/components.module';
import { CardPedidoComponent } from './card-pedido/card-pedido.component';



@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule
  ],
  declarations: [
    CardPedidoComponent,    
    FormPedidoComponent,
    ListPedidosComponent,
  ],
  exports:[
    CardPedidoComponent,    
    FormPedidoComponent,
    ListPedidosComponent,
  ]
})
export class PedidosModule { }
