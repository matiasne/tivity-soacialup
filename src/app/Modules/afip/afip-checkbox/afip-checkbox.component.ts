import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { LoadingService } from 'src/app/Services/loading.service';
import { AfipServiceService } from '../afip-service.service';

@Component({
  selector: 'app-afip-checkbox',
  templateUrl: './afip-checkbox.component.html',
  styleUrls: ['./afip-checkbox.component.scss'],
})
export class AfipCheckboxComponent implements OnInit {

  @Input() habilitadoFacturar = true;
  @Input() clienteDoc = "";
  public facturar = false;

  constructor(
    private loadingService:LoadingService,
    private afipService:AfipServiceService
  ) {
    if(this.clienteDoc == ""){
      this.habilitadoFacturar = false;
    }
   }

  ngOnInit() {
    this.facturar = (localStorage.getItem('facturar') === "true")    
    console.log(this.facturar)

    
  }

  updateFacturar(event){
    console.log(event.target.checked)
    localStorage.setItem('facturar',event.target.checked)
  }

  async realizarFactura(pedido){
    if(this.facturar){
      this.loadingService.presentLoadingText("Creando factura electrónica")
      try{       
        let res:any = await this.afipService.facturarPedido(pedido.id)
        console.log(res);
        pedido.afipFactura = res.afipFactura //para poder imprimirlo
        this.loadingService.dismissLoading();
      }
      catch(err){
        console.log(err)
        this.loadingService.dismissLoading();
      }
      
    }
  }


}
