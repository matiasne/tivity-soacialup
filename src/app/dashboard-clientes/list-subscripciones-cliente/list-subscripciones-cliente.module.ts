import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListSubscripcionesClientePageRoutingModule } from './list-subscripciones-cliente-routing.module';

import { ListSubscripcionesClientePage } from './list-subscripciones-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListSubscripcionesClientePageRoutingModule
  ],
  declarations: [ListSubscripcionesClientePage]
})
export class ListSubscripcionesClientePageModule {}
