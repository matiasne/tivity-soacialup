import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormServicioPageRoutingModule } from './form-servicio-routing.module';

import { FormServicioPage } from './form-servicio.page';
import { ComponentsModule } from '../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormServicioPageRoutingModule
  ],
  declarations: [FormServicioPage]
})
export class FormServicioPageModule {}
