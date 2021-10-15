import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormConfiguracionAfipPageRoutingModule } from './form-configuracion-afip-routing.module';

import { FormConfiguracionAfipPage } from './form-configuracion-afip.page';
import { AfipModule } from '../Modules/afip/afip.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AfipModule,
    IonicModule,
    FormConfiguracionAfipPageRoutingModule
  ],
  declarations: [FormConfiguracionAfipPage]
})
export class FormConfiguracionAfipPageModule {}
