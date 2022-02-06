import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { CardComandaComponent } from './card-comanda/card-comanda.component';
import { FormCocinaComponent } from './form-cocina/form-cocina.component';
import { FormComandaComponent } from './form-comanda/form-comanda.component';
import { ListCocinaComponent } from './list-cocina/list-cocina.component';



@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectivesModule
  ],
  declarations: [
    CardComandaComponent,
    FormCocinaComponent,
    FormComandaComponent,
    ListCocinaComponent
  ],
  exports:[
    CardComandaComponent,
    FormCocinaComponent,
    FormComandaComponent,
    ListCocinaComponent
  ]
})
export class CocinasModule { }
