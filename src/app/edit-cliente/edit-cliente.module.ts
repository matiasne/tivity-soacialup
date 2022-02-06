import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditClientePageRoutingModule } from './edit-cliente-routing.module';

import { EditClientePage } from './edit-cliente.page';
import { CajasModule } from '../Modules/cajas/cajas.module';
import { ClientesModule } from '../Modules/clientes/clientes.module';

@NgModule({
  imports: [
    CommonModule,
    ClientesModule,
    IonicModule,
    EditClientePageRoutingModule
  ],
  declarations: [EditClientePage]
})
export class EditClientePageModule {}
