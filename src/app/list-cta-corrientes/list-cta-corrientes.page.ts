import { Component, OnInit } from '@angular/core';
import { CtaCorrientesService } from '../Services/cta-corrientes.service';
import { Comercio } from '../models/comercio';
import { ClientesService } from '../Services/clientes.service';
import { Router } from '@angular/router';
import { CtaCorriente } from '../models/ctacorriente';
import { AuthenticationService } from '../Services/authentication.service';
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-list-cta-corrientes',
  templateUrl: './list-cta-corrientes.page.html',
  styleUrls: ['./list-cta-corrientes.page.scss'],
})
export class ListCtaCorrientesPage implements OnInit {

  public items =[];
  public palabraFiltro =""; 
  public itemsView =[];
  public buscando = true;

  constructor(
    private ctasCorreintesService:CtaCorrientesService,
    private clientesServices:ClientesService,
    private router:Router,
    private authenticationService:AuthenticationService,
    private loadingService:LoadingService
  ) {

   

    this.ctasCorreintesService.list().subscribe(cuentas =>{
      this.items = [];

      this.buscando = false;
      cuentas.forEach((cta: any) => {           
          var item:CtaCorriente = new CtaCorriente();
          item.asignarValores(cta);       
          
          
          item.coTitularesId.forEach(async clienteId => {
            console.log(clienteId);
            if(clienteId)
              await this.clientesServices.get(clienteId).subscribe(cliente =>{
                item.clientes.push(cliente);
              })
          });

          this.items.push(item); 

          console.log(item);
      });  
      this.buscar();
    })
  }

  ngOnInit() {

  }

  buscar(){
    
    if(this.palabraFiltro != ""){
      this.itemsView = [];
     
      this.items.forEach(item => {

        item.clientes.forEach(cliente => {
          if(cliente.nombre.toLowerCase().includes(this.palabraFiltro.toLowerCase())){
            this.itemsView.push(item);
            return;
          }  
        });

        item.clientes.forEach(cliente => {
          if(cliente.documento.toLowerCase().includes(this.palabraFiltro.toLowerCase())){
            this.itemsView.push(item);
            return;
          }  
        });

      });   
    }
    
    else{
      console.log(this.itemsView)
      this.itemsView = this.items;
    }
  }

  seleccionar(item){
    this.router.navigate(['details-cta-corriente',{
      id: item.id
    }]);
  }

  nuevaCtaCorriente(){
    this.router.navigate(['form-cta-corriente']);
  }

  editarCtaCorriente(item){
    this.router.navigate(['form-cta-corriente',{
      id: item.id
    }]);
  }

}
