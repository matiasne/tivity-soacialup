import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCtasCorrientesClientePageRoutingModule } from './list-ctas-corrientes-cliente-routing.module';

import { ListCtasCorrientesClientePage } from './list-ctas-corrientes-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCtasCorrientesClientePageRoutingModule
  ],
  declarations: [ListCtasCorrientesClientePage]
})
export class ListCtasCorrientesClientePageModule {}
