import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Cliente } from '../Modules/clientes/cliente';

declare var google: any;
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.page.html',
  styleUrls: ['./edit-cliente.page.scss'],
})
export class EditClientePage implements OnInit {

  public titulo = "";
  public cliente:Cliente
  constructor(
   private modalController:ModalController,
   private navParams: NavParams,
  ) { 
    
    
  }

  ngOnInit() {
    this.cliente = new Cliente() 
    this.cliente.asignarValores(this.navParams.get('cliente'))
  }

  ionViewDidEnter(){
    
  }

  ionViewDidLeave(){
   
  }

  cerrar(){
    this.modalController.dismiss()
  }

  
 

}
