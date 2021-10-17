import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from '../models/item';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.page.html',
  styleUrls: ['./edit-producto.page.scss'],
})
export class EditProductoPage implements OnInit {

  @Input() item:Item
  
  constructor(
    private modalController:ModalController
  ) {   
  
  } 

  ngOnInit() {
  }

  async ionViewDidEnter(){   

  }

  ionViewDidLeave(){   

  }

  cerrar(){
    this.modalController.dismiss()
  }

  
}
