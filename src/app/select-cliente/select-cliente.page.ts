import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { EditClientePage } from '../edit-cliente/edit-cliente.page';
import { ClientesService } from '../Modules/clientes/clientes.service';

@Component({
  selector: 'app-select-cliente',
  templateUrl: './select-cliente.page.html',
  styleUrls: ['./select-cliente.page.scss'],
})
export class SelectClientePage implements OnInit {

 
  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    public clientesService:ClientesService
  ) { }

  ngOnInit() {      
    
  }

  async nuevo(){
    const modal = await this.modalController.create({
      component: EditClientePage      
    });
    
    modal.present().then(()=>{
      
    })

    return await modal.present();
  }

  cerrar(){
    this.modalController.dismiss();
  }

  select(cliente){
    console.log(cliente)
    this.modalController.dismiss(cliente)
  }

  async editar(cliente){
    const modal = await this.modalController.create({
      component: EditClientePage,
      componentProps:{
        client:cliente
      }      
    });
    
    modal.present().then(()=>{
      
    })

    return await modal.present();
  }



 

}
