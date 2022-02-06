import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListComandasV2PageRoutingModule } from './list-comandas-v2-routing.module';

import { ListComandasV2Page } from './list-comandas-v2.page';
import { ComponentsModule } from '../Components/components.module';
import { PedidosModule } from '../Modules/pedidos/pedidos.module';
import { CocinasModule } from '../Modules/cocinas/cocinas.module';

@NgModule({
  imports: [ 
    CommonModule,
    CocinasModule,
    PedidosModule,
    IonicModule,
    ListComandasV2PageRoutingModule
  ],
  declarations: [ListComandasV2Page]
})
export class ListComandasV2PageModule {}
