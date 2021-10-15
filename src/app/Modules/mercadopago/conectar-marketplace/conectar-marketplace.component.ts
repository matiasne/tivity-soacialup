import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comercio } from '../../../models/comercio';
import { ComerciosService } from '../../../Modules/comercio/comercios.service';
import { MercadopagoService } from '../mercadopago.service';

@Component({
  selector: 'app-conectar-marketplace',
  templateUrl: './conectar-marketplace.component.html',
  styleUrls: ['./conectar-marketplace.component.scss'],
})
export class ConectarMarketplaceComponent implements OnInit {
  private comercio:Comercio
  public publicKey = "";
  public privateKey="";
  public link="";

  constructor(
    private modalCtrl:ModalController,
    private mercadoPagoService:MercadopagoService,
    private comercioService:ComerciosService
  ) { 
    this.comercio = new Comercio();
  }


  ngOnInit() {
    
    this.comercio.asignarValores(this.comercioService.getSelectedCommerceValue())
    this.link = "https://auth.mercadopago.com.ar/authorization?client_id=6782463642048642&response_type=code&platform_id=mp&state=id="+this.comercio.id+"&redirect_uri=https://us-central1-tivity-socialup.cloudfunctions.net/api/mercadopago/marketplaceAuth"
  }

  guardar(){
    this.mercadoPagoService.guardarKeys(this.privateKey,this.publicKey).then(data=>{
      console.log(data)
    })
    this.modalCtrl.dismiss()
  }

  

  desvincular(){
    this.comercio.mercadoPago={
      publicKey:"",
      nickname: "",
      permalink:"",
    }
  }

}
