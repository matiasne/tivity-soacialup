import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-configuracion-afip',
  templateUrl: './form-configuracion-afip.page.html',
  styleUrls: ['./form-configuracion-afip.page.scss'],
})
export class FormConfiguracionAfipPage implements OnInit {

  constructor(
    private modalCtrl:ModalController
  ) { 
  }

  ngOnInit() {
  }
 
  cerrar(){
    this.modalCtrl.dismiss();
  }

}
