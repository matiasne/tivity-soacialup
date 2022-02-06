import { NgModule } from '@angular/core';
import { SeleccionarImagenComponent } from '../Components/seleccionar-imagen/seleccionar-imagen.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';
import { CardSubscriptionComponent } from '../Modules/subscripciones/card-subscription/card-subscription.component';
import { CardUsuarioComponent } from '../Modules/authentication/card-usuario/card-usuario.component';
import { BtnSeleccionarImagenComponent } from './btn-seleccionar-imagen/btn-seleccionar-imagen.component';
import { CardPedidoWoocommerceComponent } from '../Modules/woocommerce/card-pedido-woocommerce/card-pedido-woocommerce.component';
import { CardProductoWoocommerceComponent } from '../Modules/woocommerce/card-producto-woocommerce/card-producto-woocommerce.component';
import { ItemBluetoothDeviceComponent } from '../Modules/impresion/item-bluetooth-device/item-bluetooth-device.component';
import { ItemBluetoothPrinterComponent } from '../Modules/impresion/item-bluetooth-printer/item-bluetooth-printer.component';
import { SearchFilterInputComponent } from '../Modules/shared/search-filter-input/search-filter-input.component';
import { DirectivesModule } from '../Directives/directives.module';
import { FullCalendarModule } from '@fullcalendar/angular';



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
    
    
  ],
  exports: [
    BtnSeleccionarImagenComponent,
    SeleccionarImagenComponent,
    
  ]
})
export class ComponentsModule {}