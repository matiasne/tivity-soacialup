import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormEstadoReservaPage } from '../form-estado-reserva/form-estado-reserva.page';

@Component({
  selector: 'app-select-reserva-estados',
  templateUrl: './select-reserva-estados.page.html',
  styleUrls: ['./select-reserva-estados.page.scss'],
})
export class SelectReservaEstadosPage implements OnInit {

  constructor(
    private modalCtrl:ModalController,    
  ) { }

  ngOnInit() {
    
  }

  async crearEstado(){
    const modal = await this.modalCtrl.create({
      id:'form-estado-reserva',
      component: FormEstadoReservaPage,     
      cssClass:'modal-custom-wrapper'  
    });
    return await modal.present(); 
  } 

  _select(estado){
    this.modalCtrl.dismiss(estado,undefined,'modal-select-estado')
  }

  cerrar(){
    this.modalCtrl.dismiss(undefined,undefined,'modal-select-estado')
  }

}
