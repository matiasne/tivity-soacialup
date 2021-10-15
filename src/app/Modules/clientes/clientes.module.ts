import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditClienteComponent } from './edit-cliente/edit-cliente.component';
import { ListClienteComponent } from './list-cliente/list-cliente.component';
import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from '../../Directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../Components/components.module';
import { DetailsClienteComponent } from './details-cliente/details-cliente.component';



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
    EditClienteComponent,
    DetailsClienteComponent
  ],
  exports:[
    ListClienteComponent,
    EditClienteComponent,
    DetailsClienteComponent
  ]
})
export class ClientesModule { }
