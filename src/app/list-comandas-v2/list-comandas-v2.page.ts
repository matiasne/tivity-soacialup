import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComentariosService } from '../Services/comentarios.service';
import { LoadingService } from '../Services/loading.service';
import { PedidoService } from '../Services/pedido.service';
import { EnumEstadoCocina } from 'src/app/models/pedido';
import { CocinasService } from '../Services/cocinas.service';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

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

  public buscando = true;

  constructor(
    private pedidosService:PedidoService,
    private loadingService:LoadingService,
    private comentariosService:ComentariosService,
    private cocinasService:CocinasService,
    private alertController:AlertController,
    private router:Router,  
    private platform:Platform,
  ) { 
    this.devWidth = this.platform.width();
    this.fechaDesde.setDate(this.fechaDesde.getDate() - 1);
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

    this.obsPedidos = this.pedidosService.listFechaDesde(this.fechaDesde,new Date()).subscribe((pedidos:any)=>{  
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
    console.log(event.target.value);
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
      this.cocinaFiltro.forEach(cocina =>{     
        console.log(cocina) 
        
        item.productos.forEach(prod => {
          console.log(prod.cocinaId) 
          if(prod.cocinaId == cocina){
            encontrado = true;  
          } 
        });        
      })
      console.log(encontrado)  
      
      if(encontrado){
       
        if(this.palabraFiltro != ""){

          encontrado = false;

          var palabra = this.palabraFiltro.normalize("NFD").replace(/[\u0300-\u036f]/g, "")     
        
          if(item.clienteNombre){
            retorno =  (item.clienteNombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
            if(retorno) 
              encontrado = true;
          }

          if(item.mesaNombre){
            retorno =  (item.mesaNombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
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

      console.log(encontrado)  

      if(encontrado){ 
        console.log(item)  
       // if(item.suspendido == 1){
         // this.itemsRechazados.push(item);
      //  } 
        //else{
          if(item.statusComanda == EnumEstadoCocina.rechazado){
            this.itemsRechazados.push(item);
          }
          if(item.statusComanda == EnumEstadoCocina.solicitado){
            this.itemsPendientes.push(item);
          }
          if(item.statusComanda == EnumEstadoCocina.tomado){
            this.itemsProceso.push(item);
          }
          if(item.statusComanda == EnumEstadoCocina.completo){
            this.itemsListas.push(item);
          }
      //  }    
        console.log(this.itemsPendientes)     
        return true; 
      }
    });    
  }

  nuevoPedido(){
    this.router.navigate(['list-productos-servicios'])
  }

}
