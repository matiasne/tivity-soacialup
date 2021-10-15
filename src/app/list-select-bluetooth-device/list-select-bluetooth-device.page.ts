import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { FormImpresoraPage } from '../form-impresora/form-impresora.page';
import { BluettothDevice } from '../models/bluetooth-device';
import { BluetoothService } from '../Services/bluetooth.service';

@Component({
  selector: 'app-list-select-bluetooth-device',
  templateUrl: './list-select-bluetooth-device.page.html',
  styleUrls: ['./list-select-bluetooth-device.page.scss'],
})
export class ListSelectBluetoothDevicePage implements OnInit {

  constructor(
    private modalCtrl:ModalController,
  ) {

  }

  ngOnInit() {

  }

  async seleccionar(dispositivo){   

    this.modalCtrl.dismiss(dispositivo)

  }

  cerrar(){
    this.modalCtrl.dismiss()
  }

}
