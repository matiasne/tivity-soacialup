import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCajaPageRoutingModule } from './edit-caja-routing.module';

import { EditCajaPage } from './edit-caja.page';
import { CajasModule } from '../Modules/cajas/cajas.module';

@NgModule({
  imports: [
    CajasModule,
    EditCajaPageRoutingModule
  ],
  declarations: [EditCajaPage]
})
export class EditCajaPageModule {}
