import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { ActionSheetController, ModalController, AlertController, NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { FormPlanPage } from '../form-plan/form-plan.page';
import { ServiciosService } from '../Services/servicios.service';
import { CategoriasService } from '../Services/categorias.service';

import { ActivatedRoute } from '@angular/router';
import { PlanesService } from '../Services/planes.service';
import { Servicio } from '../models/servicio';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Subscribable } from 'rxjs';
import { FormCategoriaPage } from '../form-categoria/form-categoria.page';
import { LoadingService } from '../Services/loading.service';
import { ToastService } from '../Services/toast.service';
import { FormCalendarioPage } from '../form-calendario/form-calendario.page';
import { CalendariosService } from '../Services/calendarios.service';


@Component({
  selector: 'app-form-servicio',
  templateUrl: './form-servicio.page.html',
  styleUrls: ['./form-servicio.page.scss'],
})
export class FormServicioPage implements OnInit {

  croppedImagepath = "";
  isLoading = false;
  submitted = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 5
  };

  public planes = [];
  public categorias =[];
  public calendarios = [];

  public datosForm: FormGroup;
  
  public updating:boolean = false;

  public titulo = "Nuevo Servicio";

  public servicio:Servicio;

  public planesSubs:Subscription;
  public subs:Subscription;

  public croppedImageIcono ="";

  constructor(
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private camera: Camera,
    private crop: Crop,
    public actionSheetController: ActionSheetController,
    private file: File,
    public modalController: ModalController,
    public serviciosService:ServiciosService,
    public categoriaService:CategoriasService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private navCtrl: NavController,
    public planesServices:PlanesService,
    private firestore: AngularFirestore,
    private loadingService:LoadingService,
    private toastServices:ToastService,
    private calendariosServices:CalendariosService,
    
  ) { 

    this.servicio = new Servicio();

    this.datosForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion:[''],
      categorias:['',Validators.required],
      foto:[''],
      createdAt:[''],
      recibirReservas:[false],
      recibirSubscripciones:[false]
    });

    if(this.route.snapshot.params.id){
      
      this.updating = true;
      this.titulo = "Editar Servicio";
      this.subs = this.serviciosService.get(this.route.snapshot.params.id).subscribe(resp=>{
        this.loadingService.dismissLoading();
        this.datosForm.patchValue(resp)
        this.servicio.asignarValores(resp);    
        this.croppedImageIcono = this.servicio.foto;    
        this.obtnerPlanes();
        this.obtnerCalendarios();

      });
    }
    else{
    //  this.servicio.id = this.firestore.createId();
    //  this.obtnerPlanes();
    //  this.obtnerCalendarios();
    }

    let comercio_seleccionadoId = localStorage.getItem('comercio_seleccionadoId');
    
    this.categoriaService.getAll().subscribe((snapshot) => {
      
      this.categorias = [];
      snapshot.forEach((snap: any) => {         
        var item = snap.payload.doc.data();
        item.id = snap.payload.doc.id;        
        this.categorias.push(item);   
           
      });
      console.log(this.categorias);
      this.loadingService.dismissLoading();
    })
    //obtener categorias del backend

  }

  obtnerPlanes(){
    this.loadingService.presentLoading();   
    this.planesServices.setPathIds(this.servicio.id); 
    this.planesServices.list().subscribe(items=>{                 
      this.planes = items;
      this.loadingService.dismissLoading();
    });
  }

  obtnerCalendarios(){
    this.loadingService.presentLoading();   
    this.calendariosServices.setPathIds(this.servicio.id); 
    this.calendariosServices.list().subscribe(items=>{                 
      this.calendarios = items;
      this.loadingService.dismissLoading();
    });
  }

  ionViewDidLeave(){
 
  }

  get f() { return this.datosForm.controls; }

  ngOnInit() {
  }

  guardar(){
    this.submitted = true;
    
    if (this.datosForm.invalid) {
      this.toastServices.alert('Por favor completar todos los campos marcados con * antes de continuar',"");
      return;
    }   
    console.log("!!!!!!!!!!!!!!!!")
    this.servicio.asignarValores(this.datosForm.value);
    if(this.updating){
     // const serv = JSON.parse(JSON.stringify(this.servicio));

      this.planes.forEach(plan =>{
        plan.servicioId = this.servicio.id;
        console.log(plan);
      //  this.planesServices.set(plan);
      })

      this.serviciosService.update(this.servicio).then((data:any)=>{
               
       
        
        this.calendarios.forEach(calendario =>{
          calendario.servicioId = data.id;
          this.calendariosServices.set(calendario).then(data=>{
            console.log(data);
          })
        })
      });
    }
    else{
      //const serv = JSON.parse(JSON.stringify(this.servicio));
      console.log(this.planes); 

      this.serviciosService.add(this.servicio).then((data:any)=>{
        console.log(data.id);
        
        this.planes.forEach(plan =>{
          plan.servicioId = data.id;
          console.log(plan);
      //    this.planesServices.set(plan);          
        })
        
        this.calendarios.forEach(calendarios =>{
          calendarios.servicioId = data.id;
          this.calendariosServices.set(calendarios).then(data=>{
            console.log(data);
          })
        })
      })
      .catch(err=>{
        console.log(err);
      });
    } 

    this.navCtrl.back();
  }



  async openNewPlan(){    
    const modal = await this.modalController.create({
      component: FormPlanPage,
      componentProps: { servicioId: this.servicio.id}
    });

    modal.onDidDismiss().then((retorno) => {     
      
      if(retorno.data){
        console.log("PUSH")
        this.planes.push(retorno.data);
      }       
      console.log(this.planes) 
    });

    return await modal.present();
  }

  imagenSeleccionadaIcono(newValue : any){
    console.log(newValue);
    this.datosForm.patchValue({
      foto: newValue
    })
   }

  async editarPlan(plan,index){
    const modal = await this.modalController.create({
      component: FormPlanPage,
      componentProps: { plan: plan }
    });

    modal.onDidDismiss().then((retorno) => {
      if(retorno.data == 'eliminar'){
        this.planesServices.delete(this.planes[index].id);        
      }

      if(retorno.data){
        this.planes[index] = retorno.data;
        console.log(this.planes);        
      }  
    });

    return await modal.present();
  }

  async openNewCalendario(){
    const modal = await this.modalController.create({
      component: FormCalendarioPage,
      componentProps: { servicioId: this.servicio.id}
    });
    modal.onDidDismiss().then((retorno) => {
      if(retorno.data){
        this.calendarios.push(retorno.data);
      }        
    });
    return await modal.present();
  }

  async editarCalendario(calendario,index){
    const modal = await this.modalController.create({
      component: FormCalendarioPage,
      componentProps: { 
        calendario: calendario,
        servicioId: this.servicio.id
      }
    });
    modal.onDidDismiss().then((retorno) => {

      if(retorno.data == 'eliminar'){
        this.calendariosServices.delete(this.calendarios[index].id);  
      }

      if(retorno.data){
        this.calendarios[index] = retorno.data;
        console.log(this.planes);        
      } 
      
      
      
    });
    return await modal.present();
  }
  
  cancelar(){
    this.navCtrl.back();
  }

  elimiar(){
    this.presentAlertEliminar();
  }

  async openAddCategoria(){
    const modal = await this.modalController.create({
      component: FormCategoriaPage,  
      componentProps: { 
        comercioId:localStorage.getItem('comercio_seleccionadoId')
      }
    });  
    return await modal.present();
  }

  async presentAlertEliminar() { 
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: 'Está seguro que desea eliminar el servicio?',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.serviciosService.deleteS(this.route.snapshot.params.id);
            
            this.navCtrl.back();
          }
        }
      ]
    });
    await alert.present();
  }
  

}
