import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsCarritoComponent } from './details-carrito/details-carrito.component';



@NgModule({
  
  imports: [
    CommonModule
  ],
  declarations: [
    DetailsCarritoComponent
  ],
  exports:[
    DetailsCarritoComponent
  ]
})
export class CarritoModule { }
