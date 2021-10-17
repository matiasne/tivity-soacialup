import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditPedidoPage } from 'src/app/edit-pedido/edit-pedido.page';
import { Pedido } from 'src/app/models/pedido';
import { Division } from 'src/app/models/subdivision';
import { ListPedidosComponent } from 'src/app/Modules/pedidos/list-pedidos/list-pedidos.component';
import { NavegacionParametrosService } from 'src/app/Services/global/navegacion-parametros.service';

@Component({
  selector: 'app-list-pedidos-division',
  templateUrl: './list-pedidos-division.page.html',
  styleUrls: ['./list-pedidos-division.page.scss'],
})
export class ListPedidosDivisionPage implements OnInit {

  @ViewChild(ListPedidosComponent) listPedidoChild:ListPedidosComponent;
  public division:Division
  constructor(
    public modalController:ModalController,
    private navParametrosService:NavegacionParametrosService,
    ) { 
      this.division = new Division();
      if(this.navParametrosService.param instanceof Division){
        this.division.asignarValores(this.navParametrosService.param)
      }
    }
 
  ngOnInit() {
    
  }

  ionViewDidLeave(){
    this.listPedidoChild.borrarDatosComponente()
  }

  async nuevoPedido(){
    
    let pedido = new Pedido();
    pedido.divisionNombre = this.division.nombre
    const modal = await this.modalController.create({
      component: EditPedidoPage,
      componentProps:{
        pedido:pedido
      },
      id:'detail-pedido'      
    });
  
    
    await modal.present();  
  }

}
