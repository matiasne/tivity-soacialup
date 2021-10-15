import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Cliente } from '../Modules/clientes/cliente';
import { SelectClientePage } from '../select-cliente/select-cliente.page';
import { NavegacionParametrosService } from '../Services/global/navegacion-parametros.service';

@Component({
  selector: 'app-dashboard-clientes',
  templateUrl: './dashboard-clientes.page.html',
  styleUrls: ['./dashboard-clientes.page.scss'],
})
export class DashboardClientesPage implements OnInit {
  
  public cliente:Cliente;
  
  constructor(
    public router:Router,
    public route:ActivatedRoute,
    public modalController: ModalController,
    private navParametrosService:NavegacionParametrosService
  ) {
    this.cliente = new Cliente();
    

  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.navParametrosService.getParam().subscribe(param =>{
      if(param instanceof Cliente){
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ")
      this.cliente.asignarValores(param)    
    }
  })
  }

  async buscar(){
    const modal = await this.modalController.create({
      component: SelectClientePage      
    });
    modal.onDidDismiss()
    .then((retorno) => {
      console.log(retorno.data.item);
      if(retorno.data)
        this.router.navigate(['details-cliente',{"id":retorno.data.item.id}]);
    });
    return await modal.present();
  }

  nuevo(){
    this.router.navigate(['form-cliente']);
  }

}
