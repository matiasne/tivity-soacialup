import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCajaCierrePageRoutingModule } from './edit-caja-cierre-routing.module';

import { EditCajaCierrePage } from './edit-caja-cierre.page';
import { CajasModule } from '../Modules/cajas/cajas.module';

@NgModule({
  imports: [
    CommonModule,
    CajasModule,
    FormsModule,
    IonicModule,
    EditCajaCierrePageRoutingModule
  ],
  declarations: [EditCajaCierrePage]
})
export class EditCajaCierrePageModule {}
