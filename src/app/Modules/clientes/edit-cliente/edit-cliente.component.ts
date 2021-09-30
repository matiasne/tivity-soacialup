import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, ModalController,  AlertController, NavParams } from '@ionic/angular';
import { ClientesService } from '../../clientes/clientes.service';
import { Router} from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../Services/toast.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { BeneficiosService } from '../../../Services/beneficios.service';
import { ModalInputDireccionPage } from '../../../modal-input-direccion/modal-input-direccion.page';
import { Localizacion } from '../../../models/localizacion'
import { Cliente } from '../cliente';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss'],
})
export class EditClienteComponent implements OnInit {
  @Input() cliente:Cliente;
  @Output() finalizado = new EventEmitter<any>();
  
  submitted = false;
  
  croppedImagepath = "";
  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 5 
  };

  public updating:boolean = false;  

  public modificado = false;
  

  constructor(
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    private clientesService:ClientesService,
    public router:Router,
    public modalController: ModalController,
    private authService:AuthenticationService,    
    public alertController: AlertController,
    private toastServices:ToastService,
    private beneficiosService:BeneficiosService
  ) {
   
  

    this.cliente = new Cliente()
    
   }

  ngOnInit() {
    console.log(this.cliente)
    
    this.croppedImagepath = this.cliente.foto;
    
    if(this.cliente.id != ""){
      this.updating = true;
    }
    

  }

  

  guardar(){

    this.submitted = true;
    this.finalizado.emit()
  

    console.log(this.updating)
    this.cliente.direccion = JSON.parse(JSON.stringify(this.cliente.direccion));
    if(this.updating){
      this.clientesService.update(this.cliente);
    }
    else{  
      this.clientesService.add(this.cliente).then(data=>{
        this.beneficiosService.activarBeneficioRegistro(this.cliente)
      });          
    }   
  }

  cancelar(){
    this.finalizado.emit()
  }


  elimiar(){
    this.presentAlertEliminar();
  }

  async presentAlertEliminar() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: 'Está seguro que desea eliminar el cliente?',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.clientesService.delete(this.cliente);
            this.modalController.dismiss();
         
          }
        }
      ]
    });
    await alert.present();
  }


  async gaurdarCambios() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: 'Está seguro que desea salir sin guardar los cambios?',
      buttons: [
        {
          text: 'No',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => {
            this.modalController.dismiss();   
         
          }
        }
      ]
    });
    await alert.present();
  }

  async abrirDireccion(){
    this.router.navigate(['form-direccion']);
  }

  async seleccionarUbicacion(){

    if(this.cliente.direccion instanceof Localizacion){

    }
    else{
      this.cliente.direccion = new Localizacion()
    }

    const modal = await this.modalController.create({
      component: ModalInputDireccionPage,
      componentProps:{localizacion:this.cliente.direccion},
      cssClass:'modal-map'      
    });
    modal.onDidDismiss()
    .then((retorno) => {
      
      if(retorno.data){
        this.cliente.direccion = retorno.data;
        console.log("!!!!!!!!!!")
      }
      console.log(this.cliente)
    });
    modal.present()
  }

  eliminarDireccion(){
    this.cliente.direccion = new Localizacion();
  }

}
