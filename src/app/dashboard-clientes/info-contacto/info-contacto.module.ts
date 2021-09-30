import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoContactoPageRoutingModule } from './info-contacto-routing.module';

import { InfoContactoPage } from './info-contacto.page';
import { ClientesModule } from 'src/app/Modules/clientes/clientes.module';

@NgModule({
  imports: [
    CommonModule,
    ClientesModule,
    FormsModule,
    IonicModule,
    InfoContactoPageRoutingModule
  ],
  declarations: [InfoContactoPage]
})
export class InfoContactoPageModule {}
