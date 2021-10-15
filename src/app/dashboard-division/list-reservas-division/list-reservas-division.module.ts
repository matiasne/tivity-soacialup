import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListReservasDivisionPageRoutingModule } from './list-reservas-division-routing.module';

import { ListReservasDivisionPage } from './list-reservas-division.page';
import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    ListReservasDivisionPageRoutingModule
  ],
  declarations: [ListReservasDivisionPage]
})
export class ListReservasDivisionPageModule {}
