import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormImpresoraPage } from 'src/app/form-impresora/form-impresora.page';
import { ListSelectBluetoothDevicePage } from 'src/app/list-select-bluetooth-device/list-select-bluetooth-device.page';
import { BluettothImpresora } from 'src/app/models/bluetooth-impresora';
import { ComerciosService } from 'src/app/Modules/comercio/comercios.service';
import { ImpresoraService } from '../impresora.service';

@Component({
  selector: 'app-config-impresora',
  templateUrl: './config-impresora.component.html',
  styleUrls: ['./config-impresora.component.scss'],
})
export class ConfigImpresoraComponent implements OnInit {

  public impresora:BluettothImpresora
  public impresoraUSB:any
  public impresionBandeja = false; 
  public cocinas = [];

  constructor(
    private modalCtrl:ModalController,
    private impresoraService:ImpresoraService,
    private comercioService:ComerciosService
  ) { 
    this.impresora = new BluettothImpresora()   
    this.impresora = this.impresoraService.getImpresoraBT()
    this.impresionBandeja = this.impresoraService.getImpresoraBandeja()
    console.log(this.impresora)
    
  }

  ngOnInit() {
    
  }

  async seleccionar(printer){
    const modal = await this.modalCtrl.create({
      component: FormImpresoraPage,
      componentProps:{dispositivo:printer}
    });
    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data){
        this.impresora.asignarValores(retorno.data)
        this.impresoraService.guardarImpresoraBT(retorno.data);
      }
               
    });
    return await modal.present();
  }

  async agregarImpresora(){
    const modal = await this.modalCtrl.create({
      component: ListSelectBluetoothDevicePage,
      id:'list-impresoras'
    });
    modal.onDidDismiss()
    .then(async (retorno) => {
      if(retorno.data){   
        
          const modal = await this.modalCtrl.create({
            component: FormImpresoraPage,
            componentProps:{dispositivo:retorno.data}
          });
          modal.onDidDismiss()
          .then((retorno) => {
            this.impresora.asignarValores(retorno.data)
            this.impresoraService.guardarImpresoraBT(retorno.data);
          });
          return await modal.present();             
        }             
    });
    return await modal.present();
  }

  async agregarImpresoraUSB(){
    await this.impresoraService.seleccionarDispositivoUSB()
    this.impresoraUSB = this.impresoraService.dispositivoUSBConectado;
  }

  eliminarImpresoraUSB(){
    this.impresoraService.desvincularUSB();
    this.impresoraUSB =undefined;
  }


  
  conectar(){
    this.impresoraService.impresionPrueba("usuario prueba")
  }

  updateBandeja(){    
    this.impresoraService.setImpresoraBandeja(this.impresionBandeja)
  }

  eliminar(){
    this.impresora = new BluettothImpresora()   
    this.impresoraService.eliminarImpresoraBT()
  }


}
