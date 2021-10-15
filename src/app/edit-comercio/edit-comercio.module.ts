import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditComercioPageRoutingModule } from './edit-comercio-routing.module';

import { EditComercioPage } from './edit-comercio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditComercioPageRoutingModule
  ],
  declarations: [EditComercioPage]
})
export class EditComercioPageModule {}
