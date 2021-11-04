import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditItemCategoriaPageRoutingModule } from './edit-item-categoria-routing.module';

import { EditItemCategoriaPage } from './edit-item-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditItemCategoriaPageRoutingModule
  ],
  declarations: [EditItemCategoriaPage]
})
export class EditItemCategoriaPageModule {}
