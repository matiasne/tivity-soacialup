import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Caja } from 'src/app/models/caja';
import { Comercio } from 'src/app/models/comercio';
import { EnumTipoMovimientoCaja, MovimientoCaja } from 'src/app/models/movimientoCaja';
import { SelectClientePage } from 'src/app/select-cliente/select-cliente.page';
import { CtaCorrientesService } from 'src/app/Services/cta-corrientes.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { MovimientosService } from 'src/app/Services/movimientos.service';
import { ToastService } from 'src/app/Services/toast.service';
import { Cliente } from '../../clientes/cliente';
import { ComerciosService } from '../../comercio/comercios.service';
import { CajasService } from '../cajas.service';

@Component({
  selector: 'app-form-ingreso-caja',
  templateUrl: './form-ingreso-caja.component.html',
  styleUrls: ['./form-ingreso-caja.component.scss'],
})
export class FormIngresoCajaComponent implements OnInit {

  @Input() caja:Caja;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();
  
  private enumTipoMovimientoCaja = EnumTipoMovimientoCaja
  
  public datosForm: FormGroup;
  submitted = false;
  public totalActual=0;
  public metodoPagoSeleccionado ="efectivo";
  public cliente:Cliente;
  public ctasCorrientes = [];
  public ctaCorrienteSelecccionadaId ="";
  
  private pago:MovimientoCaja;
  public comercio:Comercio;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private navCtrl:NavController,
    private ctasCorrientesService:CtaCorrientesService,
    private loadingService:LoadingService,
    private modalController:ModalController,
    private cajasService:CajasService,
    private movimientosService:MovimientosService,
    private toastServices:ToastService,
    private comerciosService:ComerciosService,
  ) { 

    this.cliente = new Cliente();
    this.caja = new Caja();
    this.comercio = new Comercio()

    this.datosForm = this.formBuilder.group({
      cajaId:[this.route.snapshot.params.cajaId,Validators.required],
      monto: ['', Validators.required],
      motivo:['', Validators.required]
    });

    let comercio_seleccionadoId = localStorage.getItem('comercio_seleccionadoId');
    this.cajasService.get(this.route.snapshot.params.cajaId).subscribe((caja:any) =>{
      this.caja = caja;
    })

  }

  get f() { return this.datosForm.controls; }

  ngOnInit() {
    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue());
  }


  setearCtaCorriente(){
    console.log(this.ctaCorrienteSelecccionadaId)
  }

  _guardar(){
  
    this.submitted = true;

    if (this.datosForm.invalid) {
      this.toastServices.alert('Por favor completar todos los campos marcados con * antes de continuar',"");
      return;
    } 

    console.log()
    if(this.datosForm.controls.monto.value > this.route.snapshot.params.totalActual){
      alert("El monto de egreso no puede ser mayor al monto total de efectivo en caja");
      return;
    }
   
      this.movimientosService.agregarMovimientoCaja(this.caja.id,"",this.enumTipoMovimientoCaja.ingreso,"","efectivo", this.datosForm.controls.monto.value,
      this.datosForm.controls.motivo.value)

      
    


    this.guardar.emit()
  }

  async seleccionarCliente(){
    this.loadingService.presentLoading();
    const modal = await this.modalController.create({
      component: SelectClientePage      
    });

    modal.present().then(()=>{
      
    })

    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data){
        this.cliente.asignarValores(retorno.data.item);
        this.getCuentasCorrientes(retorno.data.item)
      }        
    });
    return await modal.present();
  }

  eliminarCliente(){
    this.cliente = new Cliente();
  }

  getCuentasCorrientes(cliente){
    this.ctasCorrientesService.getByCliente(cliente.id).subscribe(snapshot =>{
      this.ctasCorrientes =[];
      snapshot.forEach((snap: any) => {           
          var item = snap.payload.doc.data();
          item.id = snap.payload.doc.id;              
          this.ctasCorrientes.push(item);
          console.log(this.ctasCorrientes);             
      });
    })
  }

  _cancelar(){
    this.cancelar.emit();
  }

}
