import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCajaPageRoutingModule } from './select-caja-routing.module';

import { SelectCajaPage } from './select-caja.page';
import { CajasModule } from '../Modules/cajas/cajas.module';
import { DirectivesModule } from '../Directives/directives.module';

@NgModule({
  imports: [
    CajasModule,
    DirectivesModule,
    SelectCajaPageRoutingModule
  ],
  declarations: [SelectCajaPage]
})
export class SelectCajaPageModule {}
