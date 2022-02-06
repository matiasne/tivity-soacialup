import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSubscriptionComponent } from './card-subscription/card-subscription.component';



@NgModule({
  declarations: [
    CardSubscriptionComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CardSubscriptionComponent
  ]
})
export class SubscripcionesModule { }
