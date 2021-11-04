import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EditPedidoPage } from 'src/app/edit-pedido/edit-pedido.page';
import { Caja } from 'src/app/models/caja';
import { Item } from 'src/app/models/item';
import { EnumTipoMovimientoCaja } from 'src/app/models/movimientoCaja';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/Modules/pedidos/pedido.service';
import { MovimientosService } from 'src/app/Services/movimientos.service';

@Component({
  selector: 'app-card-movimiento',
  templateUrl: './card-movimiento.component.html',
  styleUrls: ['./card-movimiento.component.scss'],
})
export class CardMovimientoComponent implements OnInit {

  @Input() item:Item
  @Input() caja:Caja

  public enumTipoMovimientoCaja = EnumTipoMovimientoCaja

  constructor(
    private alertController:AlertController,
    private movimientosService:MovimientosService,
    private pedidosService:PedidoService,
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  async eliminar(item){

    const alert = await this.alertController.create({
      header: 'Está seguro que desea eliminar el movimiento?',
      message: 'Se perderán los registros del mismo',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {              
            this.movimientosService.eliminarMovimientoCaja(this.caja,item);
          }
        }
      ]
    });
    await alert.present();    
  }

  seleccionar(item){
    if(item.pedidoId){
      let obs = this.pedidosService.get(item.pedidoId).subscribe(async data=>{

        let editarPedido = new Pedido();
        editarPedido.asignarValores(data);
        

        const modal = await this.modalController.create({
          component: EditPedidoPage,
          componentProps:{
            pedido:editarPedido
          },
          id:'detail-pedido'      
        });
        modal.onDidDismiss()
        .then((retorno) => {
          
        })

        
        await modal.present();  
      })
    }
  }

}
