import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComercioComponent } from './select-comercio/select-comercio.component';
import { DetailsComercioComponent } from './details-comercio/details-comercio.component';
import { ComponentsModule } from 'src/app/Components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { FormComercioComponent } from './form-comercio/form-comercio.component';



@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    DirectivesModule
  ],
  declarations: [
    DetailsComercioComponent,
    FormComercioComponent,
    SelectComercioComponent
  ],
  exports:[
    DetailsComercioComponent,
    FormComercioComponent,
    SelectComercioComponent
  ]
})
export class ComercioModule { }
