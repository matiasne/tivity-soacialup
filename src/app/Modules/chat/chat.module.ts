import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonChatComponent } from './button-chat/button-chat.component';
import { ListMensajesComponent } from './list-mensajes/list-mensajes.component';
import { CajaEscrituraComponent } from './caja-escritura/caja-escritura.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ListMensajesComponent,
    CajaEscrituraComponent,
    ButtonChatComponent
  ],
  exports:[
    ListMensajesComponent,
    CajaEscrituraComponent,
    ButtonChatComponent
  ]
})
export class ChatModule { }
