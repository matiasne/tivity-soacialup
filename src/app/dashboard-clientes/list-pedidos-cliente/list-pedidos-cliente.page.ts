import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditPedidoPage } from 'src/app/edit-pedido/edit-pedido.page';
import { Pedido } from 'src/app/models/pedido';
import { Cliente } from 'src/app/Modules/clientes/cliente';
import { ListPedidosComponent } from 'src/app/Modules/pedidos/list-pedidos/list-pedidos.component';
import { NavegacionParametrosService } from 'src/app/Services/global/navegacion-parametros.service';

@Component({
  selector: 'app-list-pedidos-cliente',
  templateUrl: './list-pedidos-cliente.page.html',
  styleUrls: ['./list-pedidos-cliente.page.scss'],
})
export class ListPedidosClientePage implements OnInit {
  @ViewChild(ListPedidosComponent) listPedidoManagerChild:ListPedidosComponent;

  public cliente:Cliente;
  constructor(
    public modalController:ModalController,
    private route:ActivatedRoute,
    private navParametrosService:NavegacionParametrosService
  ) { 
    this.cliente = new Cliente()
  }

  ngOnInit() {
    this.navParametrosService.getParam().subscribe(param =>{
      if(param instanceof Cliente){
      console.log("!!!!")
      this.cliente.asignarValores(param)    
    }
    })

    
    
  }

  ngAfterViewInit(){

    
  }

  ionViedDidLeave(){
    this.listPedidoManagerChild.borrarDatosComponente()
  }

  async nuevoPedido(){
    
    let pedido = new Pedido();
    pedido.asignarCliente(this.cliente)

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
