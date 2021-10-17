import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { EditProductoPage } from '../edit-producto/edit-producto.page';
import { ProductosService } from '../Services/productos.service';

@Component({
  selector: 'app-dashboard-productos',
  templateUrl: './dashboard-productos.page.html',
  styleUrls: ['./dashboard-productos.page.scss'],
})
export class DashboardProductosPage implements OnInit {

  constructor(
    public router:Router,
    public modalController: ModalController,
    private productosServices: ProductosService,
  ) { }

  ngOnInit() {
  
  }

  ionViewDidEnter(){
  }
  
  

  async nuevo(){
    //this.router.navigate(['form-producto']);
    let modal = await this.modalController.create({
      component: EditProductoPage
    });  

    modal.onDidDismiss().then(response =>{
      if(response.data){
        this.productosServices.add(response.data).then(reps =>{
          console.log("ok")
        })
      }
    })
    return await modal.present();
  }
}
