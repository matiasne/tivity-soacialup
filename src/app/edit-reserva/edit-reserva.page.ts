import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Reserva } from '../models/reserva';
import { Rol } from '../models/rol';

@Component({
  selector: 'app-edit-reserva',
  templateUrl: './edit-reserva.page.html',
  styleUrls: ['./edit-reserva.page.scss'],
})
export class EditReservaPage implements OnInit {

  @Input() reserva:Reserva;
  public personal:Rol;
  public estados = [];

  constructor(
    private modalController:ModalController,
    private navParams:NavParams,
  ){

  }

  ngOnInit(){
    this.reserva = new Reserva()
    this.reserva.asignarValores(this.navParams.get('reserva'))
  }

  cerrar(){
    this.modalController.dismiss();
  }
}
