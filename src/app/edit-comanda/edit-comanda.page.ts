import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-edit-comanda',
  templateUrl: './edit-comanda.page.html',
  styleUrls: ['./edit-comanda.page.scss'],
})
export class EditComandaPage implements OnInit {

  public pedido:Pedido;
  constructor(
    private navParams:NavParams,
    private modalController:ModalController,
  ){

    
  }

  ngOnInit(){
    this.pedido = new Pedido()
    this.pedido.asignarValores(this.navParams.get('pedido'))
  }

  cerrar(){
    this.modalController.dismiss()
  }


}
