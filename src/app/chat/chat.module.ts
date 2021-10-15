import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { AutosizeModule } from 'ngx-autosize';
import { ChatModule } from '../Modules/chat/chat.module';

@NgModule({
  imports: [
    CommonModule,
    ChatModule,
    IonicModule,
    ChatPageRoutingModule,
    AutosizeModule
  ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
