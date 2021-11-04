import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-edit-item-categoria',
  templateUrl: './edit-item-categoria.page.html',
  styleUrls: ['./edit-item-categoria.page.scss'],
})
export class EditItemCategoriaPage implements OnInit {

  public categoria:Categoria

  constructor(
    private navParams:NavParams,
    private modalController:ModalController
  ) {    
   
  }

  ngOnInit() {
   
  }

  ionViewDidEnter(){
    this.categoria = new Categoria();
    this.categoria.asignarValores(this.navParams.get('categoria'))
  }

  cerrar(){
    this.modalController.dismiss();
  }

}
