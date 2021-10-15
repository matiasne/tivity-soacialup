import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comercio } from 'src/app/models/comercio';
import { ComerciosService } from 'src/app/Modules/comercio/comercios.service';
import { ToastService } from 'src/app/Services/toast.service';
import { AfipServiceService } from '../afip-service.service';

@Component({
  selector: 'app-afip-status',
  templateUrl: './afip-status.component.html',
  styleUrls: ['./afip-status.component.scss'],
})
export class AfipStatusComponent implements OnInit {

  public comercio:Comercio
  public password="";
  
  constructor(
    private modalCtrl:ModalController,
    private toastService:ToastService,
    private comercioService:ComerciosService
  ) { 
    this.comercio = new Comercio();
    this.comercio.asignarValores(this.comercioService.getSelectedCommerceValue())
  }

  ngOnInit() {
  }


  async validar(){
    try{      
      this.modalCtrl.dismiss();
      this.toastService.mensaje("Conectado correctamente","")
    }catch(err){
      this.toastService.alert("Verificar Clave","No se pudo conectar")
    }
    
  }

  update(){

    
    this.comercioService.update(this.comercio);
  }

  desvincular(){
    this.comercio.afip = {
      token:"",
      puntoVenta:""
    }
    this.comercioService.update(this.comercio);
  }

}
