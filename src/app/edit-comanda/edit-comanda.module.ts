import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditComandaPageRoutingModule } from './edit-comanda-routing.module';

import { EditComandaPage } from './edit-comanda.page';
import { CocinasModule } from '../Modules/cocinas/cocinas.module';
import { DirectivesModule } from '../Directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    CocinasModule,
    DirectivesModule,
    IonicModule,
    EditComandaPageRoutingModule
  ],
  declarations: [EditComandaPage]
})
export class EditComandaPageModule {}
