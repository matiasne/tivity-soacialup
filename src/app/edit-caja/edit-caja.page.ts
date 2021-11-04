import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ModalController, NavParams, AlertController } from '@ionic/angular';
import { CajasService } from '../Modules/cajas/cajas.service';
import { Caja } from '../models/caja';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-edit-caja',
  templateUrl: './edit-caja.page.html',
  styleUrls: ['./edit-caja.page.scss'],
})
export class EditCajaPage implements OnInit {

  public titulo = "";
  public caja:Caja
  constructor(
   private modalController:ModalController,
   private navParams: NavParams,
  ) { 
    
    
  }

  ngOnInit() {
    this.caja = new Caja() 
    this.caja.asignarValores(this.navParams.get('caja'))
  }

  ionViewDidEnter(){
    
  }

  ionViewDidLeave(){
   
  }

  cerrar(){
    this.modalController.dismiss()
  }

  
 

  
}
