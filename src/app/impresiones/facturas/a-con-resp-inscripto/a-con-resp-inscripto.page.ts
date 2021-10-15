import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Comercio } from 'src/app/models/comercio';
import { Pedido } from 'src/app/models/pedido';
import { Cliente } from 'src/app/Modules/clientes/cliente';
import { ComerciosService } from 'src/app/Modules/comercio/comercios.service';

@Component({
  selector: 'app-a-con-resp-inscripto',
  templateUrl: './a-con-resp-inscripto.page.html',
  styleUrls: ['./a-con-resp-inscripto.page.scss'],
})
export class AConRespInscriptoPage implements OnInit {

  public comercio:Comercio;
  public pedido:Pedido;
  public cliente:Cliente;

  constructor(
    private comerciosService:ComerciosService,
    private navParams:NavParams,
  ) {
    this.comercio = new Comercio();
    this.cliente = new Cliente();
    this.pedido = new Pedido();
   }

  ngOnInit(){
    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue())
    this.pedido.asignarValores(this.navParams.get('pedido'))
    this.cliente.asignarValores(this.navParams.get('cliente'))
  }





}
