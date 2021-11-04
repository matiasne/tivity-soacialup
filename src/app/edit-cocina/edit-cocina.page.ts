import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Cocina } from '../models/cocina';

@Component({
  selector: 'app-edit-cocina',
  templateUrl: './edit-cocina.page.html',
  styleUrls: ['./edit-cocina.page.scss'],
})
export class EditCocinaPage implements OnInit {

  public titulo = "";
  public cocina:Cocina
  constructor(
   private modalController:ModalController,
   private navParams: NavParams,
  ) { 
    
    
  }

  ngOnInit() {
    this.cocina = new Cocina() 
    this.cocina.asignarValores(this.navParams.get('cocina'))
  }

  ionViewDidEnter(){
    
  }

  ionViewDidLeave(){
   
  }

  cerrar(){
    this.modalController.dismiss()
  }
}
