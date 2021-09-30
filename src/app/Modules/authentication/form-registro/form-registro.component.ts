import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
})
export class FormRegistroComponent implements OnInit {
  tipoRegistro: string = 'cliente';
  
  @ViewChild('passwordEyeRegister') passwordEye;
  @ViewChild('passwordEyeConfirmation') passwordEyeConfirm;
  passwordTypeInput1  =  'password';
  iconpassword1  =  'eye-off';

  datosForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router,
    private authFirestoreService:AuthenticationService,
  ) { 
    this.datosForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName : ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],      
      passwordConfirmation:['', Validators.required],
      accepted: [false, Validators.required]    
    });
    
  }

  ngOnInit() {
  }

  get f() { return this.datosForm.controls; }

  registrar(){

    this.submitted = true;
    if(this.f.password.value == ''){
      this.presentToast("Debe ingresar una contraseña");
      return;
    }
    if(this.f.password.value != this.f.passwordConfirmation.value){
      this.presentToast("La contraseña y su confirmación no coinciden");
      return;
    }
    if(this.f.accepted.value != true){
      this.presentToast("Debe leer y aceptar los términos y condiciones");
      return;
    }   
    
    this.authFirestoreService.signup(this.datosForm.value);
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      color: 'danger',
      duration: 3000
    });
    toast.present();
  }

  togglePasswordMode() {
    this.passwordTypeInput1  =  this.passwordTypeInput1  ===  'text'  ?  'password'  :  'text';
    this.iconpassword1  =  this.iconpassword1  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }


}
