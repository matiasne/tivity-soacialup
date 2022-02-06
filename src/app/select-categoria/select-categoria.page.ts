import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditCocinaPage } from '../edit-cocina/edit-cocina.page';
import { EditItemCategoriaPage } from '../edit-item-categoria/edit-item-categoria.page';
import { CategoriasService } from '../Services/categorias.service';

@Component({
  selector: 'app-select-categoria',
  templateUrl: './select-categoria.page.html',
  styleUrls: ['./select-categoria.page.scss'],
})
export class SelectCategoriaPage implements OnInit {

  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {

  }

  async select(categoria){
    this.modalController.dismiss(categoria);
  }

  async openAddCategoria(){
    const modal = await this.modalController.create({
      component: EditItemCategoriaPage
    });  
    return await modal.present();
  }

  async edit(categoria){
    const modal = await this.modalController.create({
      component: EditItemCategoriaPage,
      componentProps: { 
        categoria: categoria
      }   
    });  
    return await modal.present();
  }

  cerrar(){
    this.modalController.dismiss();
  }

}
