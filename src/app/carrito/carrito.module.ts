import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoPageRoutingModule } from './carrito-routing.module';

import { CarritoPage } from './carrito.page';
import { PedidosModule } from '../Modules/pedidos/pedidos.module';
import { ImpresionModule } from '../Modules/impresion/impresion.module';
import { CarritoModule } from '../Modules/carrito/carrito.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImpresionModule,
    CarritoModule,
    IonicModule,
    CarritoPageRoutingModule
  ],
  declarations: [CarritoPage]
})
export class CarritoPageModule {}
