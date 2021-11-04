import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/Components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { ListCajasComponent } from './list-cajas/list-cajas.component';
import { FormCajaComponent } from './form-caja/form-caja.component';
import { FormAbrirCajaComponent } from './form-abrir-caja/form-abrir-caja.component';
import { FormCerrarCajaComponent } from './form-cerrar-caja/form-cerrar-caja.component';
import { FormEgresoCajaComponent } from './form-egreso-caja/form-egreso-caja.component';
import { FormIngresoCajaComponent } from './form-ingreso-caja/form-ingreso-caja.component';
import { DetailsCajaComponent } from './details-caja/details-caja.component';
import { CardMovimientoComponent } from './movimientos/card-movimiento/card-movimiento.component';
import { ListMovimientosComponent } from './movimientos/list-movimientos/list-movimientos.component';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
  ],
  declarations:[
    CardMovimientoComponent,
    ListCajasComponent,
    FormCajaComponent,
    DetailsCajaComponent,
    FormAbrirCajaComponent,
    FormCerrarCajaComponent,
    FormEgresoCajaComponent,
    FormIngresoCajaComponent,    
    ListMovimientosComponent
  ],
  exports:[
    CardMovimientoComponent,
    ListCajasComponent,
    FormCajaComponent,
    DetailsCajaComponent,
    FormAbrirCajaComponent,
    FormCerrarCajaComponent,
    FormEgresoCajaComponent,
    FormIngresoCajaComponent,    
    ListMovimientosComponent
  ]
})
export class CajasModule { }
