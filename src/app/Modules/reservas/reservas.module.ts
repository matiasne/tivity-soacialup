import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { CalendarioReservasComponent } from './calendario-reservas/calendario-reservas.component';
import { ListReservasComponent } from './list-reservas/list-reservas.component';
import { ComponentsModule } from 'src/app/Components/components.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { FormReservaComponent } from './form-reserva/form-reserva.component';

@NgModule({  
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    ComponentsModule,
    DirectivesModule,
    FullCalendarModule
  ],
  declarations: [
    CalendarioReservasComponent,
    FormReservaComponent,
    ListReservasComponent
  ],
  exports:[
    CalendarioReservasComponent,
    FormReservaComponent,
    ListReservasComponent
  ]
})
export class ReservasModule { }
