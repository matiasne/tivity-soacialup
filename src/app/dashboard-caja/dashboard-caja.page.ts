import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComerciosService } from '../Modules/comercio/comercios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CajasService } from '../Modules/cajas/cajas.service';
import { VentasService } from '../Services/ventas.service';
import { LoadingService } from '../Services/loading.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Caja } from '../models/caja';
import { EnumTipoMovimientoCaja, MovimientoCaja } from '../models/movimientoCaja';
import { MovimientosService } from '../Services/movimientos.service';
import { Comercio } from '../models/comercio';
import { PedidoService } from '../Modules/pedidos/pedido.service';
import { Pedido } from '../models/pedido';
import { NavegacionParametrosService } from '../Services/global/navegacion-parametros.service';
import { EditPedidoPage } from '../edit-pedido/edit-pedido.page';
import { EditCajaAperturaPage } from '../edit-caja-apertura/edit-caja-apertura.page';

@Component({
  selector: 'app-dashboard-caja',
  templateUrl: './dashboard-caja.page.html',
  styleUrls: ['./dashboard-caja.page.scss'],
})
export class DashboardCajaPage implements OnInit {

  public caja:Caja;

  constructor(
    private navParametrosService:NavegacionParametrosService,
    private modalController:ModalController
    ){
    this.caja = new Caja()
    this.navParametrosService.getParam().subscribe(param =>{
      if(param instanceof Caja){
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ")
      this.caja.asignarValores(param)    
    }
    })
  }

  ngOnInit(){
    
  }

  async abrirCaja(){
    const modal = await this.modalController.create({
      component: EditCajaAperturaPage,
      componentProps:{
        caja:this.caja
      },
      cssClass:'modal-custom-wrapper',      
    });
    
    modal.present().then(()=>{
    

    })
  }



}

