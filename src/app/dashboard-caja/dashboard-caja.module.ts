import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardCajaPageRoutingModule } from './dashboard-caja-routing.module';

import { DashboardCajaPage } from './dashboard-caja.page';
import { CajasModule } from '../Modules/cajas/cajas.module';

@NgModule({
  imports: [
    CommonModule,
    CajasModule,
    IonicModule,
    DashboardCajaPageRoutingModule
  ],
  declarations: [DashboardCajaPage]
})
export class DashboardCajaPageModule {}
