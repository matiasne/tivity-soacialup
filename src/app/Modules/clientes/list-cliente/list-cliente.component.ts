import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, LoadingController, IonInfiniteScroll } from '@ionic/angular';
import { ClientesService } from '../../clientes/clientes.service';
import { Cliente } from '../../clientes/cliente';
import { LoadingService } from '../../../Services/loading.service';
import { FormClientePage } from '../../../form-cliente/form-cliente.page';
import { CambiarPlanPage } from '../../../cambiar-plan/cambiar-plan.page';
import { ComerciosService } from '../../../Modules/comercio/comercios.service';
import { Comercio } from '../../../models/comercio';
import { NavegacionParametrosService } from '../../../Services/global/navegacion-parametros.service';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.scss'],
})
export class ListClienteComponent implements OnInit, OnDestroy {

  @Output() seleccionado = new EventEmitter<Cliente>();
  @Output() editar = new EventEmitter<Cliente>();

  public itemsFiltrados:any = [];
  public itemsAll:any = [];

  public palabraFiltro = "";
  public buscando = false;
  
  public obsClientes:any
  constructor(
    public modalController: ModalController,
    public clientesService:ClientesService,
  ) { 
  }

  ngOnInit() {     
    this.obsClientes = this.clientesService.list().subscribe(clientes => {     
      this.itemsAll = clientes;
      this.buscar();
    });       
  }

  ngOnDestroy(){
    console.log("list client leave....")
    this.obsClientes.unsubscribe()
  }


  

  onChange(event){
    this.palabraFiltro = event.target.value;

    this.buscar();
  }  

  buscar(){
    this.itemsFiltrados = [];
    var palabra = this.palabraFiltro.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var retorno = false;

    if(this.palabraFiltro != ""){
      this.itemsAll.forEach((item) => {      
    
        var encontrado = false;
        if(item.nombre){
          retorno =  (item.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
          if(retorno)
            encontrado = true;
        }

        if(encontrado){
          this.itemsFiltrados.push(item);
        }
      })  
    }
    else{
      this.itemsFiltrados = this.itemsAll;
    }
    console.log(this.itemsFiltrados)
  }

  seleccionar(cliente){
    console.log(cliente)
    this.seleccionado.emit(cliente)
  }

  editarClick(cliente){
    console.log(cliente)
    this.editar.emit(cliente)
  }

  

}
