import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComentariosService } from '../Services/comentarios.service';
import { LoadingService } from '../Services/loading.service';
import { PedidoService } from '../Services/pedido.service';
import { EnumEstadoCocina } from 'src/app/models/item';
import { CocinasService } from '../Services/cocinas.service';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Pedido } from '../models/pedido';
import { DetailsPedidoPage } from '../details-pedido/details-pedido.page';
import { NavegacionParametrosService } from '../Services/global/navegacion-parametros.service';
import { DetailsComandaPage } from '../details-comanda/details-comanda.page';

@Component({
  selector: 'app-list-comandas-v2',
  templateUrl: './list-comandas-v2.page.html',
  styleUrls: ['./list-comandas-v2.page.scss'],
})
export class ListComandasV2Page implements OnInit {

  public pedidosAll = [];

  public itemsComandas =[];
  public itemsPedidos = [];

  public itemsPendientes = [];
  public itemsProceso = [];
  public itemsListas = [];
  public itemsRechazados = []

  public items = [];

  public cocinas = [];
  public subsPedidosComercio:Subscription;
  public seccionActiva = "pendientes";
  public devWidth;
  public palabraFiltro ="";
  public cocinaFiltro = [];
  public todas ="";

  public obsPedidos:any

  public fechaDesde = new Date();
  public fechaHasta = new Date();

  public buscando = true;

  constructor(
    private pedidosService:PedidoService,
    private loadingService:LoadingService,
    private comentariosService:ComentariosService,
    private cocinasService:CocinasService,
    private alertController:AlertController,
    private router:Router,  
    private platform:Platform,
    private modalController:ModalController,
    private navParametrosService:NavegacionParametrosService
  ) { 
    this.devWidth = this.platform.width();
    this.fechaDesde.setDate(this.fechaDesde.getDate() - 2);    
    this.fechaHasta.setDate(this.fechaHasta.getDate() + 1); 
  }

  ngOnInit() {

    this.loadingService.presentLoadingText("Cargando Pedidos")

    this.cocinasService.list().subscribe((data) => {     
      this.cocinas = data;
      if(this.cocinas.length == 0){
        this.presentAlertCrearCocinas();
      }
    })
    this.refrescar()
  }

  refrescar(){
  
    if(this.obsPedidos){
      this.obsPedidos.unsubscribe();
    } 

    this.obsPedidos = this.pedidosService.listFecha(this.fechaDesde,this.fechaHasta).subscribe((pedidos:any)=>{  
      this.buscando = false;
      this.itemsPendientes = []; 
      this.itemsProceso = []; 
      this.itemsListas = [];  
      this.itemsRechazados = [];   

      this.loadingService.dismissLoading()               
      this.pedidosAll = pedidos;   
      console.log(this.pedidosAll) 
      this.filtrar(); 
    });
  }


  async presentAlertCrearCocinas() {
    const alert = await this.alertController.create({
      header: 'Agregar Cocina',
      message: 'Debes agregar una cocina antes de continuar',
      buttons: [
        {  
          text: 'Ok',
          handler: () => {
            this.router.navigate(['list-cocinas']);
          }
        }
      ]
    });
    await alert.present();
  }


  onChangeAtras(event){
    this.fechaDesde.setDate(this.fechaDesde.getDate() - Number(event.target.value));
    this.refrescar()   
  }
  
  onChange(event){
    this.palabraFiltro = event.target.value;    
    this.refrescar();
  }
 
  onChangeCocina(event){
    this.cocinaFiltro = event.target.value;
    this.refrescar();
  }

  segmentChanged(event){
    this.seccionActiva = event.target.value;
  }

  filtrar(){ 

    this.itemsPendientes = []; 
    this.itemsListas = [];
    this.itemsProceso = [];
    this.itemsRechazados = [];

    var retorno = false;

    this.pedidosAll.forEach(item => { 
            
      var encontrado = false;      
      
      if(this.cocinaFiltro.length > 0){
        this.cocinaFiltro.forEach(cocina =>{             
          item.items.forEach(prod => {
            if(prod.cocinaId == cocina){
              encontrado = true;  
            } 
          });        
        })
      }
      else{
        encontrado = true
      }
      
      
      if(encontrado){
       
        if(this.palabraFiltro != ""){

          encontrado = false;

          var palabra = this.palabraFiltro.normalize("NFD").replace(/[\u0300-\u036f]/g, "")     
        
          if(item.clienteNombre){
            retorno =  (item.clienteNombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
            if(retorno) 
              encontrado = true;
          }

          if(item.divisionNombre){
            retorno =  (item.divisionNombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
            if(retorno)
              encontrado = true;
          }   
          
          if(item.empleadoEmail){
            retorno =  (item.empleadoEmail.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
            if(retorno)
              encontrado = true;
          }  
        } 
        else{
          encontrado = true;
        }   
      } 
      if(encontrado){ 
        console.log(true)

        if(item.comanda.estado == EnumEstadoCocina.rechazado){
          this.itemsRechazados.push(item);
        }
        if(item.comanda.estado == EnumEstadoCocina.solicitado){
          this.itemsPendientes.push(item);
        }
        if(item.comanda.estado == EnumEstadoCocina.tomado){
          this.itemsProceso.push(item);
        }
        if(item.comanda.estado == EnumEstadoCocina.completo){
          this.itemsListas.push(item);
        }
      }
      return true; 
    })  
  }

  nuevoPedido(){
    this.router.navigate(['list-productos-servicios',{carritoIntended:'list-comandas-v2'}])
  }

  async abrir(item){
    console.log(item)
    let editarPedido = new Pedido();
    editarPedido.asignarValores(item);
    
    this.navParametrosService.param = editarPedido;
   // this.router.navigate(['details-pedido'])

    const modal = await this.modalController.create({
      component: DetailsComandaPage, 
      id:'detail-comanda'      
    });
    modal.onDidDismiss()
    .then((retorno) => {
      this.refrescar()
    })

    
    await modal.present();
  }

}
