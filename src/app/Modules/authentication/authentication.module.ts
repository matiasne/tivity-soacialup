import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FormLoginComponent
  ],
  exports:[
    FormLoginComponent
  ]
  
})
export class AuthenticationModule { }
