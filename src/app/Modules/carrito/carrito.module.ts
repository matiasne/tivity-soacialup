import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsCarritoComponent } from './details-carrito/details-carrito.component';
import { ItemsModule } from '../items/items.module';



@NgModule({
  
  imports: [
    CommonModule,
    ItemsModule,
  ],
  declarations: [
    DetailsCarritoComponent
  ],
  exports:[
    DetailsCarritoComponent
  ]
})
export class CarritoModule { }
