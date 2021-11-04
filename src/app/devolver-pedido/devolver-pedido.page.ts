import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-devolver-pedido',
  templateUrl: './devolver-pedido.page.html',
  styleUrls: ['./devolver-pedido.page.scss'],
})
export class DevolverPedidoPage implements OnInit {

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
