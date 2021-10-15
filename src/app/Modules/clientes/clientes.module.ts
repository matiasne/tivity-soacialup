import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClienteComponent } from './list-cliente/list-cliente.component';
import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from '../../Directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../Components/components.module';
import { DetailsClienteComponent } from './details-cliente/details-cliente.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';



@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    DirectivesModule
  ],
  declarations: [
    ListClienteComponent,
    FormClienteComponent,
    DetailsClienteComponent
  ],
  exports:[
    ListClienteComponent,
    FormClienteComponent,
    DetailsClienteComponent
  ]
})
export class ClientesModule { }
