import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormProductoGrupoOpcionesPage } from '../form-producto-grupo-opciones/form-producto-grupo-opciones.page';
import { LoadingService } from '../Modules/core/services/loading.service';
import { GrupoOpcionesService } from '../Services/grupo-opciones.service';

@Component({
  selector: 'app-list-grupos-opciones',
  templateUrl: './list-grupos-opciones.page.html',
  styleUrls: ['./list-grupos-opciones.page.scss'],
})
export class ListGruposOpcionesPage implements OnInit {

  public grupos = [];
  public buscando = true;

  constructor(
    public grupoOpcionesService:GrupoOpcionesService,
    public router:Router,
    public loadingService:LoadingService,
    public modalController:ModalController
  ) { }

  ngOnInit() { 
    this.loadingService.presentLoadingText("Cargando Grupos")
    this.grupoOpcionesService.list().subscribe(grupos=>{
      this.loadingService.dismissLoading()                
      this.grupos = grupos;
      this.buscando = false;
    });

  }

  ionViewDidEnter(){
    
  }

  async openAddGrupo(){
    const modal = await this.modalController.create({
      component: FormProductoGrupoOpcionesPage,   
    });  

    modal.onDidDismiss().then((retorno) => {
      if(retorno.data){
        this.grupoOpcionesService.add(retorno.data);
      }        
    });
    return await modal.present();
  }

  async openEditGrupo(item){
    const modal = await this.modalController.create({
      component: FormProductoGrupoOpcionesPage, 
      componentProps:{
        grupo: item
      }  
    });  

    modal.onDidDismiss().then((retorno) => {
      if(retorno.data){

        if(retorno.data == "eliminar"){
          this.grupoOpcionesService.delete(retorno.data);
        }
        else
        this.grupoOpcionesService.update(retorno.data);
      }        
    });
    return await modal.present();
  }

}
