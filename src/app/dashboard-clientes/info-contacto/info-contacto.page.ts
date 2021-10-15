import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/Modules/clientes/cliente';
import { ClientesEstadosService } from 'src/app/Services/clientes-estados.service';
import { NavegacionParametrosService } from 'src/app/Services/global/navegacion-parametros.service';

@Component({
  selector: 'app-info-contacto',
  templateUrl: './info-contacto.page.html',
  styleUrls: ['./info-contacto.page.scss'],
})
export class InfoContactoPage implements OnInit {

  public cliente:Cliente;
  public subsCliente:Subscription;

  constructor(    
    private navParametrosService:NavegacionParametrosService
  ) { 
   this.cliente = new Cliente()
    


  }

  ngOnInit() {

    

  }

  ionViewDidEnter(){

    this.navParametrosService.getParam().subscribe(param =>{
      if(param instanceof Cliente){
        console.log(param)
        this.cliente.asignarValores(param)      
      }
    })

    
  }

  
}
