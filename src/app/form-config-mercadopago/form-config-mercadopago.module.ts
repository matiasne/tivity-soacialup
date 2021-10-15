import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormConfigMercadopagoPageRoutingModule } from './form-config-mercadopago-routing.module';

import { FormConfigMercadopagoPage } from './form-config-mercadopago.page';
import { MercadopagoModule } from '../Modules/mercadopago/mercadopago.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MercadopagoModule,
    IonicModule,
    FormConfigMercadopagoPageRoutingModule
  ],
  declarations: [FormConfigMercadopagoPage]
})
export class FormConfigMercadopagoPageModule {}
