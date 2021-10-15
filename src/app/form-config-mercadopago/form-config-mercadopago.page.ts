import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comercio } from '../models/comercio';
import { ComerciosService } from '../Services/comercios.service';
import { MercadopagoService } from '../Modules/mercadopago/mercadopago.service';

@Component({
  selector: 'app-form-config-mercadopago',
  templateUrl: './form-config-mercadopago.page.html',
  styleUrls: ['./form-config-mercadopago.page.scss'],
})
export class FormConfigMercadopagoPage implements OnInit {

  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {
   }

   cerrar(){
    this.modalCtrl.dismiss()
  }

}
