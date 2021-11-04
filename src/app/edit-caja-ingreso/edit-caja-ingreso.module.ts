import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCajaIngresoPageRoutingModule } from './edit-caja-ingreso-routing.module';

import { EditCajaIngresoPage } from './edit-caja-ingreso.page';
import { CajasModule } from '../Modules/cajas/cajas.module';

@NgModule({
  imports: [
    CommonModule,
    CajasModule,
    FormsModule,
    IonicModule,
    EditCajaIngresoPageRoutingModule
  ],
  declarations: [EditCajaIngresoPage]
})
export class EditCajaIngresoPageModule {}
