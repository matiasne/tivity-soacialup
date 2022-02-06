import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Caja } from '../models/caja';
import { NavegacionParametrosService } from '../Services/global/navegacion-parametros.service';
import { EditCajaAperturaPage } from '../edit-caja-apertura/edit-caja-apertura.page';

@Component({
  selector: 'app-dashboard-caja',
  templateUrl: './dashboard-caja.page.html',
  styleUrls: ['./dashboard-caja.page.scss'],
})
export class DashboardCajaPage implements OnInit {

  public caja:Caja;

  constructor(
    private navParametrosService:NavegacionParametrosService,
    private modalController:ModalController
    ){
    this.caja = new Caja()
    this.navParametrosService.getParam().subscribe(param =>{
      if(param instanceof Caja){
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ")
      this.caja.asignarValores(param)    
    }
    })
  }

  ngOnInit(){
    
  }

  async abrirCaja(){
    const modal = await this.modalController.create({
      component: EditCajaAperturaPage,
      componentProps:{
        caja:this.caja
      },
      cssClass:'modal-custom-wrapper',      
    });
    
    modal.present().then(()=>{
    

    })
  }



}

