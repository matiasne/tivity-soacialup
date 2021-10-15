import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCardTokenPageRoutingModule } from './form-card-token-routing.module';

import { FormCardTokenPage } from './form-card-token.page';
import { MercadopagoModule } from '../Modules/mercadopago/mercadopago.module';

@NgModule({
  imports: [
    CommonModule,
    MercadopagoModule,
    FormsModule,
    IonicModule,
    FormCardTokenPageRoutingModule
  ],
  declarations: [FormCardTokenPage]
})
export class FormCardTokenPageModule {}
