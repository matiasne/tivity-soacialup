import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ActionSheetController, AlertController, ModalController, NavParams } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { DetailsImagePage } from 'src/app/details-image/details-image.page';
import { FormStockPage } from 'src/app/form-stock/form-stock.page';
import { Categoria } from 'src/app/models/categoria';
import { Comercio } from 'src/app/models/comercio';
import { Archivo } from 'src/app/models/foto';
import { Item } from 'src/app/models/item';
import { WoocommerceSyncData } from 'src/app/models/woocommerceSyncData';
import { SelectGruposOpcionesPage } from 'src/app/select-grupos-opciones/select-grupos-opciones.page';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { CocinasService } from 'src/app/Services/cocinas.service';
import { FotoService } from 'src/app/Services/fotos.service';
import { GrupoOpcionesService } from 'src/app/Services/grupo-opciones.service';
import { ImagesService } from 'src/app/Services/images.service';
import { ProductosService } from 'src/app/Services/productos.service';
import { ToastService } from 'src/app/Services/toast.service';
import { ComerciosService } from '../../comercio/comercios.service';
import { FormCategoriaComponent } from '../form-categoria/form-categoria.component';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss'],
})
export class FormItemComponent implements OnInit {

  @Input() item = new Item()
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();

  isLoading = false;
  submitted = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 5
  }; 

  slideOpts = {
    slidesPerView: 2,
    initialSlide: 2,
    speed: 400
  };

  public categorias =[];
  public cocinas = [];
  public gruposOpciones = [];

  public datosForm: FormGroup;
  
  public updating:boolean = false;
  public titulo = "Nuevo Producto";
  public croppedImageIcono ="";

  public imagenesNuevas = []

  public comercio:Comercio

  public flagWoocommerce = false
  public woocommerceSyncData:WoocommerceSyncData

  private paramId = "";
  
  constructor(

    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController,
    public productosService:ProductosService,
    public categoriaService:CategoriasService,
    private barcodeScanner: BarcodeScanner,
    public alertController: AlertController,
    private router:Router,
    private firestore: AngularFirestore,
    private toastServices:ToastService,
    private cocinasService:CocinasService,
    public changeRef:ChangeDetectorRef,
    public gruposOpcionesService:GrupoOpcionesService,
    public fotosService:FotoService,
    public comercioService:ComerciosService,
    public imageService:ImagesService,
    private navParams:NavParams,
    private modalCtrl:ModalController
   // private modalController:ModalController

  ) { 

    this.comercio = new Comercio()
    this.comercio.asignarValores(this.comercioService.getSelectedCommerceValue())
    this.item = new Item();
    this.woocommerceSyncData = new WoocommerceSyncData()  

    this.datosForm = this.formBuilder.group({
      tipo:['1',Validators.required],
      nombre: ['', Validators.required],
      barcode:[''],
      destacado:[false],
      precio: ['', Validators.required],
      promocion:[''],
      unidad: ['unidades'],
      valorPor:[1],
      stock: [1],
      descripcion:[''],
      cocinaId:[''],
      categorias:[''],
      foto:[''],
      createdAt:[''],
      recibirPedidos:[true]
    });

    this.item.asignarValores(this.navParams.get('item'))
    this.datosForm.patchValue(this.item);

  }

  ngOnInit() {

    if(this.item.id != ""){
      this.updating = true; 

      this.gruposOpciones = []; 
      this.item.gruposOpcionesId.forEach(id =>{
        let sub = this.gruposOpcionesService.get(id).subscribe(data=>{
          this.gruposOpciones.push(data);
          sub.unsubscribe()
        })
      })      

     
      this.productosService.getWoocommerceValue(this.item.id).subscribe(data=>{
        this.woocommerceSyncData.asignarValores(data);
        console.log(data)
      })

      this.changeRef.detectChanges() 
    } 
    else{
      this.item.id = this.firestore.createId();
    }

    this.categoriaService.list().subscribe(data => {     
      this.categorias = data;
    })

    this.cocinasService.list().subscribe((data) => {     
      this.cocinas = data;
    })  

  }

  get f() { return this.datosForm.controls; }

  addFoto(newValue : any){   
    let archivo = new Archivo();
    archivo.url = newValue;    
    this.imagenesNuevas.push(archivo);
  }

  async agregarFoto(blob){
    return this.fotosService.uploadImagen(this.item.id,blob)
  }

  async eliminarFoto(index){

    const alert = await this.alertController.create({
      header: 'Está seguro que desea eliminar esta imagen?',
      message: '',
      buttons: [
        { 
          text: 'No',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => {           
           
           
           this.item.imagenes.splice(index,1)      
          }
        }
      ]
    });
    await alert.present();    

  }

  async verImagen(index,imagen){
    const modal = await this.modalCtrl.create({
      component: DetailsImagePage,
      componentProps: {
        url:imagen.url      
      }
    });
    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data == "eliminar"){     
        this.eliminarFoto(index)
      }        
    });
    return await modal.present();
  }

  async verImagenNueva(index,imagen){
    const modal = await this.modalCtrl.create({
      component: DetailsImagePage,
      componentProps: {
        url:imagen.url      
      }
    });
    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data == "eliminar"){     
        this.eliminarFotoNueva(index)
      }        
    });
    return await modal.present();
  }

  async eliminarFotoNueva(index){

    const alert = await this.alertController.create({
      header: 'Está seguro que desea eliminar esta imagen?',
      message: '',
      buttons: [
        { 
          text: 'No',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => {           
           
            this.imagenesNuevas.splice(index,1)            
          }
        }
      ]
    });
    await alert.present();    
  }


  async openAddGrupoOpciones(){   
      const modal = await this.modalCtrl.create({
        component: SelectGruposOpcionesPage,
        componentProps: {
          categoria: new Categoria()      
        }      
      });  
      modal.present().then(()=>{
        
      })
  
      modal.onDidDismiss()
      .then((retorno) => {
        if(retorno.data){
          this.gruposOpciones.push(retorno.data.item);
        }        
      });
      return await modal.present();
    }


  

  async eliminarGrupoOpciones(index){
    this.gruposOpciones.splice(index,1);
  }

  async _guardar(){
    
    this.submitted = true;
    

    if (this.datosForm.invalid) {
      this.toastServices.alert('Por favor completar todos los campos marcados con * antes de continuar',"");
      return; 
    }  

    console.log(this.item)

    let itemGuardar = new Item();
    itemGuardar.asignarValores(this.item);
    itemGuardar.asignarValores(this.datosForm.value);

    itemGuardar.gruposOpcionesId =[]
    this.gruposOpciones.forEach(grupo =>{
      itemGuardar.gruposOpcionesId.push(grupo.id);
    })

    

    var palabras = [this.datosForm.controls.nombre.value,this.datosForm.controls.descripcion.value];

    if(itemGuardar.categorias){
      if(itemGuardar.categorias.length > 0){
        itemGuardar.categorias.forEach(element => {
          palabras.push(element)
        });
      }
    } 

    //Pasamos imagenes nuevas
    for(let i=0;i<this.imagenesNuevas.length;i++){     
      let blob = this.imageService.getBlob(this.imagenesNuevas[i].url)
      let file = await this.agregarFoto(blob)
      let json = JSON.parse(JSON.stringify(file))
      itemGuardar.imagenes.push(json)     
    }

    if(this.comercio.config.woocommerce){      
      console.log(this.woocommerceSyncData)
      this.woocommerceSyncData.changeDate = new Date()
      let wSyncData = JSON.parse(JSON.stringify(this.woocommerceSyncData));
      this.productosService.updateWoocommerceValues(itemGuardar.id,wSyncData);
    }

    if(this.updating){
      this.productosService.update(itemGuardar).then(data=>{

      })
    }     
    else{
      this.productosService.add(itemGuardar).then(data=>{

      })
    }
   
    this.guardar.emit()
    //this.navCtrl.back();

  }

  lectorDeCodigo(){
    this.barcodeScanner.scan().then(barcodeData => {   
      
      this.datosForm.patchValue({
        barcode: barcodeData.text,      
      });  

     }).catch(err => {
         alert(err);
     });
  }

  async agregarStock(){
    const modal = await this.modalCtrl.create({
      component: FormStockPage,
      componentProps:{
        item:this.item
      }
    });  

    modal.onDidDismiss().then(response =>{
      if(response.data){
        this.item = response.data;
    
        // let vStock:variacionStock = new variacionStock();
        // vStock.productoId = this.item.id;
        // vStock.stock = this.item.stock;
        // this.variacionesStockService.setPathProducto(this.item.id);
        
        // this.variacionesStockService.add(vStock).then(resp =>{
        //   console.log("variacion Guardada");        
        // })
      }
    })
    return await modal.present();
  }

  

  async openAddCategoria(){
    let categoria = new Categoria()
    const modal = await this.modalCtrl.create({
      component: FormCategoriaComponent
    });   
    return await modal.present();
  }



 
  _cancelar(){
   this.cancelar.emit()
  }

  _eliminar(){
    this.presentAlertEliminar();
  }


  async presentAlertEliminar() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: 'Está seguro que desea eliminar el producto?',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.productosService.delete(this.paramId);
            this.productosService.deleteWoocommerceValues(this.paramId)
            //this.navCtrl.back();
            this.eliminar.emit();
          }
        }
      ]
    });
    await alert.present();
  }


  async presentAlertCrearCocinas() {
    const alert = await this.alertController.create({
      header: 'Agregar Cocina',
      message: 'Debes agregar una cocina antes de continuar',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['list-cocinas']);
          }
        }
      ]
    });
    await alert.present();
  }


}
