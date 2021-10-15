import { NgModule } from '@angular/core';
import { SeleccionarImagenComponent } from '../Components/seleccionar-imagen/seleccionar-imagen.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';
import { CardSubscriptionComponent } from './card-subscription/card-subscription.component';
import { CardUsuarioComponent } from './card-usuario/card-usuario.component';
import { CardComandaV2Component } from './card-comanda-v2/card-comanda-v2.component';
import { BtnSeleccionarImagenComponent } from './btn-seleccionar-imagen/btn-seleccionar-imagen.component';
import { CardPedidoWoocommerceComponent } from './card-pedido-woocommerce/card-pedido-woocommerce.component';
import { CardProductoWoocommerceComponent } from './card-producto-woocommerce/card-producto-woocommerce.component';
import { ItemBluetoothDeviceComponent } from './item-bluetooth-device/item-bluetooth-device.component';
import { ItemBluetoothPrinterComponent } from '../Modules/impresion/item-bluetooth-printer/item-bluetooth-printer.component';
import { SearchFilterInputComponent } from './search-filter-input/search-filter-input.component';
import { CardReservaComponent } from './card-reserva/card-reserva.component';
import { DirectivesModule } from '../Directives/directives.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CarritoComponent } from './carrito/carrito.component';



@NgModule({
imports: [
    CommonModule, 
    DirectivesModule,  
    FullCalendarModule,  
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
    CardSubscriptionComponent,
    CardReservaComponent,
    CardPedidoWoocommerceComponent,
    CardProductoWoocommerceComponent,
    ItemBluetoothDeviceComponent,
    ItemBluetoothPrinterComponent,
    SearchFilterInputComponent,
    CarritoComponent,
  ],
  exports: [
    BtnSeleccionarImagenComponent,
    SeleccionarImagenComponent,
    CardComandaV2Component,
    CardUsuarioComponent,
    CardSubscriptionComponent,
    CardReservaComponent,
    CardPedidoWoocommerceComponent,
    CardProductoWoocommerceComponent, 
    ItemBluetoothDeviceComponent,
    ItemBluetoothPrinterComponent,
    SearchFilterInputComponent,
    CarritoComponent
  ]
})
export class ComponentsModule {}