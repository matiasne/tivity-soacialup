import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { EditCocinaPage } from '../edit-cocina/edit-cocina.page';
import { Cocina } from '../models/cocina';
import { CocinasService } from '../Services/cocinas.service';

@Component({
  selector: 'app-select-cocina',
  templateUrl: './select-cocina.page.html',
  styleUrls: ['./select-cocina.page.scss'],
})
export class SelectCocinaPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  items:any = [];
  public itemsAll:any = [];
  public subsItems: Subscription;
  public palabraFiltro = "";
  public ultimoItem = "";
  public loadingActive = false;
  public cocinasSubs:Subscription;
  public ultimoCocina:Cocina;
  public cocinas = [];
  public clientes = [];
  
  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    public cocinasService:CocinasService,
  ) { }

  ngOnInit() {      
    this.ultimoCocina  =new Cocina();
    this.cocinas = [];
    this.ultimoItem = "";
  }

  ionViewDidEnter(){    
    if(this.route.snapshot.params.filtro)
      this.palabraFiltro = this.route.snapshot.params.filtro;   
  }

  ionViewDidLeave(){
    this.subsItems.unsubscribe(); 
  } 

  select(item){
    this.modalController.dismiss({
      'item': item
    });
  }
  

  async nuevo(){
    const modal = await this.modalController.create({
      component: EditCocinaPage
    });
    return await modal.present();
  }

  async edit(item){
    const modal = await this.modalController.create({
      component: EditCocinaPage,
      componentProps: { 
        cocina : item
      }
    });  

    return await modal.present();
  }

  cancelar(){
    this.modalController.dismiss();
  }

}
