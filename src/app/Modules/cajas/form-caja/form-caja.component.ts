import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Caja } from 'src/app/models/caja';
import { ToastService } from 'src/app/Services/toast.service';
import { ComerciosService } from '../../comercio/comercios.service';
import { CajasService } from '../cajas.service';

@Component({
  selector: 'app-form-caja',
  templateUrl: './form-caja.component.html',
  styleUrls: ['./form-caja.component.scss'],
})
export class FormCajaComponent implements OnInit {

  @Input() caja:Caja;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();

  datosForm: FormGroup;
  submitted = false;
  public updating = false;
  public titulo="";
  public comercioId = "";

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,    
    private cajasService:CajasService,
    public modalCtrl: ModalController,
    private navParams:NavParams,
    public alertController: AlertController,
    private firestore: AngularFirestore,
    private toastServices:ToastService,
    private comerciosService:ComerciosService
  ) {

    
    
   }

  ngOnInit() {

    this.datosForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });    
    
    if(this.caja.id != ""){
      this.updating = true;
      this.titulo ="Editar Caja"      
    }   
    else{ 
      this.caja.id = this.firestore.createId();
      this.titulo ="Nueva Caja"   
      this.caja.comercioId = this.comerciosService.getSelectedCommerceId()
    } 

    this.datosForm = this.formBuilder.group({
      nombre: [this.caja.nombre, Validators.required],
    });
    
    console.log(this.caja);
  }

  get f() { return this.datosForm.controls; }


  _guardar(){

    this.submitted = true;
    // stop here if form is invalid

    this.caja.nombre = this.datosForm.controls.nombre.value;

    if (this.caja.nombre == "") {
      this.toastServices.alert('Por favor completar todos los campos marcados con * antes de continuar',"");
      return;
    }  

    var metodos = 0;
    if(this.caja.efectivo){
      metodos++;
    }

    if(this.caja.debito){
      metodos++;
    }

    if(this.caja.credito){
      metodos++;
    }

    if (metodos == 0) {
      this.toastServices.alert('Por favor seleccionar al menos un método de pago',"");
      return;
    }  

    if(this.updating)
      this.cajasService.update(this.caja);
    else{
      this.cajasService.add(this.caja);
    }
    this.guardar.emit();
  }

  _cancelar(){
    this.cancelar.emit()
  }

  async _eliminar(){

    const alert = await this.alertController.create({
      header: 'Está seguro que desea eliminar la caja?',
      message: 'Se perderán todos los movimientos y pagos de la misma.',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {           
            this.cajasService.delete(this.caja.id).then(data=>{
              console.log(data);
            });     
            this.eliminar.emit();
          }
        }
      ]
    });
    await alert.present();

    
  }


}
