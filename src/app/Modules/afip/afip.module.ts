import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfipStatusComponent } from './afip-status/afip-status.component';
import { AfipCheckboxComponent } from './afip-checkbox/afip-checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    ReactiveFormsModule
  ]
})
export class AfipModule { }
