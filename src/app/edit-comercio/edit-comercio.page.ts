import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Comercio } from '../models/comercio';
@Component({
  selector: 'app-edit-comercio',
  templateUrl: './edit-comercio.page.html',
  styleUrls: ['./edit-comercio.page.scss'],
})
export class EditComercioPage implements OnInit {

  public comercio:Comercio

  constructor(
    private navParams:NavParams,
    private modalController:ModalController
  ) {

    
   
  }

  

  ngOnInit() {
   
  }

  ionViewDidEnter(){
    this.comercio = new Comercio();
    this.comercio.asignarValores(this.navParams.get('comercio'))
      
  }

  cerrar(){
    this.modalController.dismiss();
  }

}
