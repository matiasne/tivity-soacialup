import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDivisionPageRoutingModule } from './dashboard-division-routing.module';

import { DashboardDivisionPage } from './dashboard-division.page';
import { ComponentsModule } from '../Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    DashboardDivisionPageRoutingModule
  ],
  declarations: [DashboardDivisionPage]
})
export class DashboardDivisionPageModule {}
