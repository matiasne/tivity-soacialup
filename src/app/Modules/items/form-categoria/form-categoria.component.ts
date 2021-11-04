import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Categoria } from 'src/app/models/categoria';
import { Comercio } from 'src/app/models/comercio';
import { WoocommerceSyncData } from 'src/app/models/woocommerceSyncData';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { ToastService } from 'src/app/Services/toast.service';
import { ComerciosService } from '../../comercio/comercios.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.scss'],
})
export class FormCategoriaComponent implements OnInit {

  @Input() categoria:Categoria;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();


  datosForm: FormGroup;
  submitted = false;

  public updating:boolean = false;
  public comercioId = "";
  
  public titulo = "";
  public woocommerceSyncData:WoocommerceSyncData;
  public comercio:Comercio
  
  constructor(
    private formBuilder: FormBuilder,
    private categoriasService:CategoriasService,
    public alertController: AlertController,
    private toastServices:ToastService,
    private comerciosService:ComerciosService,
    private firestore: AngularFirestore,
  ) {
    this.datosForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });

    this.woocommerceSyncData = new WoocommerceSyncData()
    this.comercio = new Comercio()
    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue())
   }

  ngOnInit() {

  

    if(this.categoria.id != ""){
      this.updating = true;
      this.titulo = "Editar Categoria";
      this.datosForm = this.formBuilder.group({
        nombre: [this.categoria.nombre, Validators.required],
      });
    }   
    else{
      this.titulo ="Nueva Categoria";      
      this.categoria = new Categoria();
      this.categoria.id = this.firestore.createId();
    }    
  }

  get f() { return this.datosForm.controls; }

  _guardar(){

    this.submitted = true;
    // stop here if form is invalid

    if (this.datosForm.invalid) {
      this.toastServices.alert('Por favor completar todos los campos marcados con * antes de continuar',"");
      return;
    }   

    this.categoria.nombre = this.datosForm.controls.nombre.value;

    if(this.updating){
      this.categoriasService.update(this.categoria).then(data=>{
        console.log("categoria update")
      })
    }
    else{
      this.categoriasService.set(this.categoria.id,this.categoria).then(data=>{
        console.log("categoria creada")
      });
    }

    if(this.comercio.config.woocommerce){
      console.log(this.woocommerceSyncData)
      this.woocommerceSyncData.changeDate = new Date()
      this.woocommerceSyncData.sincronizado = true
      let wSyncData = JSON.parse(JSON.stringify(this.woocommerceSyncData));
      this.categoriasService.updateWoocommerceValues(this.categoria.id,wSyncData);
    }
    this.guardar.emit();
  }

  _cancelar(){
    this.cancelar.emit();
  }

  elimiar(){
    this.presentAlertEliminar();
  }

  imagenSeleccionadaIcono(newValue : any){
    console.log(newValue);
    this.categoria.foto = newValue;
   }

  async presentAlertEliminar() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: 'Está seguro que desea eliminar la categoría?',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.categoriasService.delete(this.categoria.id);

            if(this.comercio.config.woocommerce){
              console.log(this.woocommerceSyncData)
              this.woocommerceSyncData.changeDate = new Date()
              this.woocommerceSyncData.sincronizado = false
              let wSyncData = JSON.parse(JSON.stringify(this.woocommerceSyncData));
              this.categoriasService.deleteWoocommerceValues(this.categoria.id);
            }

            this.eliminar.emit()
          }
        }
      ]
    });
    await alert.present();
  }

}

