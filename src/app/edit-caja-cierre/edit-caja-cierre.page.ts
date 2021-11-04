import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Caja } from '../models/caja';

@Component({
  selector: 'app-edit-caja-cierre',
  templateUrl: './edit-caja-cierre.page.html',
  styleUrls: ['./edit-caja-cierre.page.scss'],
})
export class EditCajaCierrePage implements OnInit {

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
