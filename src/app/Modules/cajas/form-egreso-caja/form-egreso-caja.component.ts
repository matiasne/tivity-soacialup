import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Caja } from 'src/app/models/caja';
import { Comercio } from 'src/app/models/comercio';
import { EnumTipoMovimientoCaja, MovimientoCaja } from 'src/app/models/movimientoCaja';
import { MovimientosService } from 'src/app/Services/movimientos.service';
import { ToastService } from 'src/app/Services/toast.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { ComerciosService } from '../../comercio/comercios.service';
import { CajasService } from '../cajas.service';

@Component({
  selector: 'app-form-egreso-caja',
  templateUrl: './form-egreso-caja.component.html',
  styleUrls: ['./form-egreso-caja.component.scss'],
})
export class FormEgresoCajaComponent implements OnInit {

  @Input() caja:Caja;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();
  
  private enumTipoMovimientoCaja = EnumTipoMovimientoCaja
  
  public datosForm: FormGroup;
  submitted = false;
  public totalActual=0;
  public cajas = []
  public cajaSeleccionadaIndex=-1;
  public cajaSeleccionada:Caja;

  private egreso:MovimientoCaja;

  public monto = 0;
  public motivo = 0;

  public comercio:Comercio;

  public metodoPagoSeleccionado = "efectivo"

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private cajasService:CajasService,
    private movimientosService:MovimientosService,
    private toastServices:ToastService,
    private comerciosService:ComerciosService,
    private router:Router,
    private navParams:NavParams
  ) { 
    this.comercio = new Comercio()    
  }

   get f() { return this.datosForm.controls; }

  ngOnInit() {
    this.caja = new Caja() 
    this.caja.asignarValores(this.navParams.get('caja'))

    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue());
    
    this.cajas = [];
    this.cajasService.list().subscribe((cajas:any)=>{      
      for(let i=0;i <cajas.length;i++){
        if(cajas[i].estado == "abierta"){ 
          this.cajas.push(cajas[i]);
        }   
      }      
      console.log(this.cajas);
      if(this.cajas.length == 0){
        this.toastServices.alert("Debes tener al menos una caja abierta","");
        this.router.navigate(['/list-cajas']);
      }
      else{
        this.setCaja();
      }       
    });

  }


  setCaja(){

    for(let i=0;i <this.cajas.length;i++){
      if(this.cajas[i].id == this.route.snapshot.params.cajaId){ 
        this.cajaSeleccionadaIndex = i;
        this.caja = this.cajas[i]
        this.totalActual = this.cajas[i].totalEfectivo;
      }   
    } 
  }

  setearCaja(){
    this.caja = this.cajas[this.cajaSeleccionadaIndex]
    this.totalActual = this.caja[this.cajaSeleccionadaIndex].totalEfectivo;
  }

  _guardar(){

    this.submitted = true;
    

    if (this.metodoPagoSeleccionado =="efectivo" && this.caja.id == "") {
      this.toastServices.alert('Por favor seleccione una caja antes de continuar',"");
      return;
    } 

    if(this.metodoPagoSeleccionado =="efectivo" && this.monto > this.totalActual){
      this.toastServices.alert("El monto de egreso no puede ser mayor al monto total de efectivo en caja","");
      return;
    }

     
    this.movimientosService.agregarMovimientoCaja(this.caja.id,"",this.enumTipoMovimientoCaja.egreso,"","efectivo", - this.monto,this.motivo)

    
    this.navCtrl.back(); 
  }

  _cancelar(){
    this.navCtrl.back();
  }


}
