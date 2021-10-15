import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { ImpresoraService } from '../impresora.service';

@Component({
  selector: 'app-button-impresion',
  templateUrl: './button-impresion.component.html',
  styleUrls: ['./button-impresion.component.scss'],
})
export class ButtonImpresionComponent implements OnInit {

  @Input() pedido:Pedido
  @Input() tipo:string

  constructor(
    private impresoraService:ImpresoraService
  ) { }

  ngOnInit() {}

  imprimir(){
    if(this.tipo=="ticket"){
      this.impresoraService.impresionTicket(this.pedido)
    }

    if(this.tipo=="comanda"){
      this.impresoraService.impresionComanda(this.pedido)
    }
  }


}
