import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProductoPageRoutingModule } from './edit-producto-routing.module';

import { EditProductoPage } from './edit-producto.page';
import { ItemsModule } from '../Modules/items/items.module';

@NgModule({
  imports: [
    CommonModule,
    ItemsModule,
    FormsModule,
    IonicModule,
    EditProductoPageRoutingModule
  ],
  declarations: [EditProductoPage]
})
export class EditProductoPageModule {}
