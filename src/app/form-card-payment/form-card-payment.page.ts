import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Comercio } from '../models/comercio';
import { Pedido } from '../models/pedido';
import { ComerciosService } from '../Services/comercios.service';
import { LoadingService } from '../Services/loading.service';
import { MercadopagoService } from '../Services/mercadopago.service';

declare let Mercadopago: any

@Component({
  selector: 'app-form-card-payment',
  templateUrl: './form-card-payment.page.html',
  styleUrls: ['./form-card-payment.page.scss'],
})
export class FormCardPaymentPage implements OnInit {


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
  public amount=0;
  public installments:any = [];
  public selectedInstallments = -1;
  public issuerId = 0;

  public user:any ="";
  paymetnDataForm: FormGroup;

  public comercio:Comercio

  constructor(
    private modalCtrl:ModalController,
    private comerciosService:ComerciosService,
    private loadingService:LoadingService,
    private navParams:NavParams,
    public changeRef:ChangeDetectorRef,
  ) {

    this.comercio = new Comercio()
    
    this.paymetnDataForm = new FormGroup({
      email:new FormControl(this.email),
      cardNumber: new FormControl(this.cardNumber, [
        Validators.required,
        Validators.minLength(16)
      ]),
      securityCode: new FormControl(this.securityCode,[Validators.required])
    });
   

   }

  async ngOnInit() {
    this.amount = this.navParams.get('amount')
    Mercadopago.clearSession()

    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue())
    
    Mercadopago.setPublishableKey(this.comercio.mercadoPago.publicKey)


    this.guessingPaymentMethod() 
     
  }

  sdkResponseHandler = (status,response) => {
    console.log(response)
    this.loadingService.dismissLoading()
    if(response.error){
      if(response.cause[0].code === "205"){
        alert("Ingresa un número de tarjeta")
      }
      if(response.cause[0].code === "E301"){
        alert("Numero de tarjeta inválido")
      }
      if(response.cause[0].code === "E302"){
        alert("Código de seguridad inválido")        
      }
      if(response.cause[0].code === "221"){
        alert("Ingresa nombre de propietario de la tarjeta")
        
      }
      return;
    }

    if(this.selectedInstallments == -1){
      alert("Seleccione el número de cuotas");
      return;
    }

    console.log(response)

    const data={
        issuer:this.issuerId,
        installments: this.selectedInstallments,
        transactionAmount: this.amount,
        paymentMethodId:this.paymentMethodId,
        token:response.id,
        comercioId:this.comerciosService.getSelectedCommerceId(),
        email:this.email,
        docType:this.docType,
        docNumber:this.identificationNumber
    }

    this.modalCtrl.dismiss(data,'','modal-mp')

   
}



getBin () {   
    console.log(this.cardNumber.substring(0,6)) 
    return this.cardNumber.substring(0,6)
}

guessingPaymentMethod() {     
    const bin = this.getBin()
    if (bin.length >= 6) {
        console.log("ok")
        Mercadopago.getPaymentMethod({
            "bin": bin
        }, this.setPaymentMethodInfo)
    }
    else{
      this.paymentMethodId = 0
      this.issuerId = 0
      this.installments = []
    }
}

setPaymentMethodInfo = (status, response) => {
    console.log(response)
    this.cardLogo ="";
    if(response[0].id ==="master"){
      this.cardLogo = "assets/img/mastercard.png"
    }

    if(response[0].id==="visa"){
      this.cardLogo = "assets/img/visa.png"
    }

    console.log(this.cardLogo)
  
    if (status == 200) {

        console.log(response)
        if(response[0])
            this.paymentMethodId = response[0].id
      
        Mercadopago.getInstallments({
            "bin": this.getBin(),
            "amount": this.amount,
        }, this.setInstallmentInfo)

    } else {
      console.log(response)
      //  alert("Número ingresado es incorrecto")  
    }
};

setInstallmentInfo = (status, response)=> {
    this.installments =[]
    console.log(response)
    if (response.length > 0) {   
      this.issuerId = response[0].issuer.id     
        this.installments = response[0].payer_costs        
    }
};

cobrar () {

  this.loadingService.presentLoadingText("Conectando...")
    Mercadopago.createToken({
        "email":this.email,
        "cardNumber" : this.cardNumber,
        "securityCode" : this.securityCode ,
        "cardExpirationMonth" : this.cardExpirationMonth ,
        "cardExpirationYear" : this.cardExpirationYear,
        "cardholderName" : this.cardholderName,
        "docType": this.docType,
        "docNumber": this.identificationNumber ,
        "installments": this.selectedInstallments,
        "paymentMethodId":this.paymentMethodId, 
    }, this.sdkResponseHandler)
}

cerrar(){
  this.modalCtrl.dismiss()
}
}
