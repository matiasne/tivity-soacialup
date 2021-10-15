import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfipStatusComponent } from './afip-status/afip-status.component';
import { AfipCheckboxComponent } from './afip-checkbox/afip-checkbox.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AfipStatusComponent,
    AfipCheckboxComponent
  ],
  exports:[
    AfipStatusComponent,
    AfipCheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class AfipModule { }
