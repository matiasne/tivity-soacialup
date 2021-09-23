import { NgModule } from '@angular/core';
import { SeleccionarImagenComponent } from '../Components/seleccionar-imagen/seleccionar-imagen.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';
import { CardSubscriptionComponent } from './card-subscription/card-subscription.component';
import { CardProductoComponent } from './card-producto/card-producto.component';
import { CardUsuarioComponent } from './card-usuario/card-usuario.component';
import { CardPedidoComponent } from './card-pedido/card-pedido.component';
import { CardComandaV2Component } from './card-comanda-v2/card-comanda-v2.component';
import { BtnSeleccionarImagenComponent } from './btn-seleccionar-imagen/btn-seleccionar-imagen.component';
import { CardPedidoWoocommerceComponent } from './card-pedido-woocommerce/card-pedido-woocommerce.component';
import { CardProductoWoocommerceComponent } from './card-producto-woocommerce/card-producto-woocommerce.component';



@NgModule({
imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImageCropperModule,
    ],
  declarations: [
    BtnSeleccionarImagenComponent,
    SeleccionarImagenComponent,
    CardComandaV2Component,
    CardUsuarioComponent,
    CardProductoComponent,
    CardSubscriptionComponent,
    CardPedidoComponent,
    CardPedidoWoocommerceComponent,
    CardProductoWoocommerceComponent,
  ],
  exports: [
    BtnSeleccionarImagenComponent,
    SeleccionarImagenComponent,
    CardComandaV2Component,
    CardUsuarioComponent,
    CardProductoComponent,
    CardSubscriptionComponent,
    CardPedidoComponent,
    CardPedidoWoocommerceComponent,
    CardProductoWoocommerceComponent 
    
  ]
})
export class ComponentsModule {}