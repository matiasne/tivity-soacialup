import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FormCardTokenPage } from 'src/app/form-card-token/form-card-token.page';
import { Caja } from 'src/app/models/caja';
import { Comercio } from 'src/app/models/comercio';
import { EnumTipoDescuento } from 'src/app/models/descuento';
import { EnumEstadoCocina } from 'src/app/models/item';
import { EnumTipoMovimientoCaja } from 'src/app/models/movimientoCaja';
import { EnumEstadoCobro, Pedido } from 'src/app/models/pedido';
import { CtaCorrientesService } from 'src/app/Services/cta-corrientes.service';
import { ModalNotificacionService } from 'src/app/Services/modal-notificacion.service';
import { MovimientosService } from 'src/app/Services/movimientos.service';
import { ProductosService } from 'src/app/Services/productos.service';
import { ToastService } from 'src/app/Services/toast.service';
import { AfipCheckboxComponent } from '../../afip/afip-checkbox/afip-checkbox.component';
import { AfipServiceService } from '../../afip/afip-service.service';
import { CajasService } from '../../cajas/cajas.service';
import { CarritoService } from '../../carrito/carrito.service';
import { ComerciosService } from '../../comercio/comercios.service';
import { LoadingService } from '../../core/services/loading.service';
import { ImpresoraService } from '../../impresion/impresora.service';
import { MercadopagoService } from '../../mercadopago/mercadopago.service';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-form-cobrar-pedido',
  templateUrl: './form-cobrar-pedido.component.html',
  styleUrls: ['./form-cobrar-pedido.component.scss'],
})
export class FormCobrarPedidoComponent implements OnInit {

  @ViewChild('afipCheckBox') afipCheckBox:AfipCheckboxComponent;
  
  private enumTipoMovimientoCaja = EnumTipoMovimientoCaja
  public pEstado = EnumEstadoCocina;
  public cEstado = EnumEstadoCobro
  public enumTipo = EnumTipoDescuento

  @Input() pedido:Pedido;
  @Output() cobrar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();

  datosForm: FormGroup;
  
  public comercio:Comercio
  public cajas = []
  public cajaSeleccionadaIndex=0;
  public cajaSeleccionada:Caja;
  public metodoPagoSeleccionado:any = [];

  public pagoTotal = 0;
  public vuelto = 0;

  public ctasCorrientes =[];

  public metodoTexto =""; 
  public ctaCorrienteSelecccionada:any;
  public ctaCorrienteSelecccionadaId ="";
 
  public comentarios = [];

  public habilitadoFacturar = false;

  public total = 0;

  constructor(
    private formBuilder: FormBuilder,
    public comerciosService:ComerciosService,
    public cajasService:CajasService,
    private toastServices:ToastService,
    private modalController:ModalController,
    private movimientosService:MovimientosService,
    private pedidosService:PedidoService,
    private productosService:ProductosService,
    private impresoraService:ImpresoraService,
    private carritoService:CarritoService,
    private modalNotificacion:ModalNotificacionService,
    private ctasCorrientesService:CtaCorrientesService,
    public afipService:AfipServiceService,
    private loadingService:LoadingService,
    private alertController:AlertController,
    private mercadoPagoService:MercadopagoService
  ) { 

    this.datosForm = this.formBuilder.group({
      cajaSeleccionadaIndex:[''],
      metodoPagoSeleccionado:['']
    });

  }

  ngOnInit() {

    this.comercio = new Comercio();
    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue())    
    this.habilitadoFacturar = (this.comercio.afip.token !="");        

    console.log(this.pedido)
    this.cajasService.list().subscribe((cajas:any)=>{      
      for(let i=0;i <cajas.length;i++){
        if(cajas[i].estado == "abierta"){ 
          this.cajas.push(cajas[i]);
        }   
      }      
      console.log(this.cajas);
      if(this.cajas.length == 0){
        this.toastServices.alert("Debes tener al menos una caja abierta","");
        this.cancelar.emit()
      }
      else{
        this.setSavedCaja();
      }       
    });

    if(this.pedido.clienteId != ""){
      this.ctasCorrientesService.getByCliente(this.pedido.clienteId).subscribe(snapshot =>{
        snapshot.forEach(snap =>{
          let cta:any = snap.payload.doc.data();
          cta.id = snap.payload.doc.id;
          this.ctasCorrientes.push(cta);
          console.log(cta)
        })
      })
    }
   
  }

  


  setMontos(){
    console.log(this.cajas[this.cajaSeleccionadaIndex])
    this.pedido.montoPagoEfectivo = 0;
    this.pedido.montoPagoDebito = 0;
    this.pedido.montoPagoCredito = 0; 
    this.pedido.montoPagoCtaCorriente = 0;
    this.pedido.montoPagoMercadoPago = 0;

    if(this.metodoPagoSeleccionado.includes("efectivo")){
      this.pedido.montoPagoEfectivo = this.getTotal();
    }
    else if(this.metodoPagoSeleccionado.includes("debito")){
      this.pedido.montoPagoDebito = this.getTotal();
    }
    else if(this.metodoPagoSeleccionado.includes("credito")){
      this.pedido.montoPagoCredito = this.getTotal();
    }
    else if(this.metodoPagoSeleccionado.includes("ctaCorriente")){
      this.pedido.montoPagoCtaCorriente = this.getTotal();
    }
    else if(this.metodoPagoSeleccionado.includes("mercadopago")){
      this.pedido.montoPagoMercadoPago = this.getTotal();
    }
  }

  setPagoTotal(){
    this.pagoTotal = this.pedido.montoPagoEfectivo + this.pedido.montoPagoDebito + this.pedido.montoPagoCredito + this.pedido.montoPagoCtaCorriente +this.pedido.montoPagoMercadoPago
    this.vuelto = this.getTotal() - this.pagoTotal;
  }

  async ValidarMercadoPago(){

    if(this.metodoPagoSeleccionado.includes('mercadopago')){
      let modal = await this.modalController.create({
        id:'modal-mp',
        component: FormCardTokenPage,
        componentProps: {
          amount:this.pedido.montoPagoMercadoPago, 
        }
      });

      modal.onDidDismiss()
        .then((retorno) => {
          if(retorno.data){
            this.loadingService.presentLoadingText("Cargando Pago")
            this.mercadoPagoService.procesarPago({...retorno.data,pedidoId:this.pedido.id,comercioId:this.comercio.id}).then(data=>{
              console.log(data)
              this.loadingService.dismissLoading()
              const response:any = data
              if(response.status == "approved"){      
                  this.alertRealizado()    
                  this._cobrar()        
              }
              else{
                  this.alertRechazado()                
              }
            },err=>{
              console.log(err)
            })
          }
                  
      });
      
      return await modal.present();
    }
    else{
      this._cobrar()
    }
  

    
  }

  
async presentAlert(mensaje) {
  alert(mensaje)
}

async alertRealizado(){
   alert("Pago Realizado")
}

async alertRechazado(){
 alert("Pago Rechazado")
}
 
  async _cobrar(){

    if(this.cajas.length == 0){
      this.toastServices.alert("Debe abrir una caja antes de continuar","De este modo podrá tener un registro de los pagos");
      return;
    }
    
    if(this.metodoPagoSeleccionado.length == 0){
      this.toastServices.alert("Por favor seleccione un método de pago antes de continuar","De este modo podrá tener un registro de los pagos");
      return;
    }

    
    if(this.metodoPagoSeleccionado.includes("ctaCorriente")){
      if(this.ctaCorrienteSelecccionadaId == ""){
        this.toastServices.alert("Por favor seleccione una cuenta corriente antes de continuar","");
        return;
      }
    }  
    if(this.metodoPagoSeleccionado.includes("efectivo") && this.pedido.montoPagoEfectivo === 0 || this.pedido.montoPagoEfectivo === null){
        this.toastServices.alert("Por favor ingrese el monto en efectivo","");
        return;     
    }  


    if(this.metodoPagoSeleccionado.includes("debito") && this.pedido.montoPagoDebito === 0 || this.pedido.montoPagoDebito === null){
      this.toastServices.alert("Por favor ingrese el monto en débito","");
      return;
    } 

    if(this.metodoPagoSeleccionado.includes("credito") && this.pedido.montoPagoCredito === 0 || this.pedido.montoPagoCredito === null){
      this.toastServices.alert("Por favor ingrese el monto en crédito","");
      return;
    }  
    
    if(this.metodoPagoSeleccionado.includes("ctaCorriente") && this.pedido.montoPagoCtaCorriente === 0 || this.pedido.montoPagoCredito === null){
      this.toastServices.alert("Por favor ingrese el monto en cuenta corriente","");
      return;
    }  

    if(this.metodoPagoSeleccionado.includes("mercadopago") && this.pedido.montoPagoMercadoPago === 0 || this.pedido.montoPagoMercadoPago === null){
      this.toastServices.alert("Por favor ingrese el monto a cobrar con Mercado Pago","");
      return;
    }  

    try{

      this.afipCheckBox.realizarFactura(this.pedido);

      this.cajaSeleccionada = this.cajas[this.cajaSeleccionadaIndex];
      console.log(this.cajaSeleccionada)

      if(this.pedido.items.length > 0){      
        this.pedido.items.forEach(p =>{    
          let deltaStock = 0;
          if(p.valorPor)
            deltaStock =  - (Number(p.cantidad) * Number(p.valorPor));
          else
            deltaStock = - Number(p.cantidad);          
          this.productosService.updateStock(deltaStock,p.id)
        })
    
        
        
              
            
          this.metodoPagoSeleccionado.forEach(metodo =>{
            let monto = 0;
            if(metodo === "efectivo"){
              monto = this.pedido.montoPagoEfectivo;
            }
            if(metodo === "debito"){
              monto = this.pedido.montoPagoDebito;
            }
            if(metodo === "credito"){
              monto = this.pedido.montoPagoCredito;
            }
            if(metodo === "mercadopago"){
              monto = this.pedido.montoPagoMercadoPago;
            }
            if(metodo != "ctaCorriente"){              
              this.movimientosService.agregarMovimientoCaja(this.cajaSeleccionada.id,this.pedido.clienteId,this.enumTipoMovimientoCaja.pago,"",metodo, monto,
              "Venta de productos")
            }
            
              
          })
            
          if(this.metodoPagoSeleccionado.includes("ctaCorriente")){

            if(this.metodoPagoSeleccionado.includes("ctaCorriente")){     

              this.movimientosService.agregarMovimientoEnCtaCorriente(
                this.ctaCorrienteSelecccionadaId,
                this.pedido.clienteId,
                "",
                "",
                "",
                - this.pedido.montoPagoCtaCorriente,
                "Cobro de productos"
              )
            } 
           

          }
        
      }         

      this.carritoService.vaciar()    

      this.pedido.statusCobro = this.cEstado.cobrado;
      this.pedido.metodoPago = this.metodoPagoSeleccionado; 
      this.pedido.cajaUtilizada = this.cajaSeleccionada.id;  
      this.pedido.total = this.getTotal();    

      if(this.pedido.id == ""){
        this.pedido.direccion = JSON.parse(JSON.stringify(this.pedido.direccion));
        this.pedidosService.add(this.pedido).then(data=>{
          console.log("agregado pedido")
          console.log(data)
        })
      }
      else{        
        //solamente actualizar estos valores!!!! así no pisa los que actualiza el backend
        let update = {
          afipFactura: this.pedido.afipFactura,
          statusCobro : this.cEstado.cobrado,
          metodoPago : this.metodoPagoSeleccionado, 
          montoPagoEfectivo:this.pedido.montoPagoEfectivo,
          montoPagoDebito:this.pedido.montoPagoDebito,
          montoPagoCredito:this.pedido.montoPagoCredito,
          montoPagoMercadoPago:this.pedido.montoPagoMercadoPago,
          montoPagoCtaCorriente:this.pedido.montoPagoCtaCorriente,
          cajaUtilizada : this.cajaSeleccionada.id,  
          total : this.getTotal()    
        }
        this.pedido.direccion = JSON.parse(JSON.stringify(this.pedido.direccion));
        this.pedidosService.setMerge(this.pedido.id,update).then(data=>{
          console.log(data)
        }) 
      }    

      this.imprimir()           
        
      this.modalNotificacion.success("Cobrado","El pedido ha sido cobrado.")
     
      this.cobrar.emit();
      //this.modalController.dismiss("cobrado",'','form-cobrar')   
      
    }catch(err){
      console.log(err);
      this.mostrarError(err.error.message)
      
      this.loadingService.dismissLoading();
    }
    
   
  }  

  setSavedCaja(){
    this.cajaSeleccionadaIndex = Number(localStorage.getItem('cajaSeleccionadaIndex'));
    if(!this.cajaSeleccionadaIndex){
      this.cajaSeleccionadaIndex = 0;
    }
    this.setearCaja();
  }

  setearCaja(){

    console.log(this.cajas[this.cajaSeleccionadaIndex])
    
    localStorage.setItem('cajaSeleccionadaIndex',this.cajaSeleccionadaIndex.toString());

    
      this.cajaSeleccionada = this.cajas[this.cajaSeleccionadaIndex];
 
      var setear = "";  
      
      let cantidadMetodos = 0;
  
     
      
      if(this.cajas[this.cajaSeleccionadaIndex].debito){
        setear = "debito"; 
        this.metodoTexto = "Solo Débito";     
        cantidadMetodos++;
      }
  
      if(this.cajas[this.cajaSeleccionadaIndex].credito){
        setear = "credito";
        this.metodoTexto = "Solo Crédito";    
        cantidadMetodos++;
      }    
  
      if(this.cajas[this.cajaSeleccionadaIndex].efectivo){
        setear = "efectivo";
        this.metodoTexto = "Solo Efectivo";    
        cantidadMetodos++;
      }    
       
      this.metodoPagoSeleccionado =[];
      if(cantidadMetodos == 1){    
        this.metodoPagoSeleccionado.push(setear);    
      } 
  }


  public getTotal(){ 
    this.total =  this.pedidosService.getTotal(this.pedido) 
    return this.total
  }

  async imprimir(){
    await this.impresoraService.impresionTicket(this.pedido);    
  }

  _cancelar(){
    this.cancelar.emit()
  }


  async mostrarError(error){
    const alert = await this.alertController.create({
      header: 'Error al generar factura electrónica',
      message: error,
      buttons: [
        {
          text: 'OK',
          handler: () => {           
            this.modalController.dismiss()  
          }
        }
      ]
    });
    await alert.present();   
  }

}