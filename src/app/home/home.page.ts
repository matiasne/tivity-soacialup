import { Component, OnInit } from '@angular/core';
import { ComerciosService } from '../Modules/comercio/comercios.service';
import { AuthenticationService } from '../Modules/authentication/authentication.service';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { RolesService } from '../Services/roles.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../Services/loading.service';
import { UsuariosService } from '../Services/usuarios.service';
import { ToastService } from '../Services/toast.service';
import { FormComercioPage } from '../form-comercio/form-comercio.page';
import { CambiarPlanPage } from '../cambiar-plan/cambiar-plan.page';
import { EnumPlanes, User } from '../models/user';
import { ImpresoraService } from '../Modules/impresion/impresora.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  

  constructor(
    private platform:Platform
  ) {   

    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
    });  

  } 

  ngOnInit() {

  } 

  
  

  


  

  }
