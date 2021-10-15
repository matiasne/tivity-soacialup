import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardReservasPageRoutingModule } from './dashboard-reservas-routing.module';

import { DashboardReservasPage } from './dashboard-reservas.page';
import { ReservasModule } from '../Modules/reservas/reservas.module';
import { ComponentsModule } from '../Components/components.module';
import { DirectivesModule } from '../Directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    FormsModule,
    ReservasModule,
    IonicModule,
    DashboardReservasPageRoutingModule
  ],
  declarations: [DashboardReservasPage]
})
export class DashboardReservasPageModule {}
