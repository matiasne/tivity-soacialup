import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardCajaPageRoutingModule } from './dashboard-caja-routing.module';

import { DashboardCajaPage } from './dashboard-caja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardCajaPageRoutingModule
  ],
  declarations: [DashboardCajaPage]
})
export class DashboardCajaPageModule {}
