import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { emit } from 'process';
import { Caja } from 'src/app/models/caja';
import { Comercio } from 'src/app/models/comercio';
import { EnumTipoDescuento } from 'src/app/models/descuento';
import { EnumEstadoCocina } from 'src/app/models/item';
import { EnumTipoMovimientoCaja, MovimientoCaja } from 'src/app/models/movimientoCaja';
import { EnumEstadoCobro, Pedido } from 'src/app/models/pedido';
import { CtaCorrientesService } from 'src/app/Services/cta-corrientes.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { ModalNotificacionService } from 'src/app/Services/modal-notificacion.service';
import { MovimientosService } from 'src/app/Services/movimientos.service';
import { ProductosService } from 'src/app/Services/productos.service';
import { ToastService } from 'src/app/Services/toast.service';
import { AfipServiceService } from '../../afip/afip-service.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CajasService } from '../../cajas/cajas.service';
import { ComerciosService } from '../../comercio/comercios.service';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-form-devolver-pedido',
  templateUrl: './form-devolver-pedido.component.html',
  styleUrls: ['./form-devolver-pedido.component.scss'],
})
export class FormDevolverPedidoComponent implements OnInit {

  private enumTipoMovimientoCaja = EnumTipoMovimientoCaja
  public pEstado = EnumEstadoCocina;
  public cEstado = EnumEstadoCobro
  public enumTipo = EnumTipoDescuento

  @Input() pedido:Pedido;
  @Output() reembolsar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();

  public comercio:Comercio;
  
  public cajas = []
  public cajaSeleccionadaIndex=0;
  public cajaSeleccionada:Caja;
  public metodoPagoSeleccionado =[];
  public cantidadMetodos=0;

  public ctasCorrientes =[];

  public metodoTexto =""; 
  public ctaCorrienteSelecccionada:any;
  public ctaCorrienteSelecccionadaId ="";
 
  public comentarios = [];

  public facturar = false

  public totalReembolso = 0;

  

  constructor(
    public comerciosService:ComerciosService,
    public cajasService:CajasService,
    private toastServices:ToastService,
    private router:Router,
    private modalController:ModalController,
    private authenticationService:AuthenticationService,
    private firestore: AngularFirestore,
    private movimientosService:MovimientosService,
    private pedidosService:PedidoService,
    private productosService:ProductosService,
    private modalNotificacion:ModalNotificacionService,
    private ctasCorrientesService:CtaCorrientesService,
    private afipService:AfipServiceService,
    private loadingService:LoadingService,
    private alertController:AlertController
  ) { 
    this.comercio = new Comercio();
    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue())
  }

  ngOnInit() {

    if(localStorage.getItem('facturar') == "true")
      this.facturar = true


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
        this.modalController.dismiss();
        this.router.navigate(['/list-cajas']);
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

    this.calcularReembolso()
  }

  updateFacturar(event){
    console.log(event.target.checked)
    localStorage.setItem('facturar',event.target.checked)
  }

  async _reembolsar(){

    let seleccionReembolsado = false;
    this.pedido.items.forEach(p =>{    
      if(p.reembolsar){
        seleccionReembolsado = true;
      }
    })
    if(!seleccionReembolsado){
      this.toastServices.alert("Sebe seleccionar al menos un producto para reembolsar","");
      return;
    }

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

    
    this.loadingService.presentLoadingText("Creando factura electrónica")

    try{

      if(this.facturar){
        let res = await this.afipService.notaCreditoPedido(this.pedido.id,this.totalReembolso)
        console.log(res);
        this.loadingService.dismissLoading();
      }

      this.cajaSeleccionada = this.cajas[this.cajaSeleccionadaIndex];
      console.log(this.cajaSeleccionada)

      if(this.pedido.items.length > 0){

        this.pedido.items.forEach(p =>{    
          if(p.reembolsar){ 
            let deltaStock = 0;
            if(p.valorPor)
              deltaStock =  + (Number(p.cantidad) * Number(p.valorPor));
            else
              deltaStock = + Number(p.cantidad);
            
            this.productosService.updateStock(deltaStock,p.id)
          }
                  
        })
      }        
          
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
          var pago = new MovimientoCaja(
            this.firestore.createId(),
            this.enumTipoMovimientoCaja.devolucion,
            this.pedido.clienteId,
            this.cajaSeleccionada.id,
            metodo,
            - monto,
            "Reembolso de pedido",
            this.authenticationService.getUID(), 
            this.authenticationService.getNombre());      
          

          this.movimientosService.setearPath(this.cajaSeleccionada.id)   
          this.movimientosService.add(pago).then(data=>{
            console.log(data)
          });
        }
        
      })
      
    if(this.metodoPagoSeleccionado.includes("ctaCorriente")){     

        this.movimientosService.agregarMovimientoEnCtaCorriente(
          this.ctaCorrienteSelecccionadaId,
          this.pedido.clienteId,
          "",
          "",
          "",
          this.pedido.montoPagoCtaCorriente,
          "Devolucion de productos"
        )
    }           
      
      
      this.pedido.statusCobro = this.cEstado.reembolsado;
      this.pedido.metodoDevolucion = this.metodoPagoSeleccionado; 
      this.pedido.cajaUtilizada = this.cajaSeleccionada.id;  
      this.pedido.total = this.totalReembolso;    

      if(this.pedido.id == ""){
        this.pedido.direccion = JSON.parse(JSON.stringify(this.pedido.direccion));
        this.pedidosService.add(this.pedido).then(data=>{
          console.log("agregado pedido")
          console.log(data)
        })
      }
      else{        
        this.actualizarPedido()
      }
      console.log(this.pedido);
      this.actualizarMontosCaja()

      this.imprimir()
      
      
        
      this.modalNotificacion.success("Devuelto","El pedido ha sido cobrado.")
      this.reembolsar.emit()
      
    }catch(err){
      console.log(err);
      this.mostrarError(err.error.message)
      this.pedido.items.forEach(p=>{
        p.reembolsar = false;
      })
      this.loadingService.dismissLoading();
    }
    
   
  }  

  actualizarMontosCaja(){
    if(this.metodoPagoSeleccionado.includes("efectivo")){
      this.cajaSeleccionada.totalEfectivo = Number(this.cajaSeleccionada.totalEfectivo)- Number(this.totalReembolso);
    }
    if(this.metodoPagoSeleccionado.includes("credito")){
      this.cajaSeleccionada.totalCredito = Number(this.cajaSeleccionada.totalCredito)- Number(this.totalReembolso);
    }
    if(this.metodoPagoSeleccionado.includes("debito")){
      this.cajaSeleccionada.totalDebito = Number(this.cajaSeleccionada.totalDebito) - Number(this.totalReembolso);
    }

    const param1 = JSON.parse(JSON.stringify(this.cajaSeleccionada));
    this.actualizarPedido()
  }

  setSavedCaja(){
    this.cajaSeleccionadaIndex = Number(localStorage.getItem('cajaSeleccionadaIndex'));
    if(!this.cajaSeleccionadaIndex){
      this.cajaSeleccionadaIndex = 0;
    }
    this.setearCaja();
  }

  setearCaja(){
    
    localStorage.setItem('cajaSeleccionadaIndex',this.cajaSeleccionadaIndex.toString());

    
      this.cajaSeleccionada = this.cajas[this.cajaSeleccionadaIndex];
 
      var setear = "";  
      
      this.cantidadMetodos = 0;     
      
      if(this.cajas[this.cajaSeleccionadaIndex].debito){
        setear = "debito"; 
        this.metodoTexto = "Solo Débito";     
        this.cantidadMetodos++;
      }
  
      if(this.cajas[this.cajaSeleccionadaIndex].credito){
        setear = "credito";
        this.metodoTexto = "Solo Crédito";    
        this.cantidadMetodos++;
      }    
  
      if(this.cajas[this.cajaSeleccionadaIndex].efectivo){
        setear = "efectivo";
        this.metodoTexto = "Solo Efectivo";    
        this.cantidadMetodos++;
      }    
       
      this.metodoPagoSeleccionado =[];
      if(this.cantidadMetodos == 1){    
        this.metodoPagoSeleccionado.push(setear);    
      } 
  }

  actualizarPedido(){
    if(this.pedido.id){
      this.pedido.direccion = JSON.parse(JSON.stringify(this.pedido.direccion));
      this.pedidosService.setMerge(this.pedido.id,this.pedido).then(data=>{
        console.log(data)
      }) 
    }
  }  


  async imprimir(){
    alert("falta hacer")
  
  }

  _cancelar(){
    this.pedido.items.forEach(p =>{    
      p.reembolsar = false;   
    })
    this.cancelar.emit()
  }

  calcularReembolso(){
    this.totalReembolso = 0
    this.pedido.items.forEach(p =>{    
      if(p.reembolsar){
        this.totalReembolso += p.precioTotal   
      }      
    })
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
