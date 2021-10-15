import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormReservaPage } from 'src/app/form-reserva/form-reserva.page';
import { Reserva } from 'src/app/models/reserva';
import { Cliente } from 'src/app/Modules/clientes/cliente';
import { NavegacionParametrosService } from 'src/app/Services/global/navegacion-parametros.service';
import { ReservasService } from 'src/app/Modules/reservas/reservas.service';
import { ListReservasComponent } from 'src/app/Modules/reservas/list-reservas/list-reservas.component';

@Component({
  selector: 'app-list-reservas-cliente',
  templateUrl: './list-reservas-cliente.page.html',
  styleUrls: ['./list-reservas-cliente.page.scss'],
})
export class ListReservasClientePage implements OnInit {

  @ViewChild(ListReservasComponent) listReservasChild:ListReservasComponent;
  public vistaLista = false;
  public cliente:Cliente;
  
  constructor(
    public modalController:ModalController,
    private navParametrosService:NavegacionParametrosService,
    private reservasService:ReservasService,
  ) { 
    this.cliente = new Cliente()
  }

  ngOnInit() {
    

    this.navParametrosService.getParam().subscribe(param =>{
      if(param instanceof Cliente){
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ")
      this.cliente.asignarValores(param)    
    }
  });
    
  }

  ionViewDidLeave(){
    this.listReservasChild.borrarDatosComponente()
  }

  verLista(){
    this.vistaLista = !this.vistaLista;
    console.log(this.vistaLista)
  }

  
  async nuevaReserva(fechaInicio = null){
    

    let res = new Reserva();
    res.desde = fechaInicio;
    res.asignarCliente(this.navParametrosService.param)
  
   const modal = await this.modalController.create({
      component: FormReservaPage,
      componentProps:{
        reserva: res
     },     
      cssClass:'modal-custom-wrapper',

    });         

    modal.onDidDismiss()
    
    .then((retorno) => { 

      if(retorno.data){   
      this.reservasService.add(retorno.data).then(data=>{
        console.log("Reserva guardada")
      })
      }else{

      }     
    });

    await modal.present();
  }


}
