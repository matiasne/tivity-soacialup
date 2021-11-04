import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Caja } from 'src/app/models/caja';
import { EnumTipoMovimientoCaja } from 'src/app/models/movimientoCaja';
import { MovimientosService } from 'src/app/Services/movimientos.service';
import { CajasService } from '../cajas.service';

@Component({
  selector: 'app-form-cerrar-caja',
  templateUrl: './form-cerrar-caja.component.html',
  styleUrls: ['./form-cerrar-caja.component.scss'],
})
export class FormCerrarCajaComponent implements OnInit {


  @Input() caja:Caja;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();

  private enumTipoMovimientoCaja = EnumTipoMovimientoCaja
  
  public datosForm: FormGroup;  
  public fecha = new Date();
  public cajaId = "";
  submitted = false;
  public totalActual=0;

  public extraccionEfectivo = 0;
  public extraccionDebito = 0;
  public extraccionCredito = 0;

  public movSub:Subscription;
  
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private cajasServices:CajasService,
    private movimientosService:MovimientosService,
    private cajasService:CajasService,
    private navParams:NavParams
  ) { 
    this.fecha = new Date();
  }

  ngOnInit() {
    this.caja = new Caja() 
    this.caja.asignarValores(this.navParams.get('caja'))

    this.movSub = this.cajasServices.get(this.route.snapshot.params.cajaId).subscribe(data =>{
      this.caja.asignarValores(data)
    })
  }

  ionViewDidLeave(){
    this.movSub.unsubscribe();
  }

  get f() { return this.datosForm.controls; }

  _cerrar(){
    this.submitted = true;

    console.log(this.extraccionEfectivo +" "+this.caja.totalEfectivo)
    if(this.extraccionEfectivo > this.caja.totalEfectivo){
      alert("La extracción en Efectivo es mayor que el monto actual");
      return;
    }

    if(this.extraccionCredito > this.caja.totalCredito){
      alert("La extracción en Crédito es mayor que el monto actual");
      return;
    }

    if(this.extraccionDebito > this.caja.totalDebito){
      alert("La extracción en Débito es mayor que el monto actual");
      return;
    }


    this.movimientosService.setearPath(this.caja.id)

    this.movimientosService.agregarMovimientoCaja(
      this.caja.id,"",
      this.enumTipoMovimientoCaja.cierre,
      "",
      "efectivo", 
      -this.extraccionEfectivo,
      "Cierre De Caja Efectivo",
      )

    this.movimientosService.agregarMovimientoCaja(
      this.caja.id,"",
      this.enumTipoMovimientoCaja.cierre,
      "",
      "debito", 
      -this.extraccionDebito,
      "Cierre De Caja Débito",
      )
    
    this.movimientosService.agregarMovimientoCaja(
      this.caja.id,"",
      this.enumTipoMovimientoCaja.cierre,
      "",
      "credito", 
      -this.extraccionCredito,
      "Cierre De Caja Crédito",
      )

      this.cajasService.setMerge(this.caja.id,{estado:"cerrada"}).then(data=>{
        console.log("caja cerrada")
      });

    
    this.guardar.emit()
  }

  _cancelar(){
    this.cancelar.emit()
  }

}
