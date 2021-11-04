import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Caja } from '../models/caja';

@Component({
  selector: 'app-edit-caja-ingreso',
  templateUrl: './edit-caja-ingreso.page.html',
  styleUrls: ['./edit-caja-ingreso.page.scss'],
})
export class EditCajaIngresoPage implements OnInit {

  public caja:Caja
  
  constructor(
   private modalController:ModalController,
   private navParams: NavParams,
  ) { 

  }

  ngOnInit() {
    this.caja = new Caja() 
    this.caja.asignarValores(this.navParams.get('caja'))
  }

  cerrar(){
    this.modalController.dismiss()
  }

}
