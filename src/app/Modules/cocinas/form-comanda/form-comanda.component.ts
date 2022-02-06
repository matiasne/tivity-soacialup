import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comercio } from 'src/app/models/comercio';
import { EnumEstadoCocina } from 'src/app/models/item';
import { Mesa } from 'src/app/models/mesa';
import { EnumTipoMovimientoCaja } from 'src/app/models/movimientoCaja';
import { Pedido } from 'src/app/models/pedido';
import { ComerciosService } from '../../comercio/comercios.service';
import { PedidoService } from '../../pedidos/pedido.service';

@Component({
  selector: 'app-form-comanda',
  templateUrl: './form-comanda.component.html',
  styleUrls: ['./form-comanda.component.scss'],
})
export class FormComandaComponent implements OnInit {

  private enumTipoMovimientoCaja = EnumTipoMovimientoCaja
  
  @Input() pedido:Pedido;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();
  @Output() demora = new EventEmitter<any>();
  
  public comercio:Comercio;
  public mesa:Mesa
  
  public cEstado = EnumEstadoCocina; 
  
  public comentarios = [];

  constructor(
    public comerciosService:ComerciosService,
    private pedidosService:PedidoService,
  ) {

    this.comercio = new Comercio()
    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue());

    
   }

  ngOnInit() {

  }  
  
  actualizarPedido(){
    if(this.pedido.id){
      this.pedido.direccion = JSON.parse(JSON.stringify(this.pedido.direccion));
      this.pedidosService.update(this.pedido).then(data=>{
        console.log(data)
      })
    }
  }  


  _demora(min){
    this.pedido.fechaTomado = new Date()
    this.pedido.comanda.demora = min
    this.actualizarPedido()
    this.demora.emit()
  }
}
