import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Reserva } from 'src/app/models/reserva';
import { Division } from 'src/app/models/subdivision';
import { NavegacionParametrosService } from 'src/app/Services/global/navegacion-parametros.service';
import { ReservasService } from 'src/app/Modules/reservas/reservas.service';
import { ListReservasComponent } from 'src/app/Modules/reservas/list-reservas/list-reservas.component';
import { EditReservaPage } from 'src/app/edit-reserva/edit-reserva.page';

@Component({
  selector: 'app-list-reservas-division',
  templateUrl: './list-reservas-division.page.html',
  styleUrls: ['./list-reservas-division.page.scss'],
})
export class ListReservasDivisionPage implements OnInit {

  public vistaLista = false;

  @ViewChild(ListReservasComponent) listReservasChild:ListReservasComponent;
  public division:Division

  constructor(
    public modalController:ModalController,
    private navParametrosService:NavegacionParametrosService,
    private reservasService:ReservasService,
  ) { 
    this.division = new Division();
    if(this.navParametrosService.param instanceof Division){
      this.division.asignarValores(this.navParametrosService.param)
    }
  }

  ngOnInit() {
   

    

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

    res.divisionNombre = this.division.nombre
    
   const modal = await this.modalController.create({
      component: EditReservaPage,
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
