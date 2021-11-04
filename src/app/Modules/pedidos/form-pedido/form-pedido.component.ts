import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import { ModalInputDireccionPage } from '../../../modal-input-direccion/modal-input-direccion.page';
import { Comercio } from '../../../models/comercio';
import { Descuento, EnumTipoDescuento } from '../../../models/descuento';
import { Localizacion } from '../../../models/localizacion';
import { EnumTipoMovimientoCaja, MovimientoCaja } from '../../../models/movimientoCaja';
import { EnumEstadoCobro, Pedido } from '../../../models/pedido';
import { EnumEstadoCocina } from 'src/app/models/item';
import { Recargo } from '../../../models/recargo';
import { SelectClientePage } from '../../../select-cliente/select-cliente.page';
import { SelectProductPage } from '../../../select-product/select-product.page';
import { AfipServiceService } from '../../afip/afip-service.service';
import { CajasService } from '../../cajas/cajas.service';
import { ComerciosService } from '../../../Modules/comercio/comercios.service';
import { CarritoService } from '../../carrito/carrito.service';
import { ModalNotificacionService } from '../../../Services/modal-notificacion.service';
import { PedidoService } from '../pedido.service';
import { ItemPedido } from '../../../models/itemPedido';
import { SelectDivisionPage } from '../../../select-division/select-division.page';
import { Division } from '../../../models/subdivision';
import { Cliente } from '../../../Modules/clientes/cliente';
import { EditClientePage } from 'src/app/edit-cliente/edit-cliente.page';
import { CobrarPedidoPage } from 'src/app/cobrar-pedido/cobrar-pedido.page';
import { DevolverPedidoPage } from 'src/app/devolver-pedido/devolver-pedido.page';

@Component({
  selector: 'app-form-pedido',
  templateUrl: './form-pedido.component.html',
  styleUrls: ['./form-pedido.component.scss'],
})
export class FormPedidoComponent implements OnInit {

  @Input() pedido:Pedido;

  @Output() guardar = new EventEmitter<any>();
  @Output() cobrar = new EventEmitter<any>();
  @Output() devolverPedido = new EventEmitter<any>();
  @Output() reanudar = new EventEmitter<any>();
  @Output() suspender = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();

  private enumTipoMovimientoCaja = EnumTipoMovimientoCaja
  public comercio:Comercio;
  
  public division:Division;
  public cliente:Cliente;

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
    private alertController:AlertController,
    private carritoService:CarritoService,
    private modalNotificacion:ModalNotificacionService,
    private afipService:AfipServiceService,
    
  ) { 
    console.log()

    this.comercio = new Comercio()
    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue());

    
  }

  ngOnInit() { 
    if(this.pedido.id != ""){        
      this.isUpdating = true;
    }  

   

    if(this.pedido.afipFactura.voucherNumber){
      this.afipQR = this.afipService.getURLforQR(this.pedido)
    } 

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
          let cliente = retorno.data;
          this.pedido.asignarCliente(cliente)
          this.actualizarPedido()
        }   
      }
           
    });
    return await modal.present();
  }

  async abrirNuevoCliente(){
    const modal = await this.modalController.create({
      component: EditClientePage,     
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


  

  async _devolverPedido(){
    const modal = await this.modalController.create({
      component: DevolverPedidoPage,  
      componentProps:{pedido:this.pedido, comercio:this.comercio},   
      cssClass:'modal-custom-wrapper' 
    });    

    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data == "cobrado"){
        this.devolverPedido.emit()
      }
     
    });
    return await modal.present();
  }
  
  async _suspender(){
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
            this.suspender.emit()       
          }
        }
      ]
    });
    await alert.present();    
  }


  async _reanudar(){
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
            this.reanudar.emit()
          }
        }
      ]
    });
    await alert.present();    
  }

  async _cobrar(){
    
    const modal = await this.modalController.create({
      id:'form-cobrar',
      component: CobrarPedidoPage,  
      componentProps:{pedido:this.pedido,comercio:this.comercio},   
      cssClass:'modal-custom-wrapper' 
    });    

    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data == "cobrado"){
       
        this.cobrar.emit();
       
        
      }
     
    });
    return await modal.present();
  }

  _guardar(){
    this.pedido.direccion = JSON.parse(JSON.stringify(this.pedido.direccion));
    this.pedidosService.add(this.pedido).then(data=>{
      console.log("Pedido guardado")
    })
    this.guardar.emit()
  }

  _cancelar(){
    this.cancelar.emit()
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


  

  public getTotal(){ 
    this.pedido.total =  this.pedidosService.getTotal(this.pedido) 
    console.log(this.pedido.total)    
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


  cerrar(){
    this.modalController.dismiss()
  }

  demora(minutos){

  }

}
