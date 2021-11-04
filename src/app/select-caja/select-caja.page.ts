import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { EditCajaPage } from '../edit-caja/edit-caja.page';
import { Caja } from '../models/caja';
import { ClientesService } from '../Modules/clientes/clientes.service';
import { NavegacionParametrosService } from '../Services/global/navegacion-parametros.service';

@Component({
  selector: 'app-select-caja',
  templateUrl: './select-caja.page.html',
  styleUrls: ['./select-caja.page.scss'],
})
export class SelectCajaPage implements OnInit {
   
  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    public clientesService:ClientesService,
    private router: Router,
    private navParametrosService:NavegacionParametrosService
  ) { }

  ngOnInit() {      
    
  }

  async nuevo(){
    const modal = await this.modalController.create({
      component: EditCajaPage      
    });
    
    modal.present().then(()=>{
      
    })

    return await modal.present();
  }

  cerrar(){
    this.modalController.dismiss();
  }

  select(c){
    let caja = new Caja();
    caja.asignarValores(c)
    this.navParametrosService.setParam(caja)
    this.router.navigate(['dashboard-caja']);     
  }

  async edit(caja){
    const modal = await this.modalController.create({
      component: EditCajaPage,
      componentProps:{
        caja:caja
      }      
    });
    
    modal.present().then(()=>{
      
    })

    return await modal.present();
  }



 

}
