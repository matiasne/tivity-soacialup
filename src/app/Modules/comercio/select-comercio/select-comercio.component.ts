import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CambiarPlanPage } from 'src/app/cambiar-plan/cambiar-plan.page';
import { FormComercioPage } from 'src/app/form-comercio/form-comercio.page';
import { EnumPlanes, User } from 'src/app/models/user';
import { ComerciosService } from 'src/app/Modules/comercio/comercios.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { RolesService } from 'src/app/Services/roles.service';
import { ToastService } from 'src/app/Services/toast.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-select-comercio',
  templateUrl: './select-comercio.component.html',
  styleUrls: ['./select-comercio.component.scss'],
})
export class SelectComercioComponent implements OnInit {

  public comercios = [];
  public buscandoComercios = true;
  public user:User
  
  constructor(
    public authService:AuthenticationService,
    public comerciosService:ComerciosService,
    public rolesService:RolesService,
    public router:Router,
    public loadingService:LoadingService,
    public alertController:AlertController,
    public usuariosService:UsuariosService,
    public AuthenticationService:AuthenticationService,
    public toastService:ToastService,
    private modalCtrl:ModalController
  ) {

    this.comercios = []; 
    this.user = new User()

   }

  ngOnInit() {
    this.refrescar();
  }

  async refrescar(){
    this.comercios = [];
  //  this.user.asignarValores(this.authService.getActualUser());

    this.buscandoComercios = true;
    this.comercios = []; 
    
    let roles:any = await this.rolesService.getAllRolesbyEmailGET(this.authService.getActualUser().email).toPromise();

      for(let i = 0;i < roles.length; i++){
        
        if(roles[i].comercioId){
          if(roles[i].estado != "pendiente" && roles[i].estado != "rechazada"){
           
            let come = await this.comerciosService.get(roles[i].comercioId).toPromise()
            if(come){
              let comercio:any = come;
                comercio.rol = roles[i];
                this.comercios.push(comercio)
            }       
          }
        }
      }
      this.buscandoComercios = false
  }
    
 

  refresh(event) {
    setTimeout(() => {
      this.refrescar();
        event.target.complete();
      }, 500);
  }

  async nuevoComercio(){
    this.user = this.authService.getActualUser();


  /*  if(this.user.plan == EnumPlanes.free && this.comercios.length > 0){
      this.mostrartCambiarDePlan();
      return;      
    }*/
   

    const modal = await this.modalCtrl.create({
      component: FormComercioPage,
      componentProps:undefined
    });
    modal.onDidDismiss()
    .then((retorno) => {  
      this.refrescar()
    });
    return await modal.present();      
  }

  async mostrartCambiarDePlan(){
    const modal = await this.modalCtrl.create({
      component: CambiarPlanPage,
      componentProps:undefined
    });
    return await modal.present();
  }

  seleccionar(comercio){
    this.user = this.authService.getActualUser();    
    this.comerciosService.setSelectedCommerce(comercio);   
    this.authService.setRol(comercio.rol);
    this.rolesService.setRol(comercio.rol)
    this.router.navigate(['dashboard-comercio',{id:comercio.id}]);
    this.usuariosService.setComecioSeleccionado(this.authService.getActualUserId(),comercio.id);
       
  }

}
