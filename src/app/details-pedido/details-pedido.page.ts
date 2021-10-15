import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Pedido } from '../models/pedido';


@Component({
  selector: 'app-details-pedido',
  templateUrl: './details-pedido.page.html',
  styleUrls: ['./details-pedido.page.scss'],
})
export class DetailsPedidoPage implements OnInit {

  public pedido:Pedido;
  constructor(
    private navParams:NavParams,
    private modalController:ModalController,
  ){

    this.pedido = new Pedido()
    this.pedido.asignarValores(this.navParams.get('pedido'))
  }

  ngOnInit(){

  }

  cerrar(){
    this.modalController.dismiss()
  }

 
}

  


  
  

  

  


