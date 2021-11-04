import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCocinaPageRoutingModule } from './edit-cocina-routing.module';

import { EditCocinaPage } from './edit-cocina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCocinaPageRoutingModule
  ],
  declarations: [EditCocinaPage]
})
export class EditCocinaPageModule {}
