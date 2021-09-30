import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConectarMarketplaceComponent } from './conectar-marketplace/conectar-marketplace.component';
import { FormCardComponent } from './form-card/form-card.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ConectarMarketplaceComponent,
    FormCardComponent
  ],
  exports:[
    ConectarMarketplaceComponent,
    FormCardComponent
  ]
})
export class MercadopagoModule { }
