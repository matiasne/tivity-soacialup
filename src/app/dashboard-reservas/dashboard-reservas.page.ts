import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditReservaPage } from '../edit-reserva/edit-reserva.page';
import { Reserva } from '../models/reserva';
import { ReservasService } from '../Modules/reservas/reservas.service';

@Component({
  selector: 'app-dashboard-reservas',
  templateUrl: './dashboard-reservas.page.html',
  styleUrls: ['./dashboard-reservas.page.scss'],
})
export class DashboardReservasPage implements OnInit {

  public vistaLista = false;

  constructor(
    private modalCtrl:ModalController,
    private reservasService:ReservasService,
  ) { }

  ngOnInit(){

  }

  async nuevaReserva(fechaInicio = null){

    let res = new Reserva();
    res.desde = fechaInicio;

   const modal = await this.modalCtrl.create({
      component: EditReservaPage,
      componentProps:{
        reserva: res
     },     
      cssClass:'modal-custom-wrapper',

    });         

    modal.onDidDismiss()
    
    .then((retorno) => { 

      if(retorno.data){   
      this.reservasService.add(retorno.data).then(data=>{
        console.log("Reserva guardada")
      })
      }else{

      }     
    });

    await modal.present();
  }

  verLista(){
    this.vistaLista = !this.vistaLista;
    console.log(this.vistaLista)
  }

}
