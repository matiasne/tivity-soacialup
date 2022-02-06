import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditReservaPageRoutingModule } from './edit-reserva-routing.module';

import { EditReservaPage } from './edit-reserva.page';
import { ReservasModule } from '../Modules/reservas/reservas.module';
import { ImpresionModule } from '../Modules/impresion/impresion.module';
import { ChatModule } from '../Modules/chat/chat.module';

@NgModule({
  imports: [
    CommonModule,
    ReservasModule,
    ImpresionModule,
    ChatModule,
    IonicModule,
    EditReservaPageRoutingModule
  ],
  declarations: [EditReservaPage]
})
export class EditReservaPageModule {}
