import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCajaAperturaPageRoutingModule } from './edit-caja-apertura-routing.module';

import { EditCajaAperturaPage } from './edit-caja-apertura.page';
import { CajasModule } from '../Modules/cajas/cajas.module';

@NgModule({
  imports: [
    CommonModule,
    CajasModule,
    FormsModule,
    IonicModule,
    EditCajaAperturaPageRoutingModule
  ],
  declarations: [EditCajaAperturaPage]
})
export class EditCajaAperturaPageModule {}
