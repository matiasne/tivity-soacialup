import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-select-impresora-bluetooth',
  templateUrl: './select-impresora-bluetooth.component.html',
  styleUrls: ['./select-impresora-bluetooth.component.scss'],
})
export class SelectImpresoraBluetoothComponent implements OnInit {

  public impresoras = [];
  @Output() select = new EventEmitter<any>();
  constructor(
    private bluetoothSerial:BluetoothSerial,
    private modalCtrl:ModalController,
    private platform:Platform
  ) {

    if (this.platform.is('cordova')) {
      this.bluetoothSerial.list().then((data) => {      
        console.log("dispositivos emparejados")  
        console.log(data);
        data.forEach(element => {
          if(element.class== "1664"){
            this.impresoras.push(element);
          }
        });      
      },
      (error) => {
        console.log("could not find paired devices because: " + error);
        alert(error);
      });
    }
   

  }

  ngOnInit() {

  }

  seleccionar(impresora){
    this.select.emit(impresora);
  }

}
