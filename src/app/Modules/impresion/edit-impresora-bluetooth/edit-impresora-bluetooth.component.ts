import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { BluettothImpresora } from 'src/app/models/bluetooth-impresora';

@Component({
  selector: 'app-edit-impresora-bluetooth',
  templateUrl: './edit-impresora-bluetooth.component.html',
  styleUrls: ['./edit-impresora-bluetooth.component.scss'],
})
export class EditImpresoraBluetoothComponent implements OnInit {

  
  public impresora:BluettothImpresora
  constructor(
  ) { 
    
  }

  ngOnInit() {
  }

}
