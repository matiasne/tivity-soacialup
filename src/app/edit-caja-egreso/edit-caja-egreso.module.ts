import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCajaEgresoPageRoutingModule } from './edit-caja-egreso-routing.module';

import { EditCajaEgresoPage } from './edit-caja-egreso.page';
import { CajasModule } from '../Modules/cajas/cajas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CajasModule,
    IonicModule,
    EditCajaEgresoPageRoutingModule
  ],
  declarations: [EditCajaEgresoPage]
})
export class EditCajaEgresoPageModule {}
