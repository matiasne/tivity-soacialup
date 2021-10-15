import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormProductoPageRoutingModule } from './form-producto-routing.module';

import { FormProductoPage } from './form-producto.page';

import { ImageCropperModule } from 'ngx-image-cropper';
import { ComponentsModule } from '../Components/components.module';
import { ItemsModule } from '../Modules/items/items.module';


@NgModule({
  imports: [
    CommonModule,    
    ItemsModule,
    ReactiveFormsModule,
    IonicModule,
    FormProductoPageRoutingModule
  ],
  declarations: [
    FormProductoPage
  ]
})
export class FormProductoPageModule {}
