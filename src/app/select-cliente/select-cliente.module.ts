import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectClientePageRoutingModule } from './select-cliente-routing.module';

import { SelectClientePage } from './select-cliente.page';
import { ClientesModule } from '../Modules/clientes/clientes.module';

@NgModule({
  imports: [
    CommonModule,
    ClientesModule,
    FormsModule,
    IonicModule,
    SelectClientePageRoutingModule
  ],
  declarations: [SelectClientePage]
})
export class SelectClientePageModule {}
