import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Caja } from '../models/caja';

@Component({
  selector: 'app-edit-caja-apertura',
  templateUrl: './edit-caja-apertura.page.html',
  styleUrls: ['./edit-caja-apertura.page.scss'],
})
export class EditCajaAperturaPage implements OnInit {

  public caja:Caja
  
  constructor(
   private modalController:ModalController,
   private navParams: NavParams,
  ) { 
    this.caja = new Caja() 
    this.caja.asignarValores(this.navParams.get('caja'))
  }

  ngOnInit() {
    
  }

  cerrar(){
    this.modalController.dismiss()
  }

}
