import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Cliente } from '../Modules/clientes/cliente';

declare var google: any;

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.page.html',
  styleUrls: ['./form-cliente.page.scss'],
})
export class FormClientePage implements OnInit {

  public titulo = "Nuevo Cliente";
  public cliente:Cliente
  constructor(
   private modalController:ModalController,
   private navParams: NavParams,
  ) { 
    
    
  }

  ngOnInit() {
    this.cliente = new Cliente() 
    if(this.navParams.get('client')){
      this.titulo = "Editar Cliente";
      this.cliente = this.navParams.get('client')
      console.log(this.cliente)
    }
  }

  ionViewDidEnter(){
    
  }

  ionViewDidLeave(){
   
  }

  cerrar(){
    this.modalController.dismiss()
  }

  
 

}
