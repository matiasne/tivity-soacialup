import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormClientePageRoutingModule } from './form-cliente-routing.module';

import { FormClientePage } from './form-cliente.page';
import { ComponentsModule } from '../Components/components.module';
import { ClientesModule } from '../Modules/clientes/clientes.module';

@NgModule({
  imports: [
    CommonModule,
    ClientesModule,
    FormsModule,
    ComponentsModule, 
    
    IonicModule,
    FormClientePageRoutingModule
  ],
  declarations: [FormClientePage]
})
export class FormClientePageModule {}
