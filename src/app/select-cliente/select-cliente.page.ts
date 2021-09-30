import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ClientesService } from '../Modules/clientes/clientes.service';
import { FormClientePage } from '../form-cliente/form-cliente.page';

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
      component: FormClientePage      
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



 

}
