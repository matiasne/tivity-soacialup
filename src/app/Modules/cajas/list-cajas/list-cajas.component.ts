import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CambiarPlanPage } from 'src/app/cambiar-plan/cambiar-plan.page';
import { EditCajaPage } from 'src/app/edit-caja/edit-caja.page';
import { Comercio } from 'src/app/models/comercio';
import { ComerciosService } from '../../comercio/comercios.service';
import { CajasService } from '../cajas.service';

@Component({
  selector: 'app-list-cajas',
  templateUrl: './list-cajas.component.html',
  styleUrls: ['./list-cajas.component.scss'],
})
export class ListCajasComponent implements OnInit, OnDestroy {
  
  @Output() seleccionar = new EventEmitter<any>();

  cajasSubs:Subscription;
  public cajas =[];

  public buscando = true;
  public comercio:Comercio
  
  constructor(
    private cajasService:CajasService,
    private modalCtrl:ModalController,
    private comercioService:ComerciosService
  ) { 
    this.comercio = new Comercio()
    this.comercio.asignarValores(this.comercioService.getSelectedCommerceValue())
  }

  ngOnInit() {
    this.cajasService.setOrderBy("nombre","desc");
    this.cajasSubs = this.cajasService.list().subscribe((caja:any)=>{        
      this.cajas = caja;  
      this.buscando = false;    
    });
  }

  ngOnDestroy(){
    this.cajasSubs.unsubscribe();
  }

  async _seleccionar(caja){
    this.seleccionar.emit(caja)    
  }

  async openAddCaja(){

    if(this.cajas.length > this.comercio.config.productosMaxLength){
      let modal = await this.modalCtrl.create({
        component: CambiarPlanPage,
        componentProps: {
          extraText: "Haz alcanzado el límite de cajas de tu plan: "+this.comercio.plan,
          actualPlan:this.comercio.plan
        }
      });  
      return await modal.present();
    }
    else{
      let comercio_seleccionadoId = localStorage.getItem('comercio_seleccionadoId');
      const modal = await this.modalCtrl.create({
        component: EditCajaPage,
        componentProps: { 
          comercioId: comercio_seleccionadoId
        }
      });

      return await modal.present();
    }

    
  }

  async openEditCaja(item){
    const modal = await this.modalCtrl.create({
      component: EditCajaPage,
      componentProps: { 
        caja: item
      }
    });  

    return await modal.present();
  }

}
