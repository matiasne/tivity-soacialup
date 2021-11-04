import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-cobrar-pedido',
  templateUrl: './cobrar-pedido.page.html',
  styleUrls: ['./cobrar-pedido.page.scss'],
})
export class CobrarPedidoPage implements OnInit {

  public pedido:Pedido

  constructor(
    private modalController:ModalController,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
    this.pedido = new Pedido() 
    this.pedido.asignarValores(this.navParams.get('caja'))
  }

  
  cerrar(){
    this.modalController.dismiss()
  }


}
