import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCategoriaPageRoutingModule } from './select-categoria-routing.module';

import { SelectCategoriaPage } from './select-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCategoriaPageRoutingModule
  ],
  declarations: [SelectCategoriaPage]
})
export class SelectCategoriaPageModule {}
