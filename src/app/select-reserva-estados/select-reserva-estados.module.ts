import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectReservaEstadosPageRoutingModule } from './select-reserva-estados-routing.module';

import { SelectReservaEstadosPage } from './select-reserva-estados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectReservaEstadosPageRoutingModule
  ],
  declarations: [SelectReservaEstadosPage]
})
export class SelectReservaEstadosPageModule {}
