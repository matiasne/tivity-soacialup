import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';
import { FormClientePage } from '../form-cliente/form-cliente.page';
import { FormCobrarPedidoPage } from '../form-cobrar-pedido/form-cobrar-pedido.page';
import { FormConfiguracionAfipPage } from '../form-configuracion-afip/form-configuracion-afip.page';
import { FormDevolverPedidoPage } from '../form-devolver-pedido/form-devolver-pedido.page';
import { ModalInputDireccionPage } from '../modal-input-direccion/modal-input-direccion.page';
import { Caja } from '../models/caja';
import { Comercio } from '../models/comercio';
import { Descuento, EnumTipoDescuento } from '../models/descuento';
import { Localizacion } from '../models/localizacion';
import { Mesa } from '../models/mesa';
import { EnumTipoMovimientoCaja, MovimientoCaja } from '../models/movimientoCaja';
import { EnumEstadoCobro, Pedido } from '../models/pedido';
import { EnumEstadoCocina } from 'src/app/models/item';
import { Item } from '../models/item';
import { Recargo } from '../models/recargo';
import { SelectClientePage } from '../select-cliente/select-cliente.page';
import { SelectProductPage } from '../select-product/select-product.page';
import { AfipServiceService } from '../Services/afip/afip-service.service';
import { CajasService } from '../Services/cajas.service';
import { ComentariosService } from '../Services/comentarios.service';
import { ComerciosService } from '../Services/comercios.service';
import { CarritoService } from '../Services/global/carrito.service';
import { NavegacionParametrosService } from '../Services/global/navegacion-parametros.service';
import { ImpresoraService } from '../Services/impresora/impresora.service';
import { ModalNotificacionService } from '../Services/modal-notificacion.service';
import { PedidoService } from '../Services/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { ItemPedido } from '../models/itemPedido';
import { UsuariosService } from '../Services/usuarios.service';
import { SelectDivisionPage } from '../select-division/select-division.page';
import { Division } from '../models/subdivision';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-details-pedido',
  templateUrl: './details-pedido.page.html',
  styleUrls: ['./details-pedido.page.scss'],
})
export class DetailsPedidoPage implements OnInit {

  public pedido:Pedido;

  private enumTipoMovimientoCaja = EnumTipoMovimientoCaja
  public comercio:Comercio;
  
  public cajas = []
  public cajaSeleccionadaIndex=0;
  public cajaSeleccionada:Caja;
  public division:Division;
  public cliente:Cliente;
  public metodoPagoSeleccionado =[];
  public cantidadMetodos=0;

  public ctasCorrientes =[];
  public metodoTexto =""; 
  public ctaCorrienteSelecccionada:any;
  public ctaCorrienteSelecccionadaId ="";

  public pEstado = EnumEstadoCocina; 
  
  public comentarios = [];

  public cEstado = EnumEstadoCobro
  public enumTipo = EnumTipoDescuento

  public afipQR = ""; 

  public isUpdating = false;
  
  constructor(
    public comerciosService:ComerciosService,
    public cajasService:CajasService,
    private modalController:ModalController,
    private pedidosService:PedidoService,
    private impresoraService:ImpresoraService,
    private comentariosService:ComentariosService,
    private alertController:AlertController,
    private navParamService:NavegacionParametrosService,
    private carritoService:CarritoService,
    private modalNotificacion:ModalNotificacionService,
    private afipService:AfipServiceService,
    private route: ActivatedRoute,
    private navParams:NavParams
  ) { 

    this.pedido = new Pedido()
    this.pedido.asignarValores(this.navParams.get('pedido'))

    console.log()

    this.comercio = new Comercio()
    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue());

    if(this.pedido.id != ""){        
      this.isUpdating = true;
    }  

    if(this.pedido.id){
      this.comentariosService.setearPath("pedidos",this.pedido.id);   
      let obs =this.comentariosService.list().subscribe(data =>{
        this.comentarios = data; 
        obs.unsubscribe();
      })
    }  

    if(this.pedido.afipFactura.voucherNumber){
      this.afipQR = this.afipService.getURLforQR(this.pedido)
    }
  }

  ngOnInit() { 
    
  }

  ionViewDidEnter(){    
    this.getTotal();
  }

  eliminarDescuento(i){
    this.pedido.descuentos.splice(i,1);
    this.actualizarPedido()
  }

  eliminarRecargo(i){
    this.pedido.recargos.splice(i,1);
    this.actualizarPedido()
  }

  eliminarCliente(){
    this.pedido.clienteId ="";
    this.pedido.clienteEmail ="";
    this.pedido.clienteNombre ="";
    this.pedido.clienteDocTipo = ""
    this.pedido.clienteDoc = ""
    this.pedido.clientePersonaJuridica = ""
    this.pedido.clienteDireccion = ""
    this.actualizarPedido()
  }

  async eliminarProducto(p,i){

    const alert = await this.alertController.create({
      header: 'Está seguro que desea eliminar el producto'+p.nombre+'?',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {           
            this.pedido.items.splice(i,1);
            if(this.pedido.items.length > 0){
              this.actualizarPedido() 
            }
            else{
              this.pedidosService.delete(this.pedido.id).then(data=>{
                console.log("Pedido Eliminado")
              })
            }
          }
        }
      ]
    });
    await alert.present();

    
  }


  async seleccionarCliente(){
    const modal = await this.modalController.create({
      component: SelectClientePage,
      cssClass:'modal-custom-wrapper'      
    });
    
    modal.present().then(()=>{
    

    })

    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data){
        if(retorno.data == "nuevo"){
          this.abrirNuevoCliente();
        }
        if(retorno.data != "nuevo"){
          let cliente = retorno.data.item;
          this.pedido.asignarCliente(cliente)
          this.actualizarPedido()
        }   
      }
           
    });
    return await modal.present();
  }

  async abrirNuevoCliente(){
    const modal = await this.modalController.create({
      component: FormClientePage,     
      cssClass:'modal-custom-wrapper' 
    });    
    modal.present().then(()=>{
    

    })

    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data){       
        let cliente = retorno.data.item;
        this.pedido.clienteEmail = cliente.email
        this.pedido.clienteId = cliente.id;
        this.pedido.clienteNombre = cliente.nombre;
        this.pedido.clienteDocTipo = cliente.documentoTipo
        this.pedido.clienteDoc = cliente.documento
        this.pedido.clientePersonaJuridica = cliente.personaJuridica
        this.pedido.clienteDireccion = JSON.parse(JSON.stringify(cliente.direccion))
        this.actualizarPedido()
      }           
    });
    return await modal.present();
  }

  async seleccionarDivision(){
    const modal = await this.modalController.create({
      component: SelectDivisionPage,     
      cssClass:'modal-custom-wrapper'
    });

    modal.present().then(()=>{
      
    })

    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data){
        if(retorno.data == "nuevo"){

        }
        else{
          this.division = retorno.data;
          this.pedido.divisionNombre = retorno.data.nombre
          this.actualizarPedido()
        }
       
      }        
    });
    return await modal.present();
  }

  
  eliminarDivision(){
    this.division = new Division();
    this.pedido.divisionNombre ="";
    this.actualizarPedido()
  }


  

  async devolverPedido(){
    const modal = await this.modalController.create({
      component: FormDevolverPedidoPage,  
      componentProps:{pedido:this.pedido, comercio:this.comercio},   
      cssClass:'modal-custom-wrapper' 
    });    

    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data == "cobrado"){
        this.modalController.dismiss() 
      }
     
    });
    return await modal.present();
  }
  
  async suspender(){
    const alert = await this.alertController.create({
      header: 'Está seguro que desea suspender el pedido?',
      message: '',
      buttons: [
        { 
          text: 'No',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => {           
            this.pedido.statusCobro = this.cEstado.suspendido
            this.modalNotificacion.trash("Suspendido","El pedido ahora se encuentra en estado suspendido.")
            this.actualizarPedido()   
            this.modalController.dismiss()         
          }
        }
      ]
    });
    await alert.present();    
  }


  async reanudar(){
    const alert = await this.alertController.create({
      header: 'Está seguro que desea reanudar el pedido?',
      message: '',
      buttons: [
        { 
          text: 'No',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => {   
            
            this.modalNotificacion.success("Reanudado","El pedido ahora se encuentra en estado pendiente.")       
            this.pedido.statusCobro = this.cEstado.pendiente
            this.actualizarPedido()             
            this.modalController.dismiss()
          }
        }
      ]
    });
    await alert.present();    
  }

  async cobrar(){
    
    const modal = await this.modalController.create({
      id:'form-cobrar',
      component: FormCobrarPedidoPage,  
      componentProps:{pedido:this.pedido,comercio:this.comercio},   
      cssClass:'modal-custom-wrapper' 
    });    

    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data == "cobrado"){
       
        this.modalController.dismiss(null,null,'detail-pedido') 
       
        
      }
     
    });
    return await modal.present();
  }

  guardar(){
    this.pedido.direccion = JSON.parse(JSON.stringify(this.pedido.direccion));
    this.pedidosService.add(this.pedido).then(data=>{
      console.log("Pedido guardado")
    })
    this.modalController.dismiss();
  }
  

  async agregarItem(){

    const modal = await this.modalController.create({
      component: SelectProductPage,     
      cssClass:'modal-custom-wrapper' 
    });
    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data){

        if(retorno.data instanceof  ItemPedido){
          const p = JSON.parse(JSON.stringify(retorno.data));

          this.pedido.items.push(p); 
         
          this.actualizarPedido()
        }

        if(retorno.data instanceof  Descuento){
          const p = JSON.parse(JSON.stringify(retorno.data));

          this.pedido.descuentos.push(p); 
         
          this.actualizarPedido()
        }

        if(retorno.data instanceof  Recargo){
          const p = JSON.parse(JSON.stringify(retorno.data));

          this.pedido.recargos.push(p); 
         
          this.actualizarPedido()
        }

        
         //sumar total productos
         this.getTotal()    
      }
      //  this.seleccionarProducto(retorno.data)
         
    });
    return await modal.present(); 

  }

  actualizarPedido(){
    if(this.pedido.id && this.isUpdating){
      this.pedido.direccion = JSON.parse(JSON.stringify(this.pedido.direccion));
      this.pedidosService.update(this.pedido).then(data=>{
        console.log(data)
      })
    }
  }  

  


  suspenderProducto(producto,index){
    producto.suspendido = 1
    producto.comanda.estado = this.pEstado.suspendido
    console.log(producto)
    
    if(this.pedido.id != ""){
      this.actualizarPedido()
    }
    else{ //significa que es un cobro directo
      this.carritoService.eliminarProducto(index)
    }
    
  }
 
  reanudarProducto(producto){ 
    producto.suspendido = 0
    console.log(producto)
    this.actualizarPedido()
  } 


  async chat(){
    const modal = await this.modalController.create({
      component: ChatPage,     
      cssClass:'modal-custom-wrapper',
      componentProps:{
        id:this.pedido.id,
        objeto:"pedidos"
      }      
    });
    return await modal.present(); 
  }

  public getTotal(){ 
    this.pedido.total =  this.pedidosService.getTotal(this.pedido) 
    console.log(this.pedido.total)    
  }


  imprimir(){
    this.impresoraService.impresionTicket(this.pedido)
  }
  

  facturar(){
    
  }

  async seleccionarUbicacion(){
    const modal = await this.modalController.create({
      component: ModalInputDireccionPage,
      componentProps:{localizacion:this.pedido.direccion},
      cssClass:'modal-map'      
    });
    modal.onDidDismiss()
    .then((retorno) => {
      
      if(retorno.data){
        this.pedido.direccion = retorno.data;
        this.actualizarPedido()
      }
      
      console.log(this.pedido)
    });
    modal.present()
  }

  eliminarDireccion(){
    this.pedido.direccion = new Localizacion();
    this.actualizarPedido()
  }


  afip(){
    alert("Mostrar factura?")
  }

  async showModalAfipPassword(){
    const modal = await this.modalController.create({
      component: FormConfiguracionAfipPage,
    });
    
    modal.present().then(()=>{
    

    })
  }

  cerrar(){
    this.modalController.dismiss()
  }

  demora(minutos){

  }

 
}

  


  
  

  

  


