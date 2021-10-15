import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditReservaPageRoutingModule } from './edit-reserva-routing.module';

import { EditReservaPage } from './edit-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditReservaPageRoutingModule
  ],
  declarations: [EditReservaPage]
})
export class EditReservaPageModule {}
