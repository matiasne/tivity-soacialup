import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-form-recuperar-contrasena',
  templateUrl: './form-recuperar-contrasena.component.html',
  styleUrls: ['./form-recuperar-contrasena.component.scss'],
})
export class FormRecuperarContrasenaComponent implements OnInit {

  public email ="";
  
  constructor(private authFirebaseService:AuthenticationService) { }

  ngOnInit() {}

  recuperarContrasena(){
    this.authFirebaseService.resetPassword(this.email);
  }

}
