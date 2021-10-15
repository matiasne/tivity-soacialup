import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, NavParams } from '@ionic/angular';
import { ModalInputDireccionPage } from 'src/app/modal-input-direccion/modal-input-direccion.page';
import { Comercio } from 'src/app/models/comercio';
import { Localizacion } from 'src/app/models/localizacion';
import { CajasService } from 'src/app/Modules/cajas/cajas.service';
import { ComerciosService } from 'src/app/Modules/comercio/comercios.service';
import { FotoService } from 'src/app/Services/fotos.service';
import { ImagesService } from 'src/app/Services/images.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { RolesService } from 'src/app/Services/roles.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-form-comercio',
  templateUrl: './form-comercio.component.html',
  styleUrls: ['./form-comercio.component.scss'],
})
export class FormComercioComponent implements OnInit {

  @Input() comercio:Comercio;

  public croppedImageIcono = "";

  public iconChange = false;

  public titulo="Nuevo Comercio";

  

  constructor(
    private comerciosService:ComerciosService,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    public alertController: AlertController,
    private modalCtrl:ModalController,
    private toastServices:ToastService,
    private rolesService:RolesService,
    private loadingService:LoadingService,
    private firestore: AngularFirestore,
    private fotosService:FotoService,
    private imageService:ImagesService,
    private router:Router
  ) { }

  ngOnInit() {

    this.croppedImageIcono = this.comercio.icono.url;  

  }

  imagenSeleccionadaIcono(newValue : any){
    console.log(newValue);
    this.croppedImageIcono = newValue;
    this.iconChange = true;
  }

  async guardar(){    

    if (this.comercio.nombre == "") {
      this.toastServices.alert('Por favor ingrese un nombre',"");
      return;
    } 

    this.loadingService.presentLoading();

    this.comercio.direccion = JSON.parse(JSON.stringify( this.comercio.direccion));
    
    this.comercio.id = this.firestore.createId();
    this.rolesService.setUserAsAdmin(this.comercio.id);
    this.comerciosService.setPath("comercios");
    

    if(this.iconChange){
      let blob = this.imageService.getBlob(this.croppedImageIcono)
      let file = await this.fotosService.uploadImagen(this.comercio.id,blob)
      let json = JSON.parse(JSON.stringify(file))
      this.comercio.icono = json    
    }

    this.comerciosService.set(this.comercio.id,this.comercio).then(async data=>{
      console.log("Comercio guardado")      
    });
    this.loadingService.dismissLoading()
    this.modalCtrl.dismiss();
  }

  cancelar(){
    this.modalCtrl.dismiss();
  }

  async seleccionarUbicacion(){
    if(this.comercio.direccion instanceof Localizacion){

    }
    else{
      this.comercio.direccion = new Localizacion()
    }
    
    const modal = await this.modalController.create({
      component: ModalInputDireccionPage,
      componentProps:{localizacion:this.comercio.direccion},
      cssClass:'modal-map'      
    });
    modal.onDidDismiss()
    .then((retorno) => {
      
      if(retorno.data){
        this.comercio.direccion = retorno.data;
        console.log("!!!!!!!!!!")
      }
      console.log(this.comercio)
    });
    modal.present()
  }

  eliminarDireccion(){
    this.comercio.direccion = new Localizacion();
  }

  
  elimiar(){
    this.presentAlertEliminar();
  }

  async presentAlertEliminar() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: 'Está seguro que desea eliminar el comercio?',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.comerciosService.delete(this.comercio.id);
            this.comerciosService.setSelectedCommerce("");
            this.modalController.dismiss();
            this.router.navigate[('home')]
          }
        }
      ]
    });
    await alert.present();
  }

}
