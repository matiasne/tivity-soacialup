import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Comercio } from '../models/comercio';
import { ComerciosService } from '../Modules/comercio/comercios.service';
import { LoadingService } from '../Modules/core/services/loading.service';

declare var MercadoPago: any

@Component({
  selector: 'app-form-card-token',
  templateUrl: './form-card-token.page.html',
  styleUrls: ['./form-card-token.page.scss'],
})
export class FormCardTokenPage implements OnInit {
 

  public cardLogo = ""

  public tiposDocumentos= [];
  public tiposPagos = []

  public email ="mati@mati.com";
  public cupon ="";
  public cards: any;
  public cardNumber = "5031755734530604";
  public securityCode="123";
  public cardExpirationMonth="11";
  public cardExpirationYear="25";
  public cardholderName="Matias Negri";
  public docType="DNI";
  public identificationNumber="31809039";
  public paymentMethodId:any;
  public amount="0";
  public installments:any = [];
  public selectedInstallments = -1;
  public issuerId = 0;

  public user:any ="";
  paymetnDataForm: FormGroup;

  public comercio:Comercio

  public cardForm:any
  public mp:any

  constructor(
    private comerciosService:ComerciosService,
    public changeRef:ChangeDetectorRef,
  ) { 

    this.comercio = new Comercio()
    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue())
   
    

    this.mp = new MercadoPago("TEST-e8c27e9f-aae8-41eb-a89c-e7937c04cd6a",{locale: 'en-US',
    advancedFraudPrevention: true,})
   


  }

  ionViewDidEnter(){
    
   
  }

  async ngOnInit() {
    
    
    
    
  }

  ionViewDidLeave(){
    this.cardForm.unmount()
  }

  
  


}
