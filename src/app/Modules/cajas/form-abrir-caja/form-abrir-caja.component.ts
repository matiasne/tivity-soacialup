import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { Caja } from 'src/app/models/caja';
import { EnumTipoMovimientoCaja, MovimientoCaja } from 'src/app/models/movimientoCaja';
import { MovimientosService } from 'src/app/Services/movimientos.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { CajasService } from '../cajas.service';

@Component({
  selector: 'app-form-abrir-caja',
  templateUrl: './form-abrir-caja.component.html',
  styleUrls: ['./form-abrir-caja.component.scss'],
})
export class FormAbrirCajaComponent implements OnInit {

  @Input() caja:Caja;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();

  private enumTipoMovimientoCaja = EnumTipoMovimientoCaja
  
  public datosForm: FormGroup;  
  public fecha = new Date();
  public cajaId = "";
  submitted = false;
  public totalActual=0;

  public efectivo = 0;
  public debito = 0;
  public credito = 0;

  public movSub:Subscription;

  constructor(
    private navCtrl: NavController,
    private authenticationService:AuthenticationService,
    private cajasServices:CajasService,
    private movimientosService:MovimientosService,
  ) {
    

   }

  ngOnInit() {
    console.log(this.caja)
  }

  _abrir(){
    this.submitted = true;

    this.caja.estado = "abierta";

    var aperturaEfectivo = new MovimientoCaja(
      "",
      this.enumTipoMovimientoCaja.apertura,
      "local",
      this.caja.id,
      "efectivo",
      Number(this.efectivo),
      "Apertura De Caja Efectivo",
      this.authenticationService.getUID(),
      this.authenticationService.getEmail());
      
    this.movimientosService.add(aperturaEfectivo);


    var aperturaDebito = new MovimientoCaja(
      "",
      this.enumTipoMovimientoCaja.apertura,
      "local",
      this.caja.id,
      "debito",
      Number(this.debito),
      "Apertura De Caja Débito",
      this.authenticationService.getUID(),
      this.authenticationService.getEmail());
      
    this.movimientosService.add(aperturaDebito);


    var aperturaCredito = new MovimientoCaja(
      "",
      this.enumTipoMovimientoCaja.apertura,
      "local",
      this.caja.id,
      "credito",
      Number(this.credito),
      "Apertura De Caja Crédito",
      this.authenticationService.getUID(),
      this.authenticationService.getEmail());
      
    this.movimientosService.add(aperturaCredito);


    this.caja.estado = "abierta";

    this.caja.totalEfectivo = Number(this.efectivo);
    this.caja.totalDebito = Number(this.debito);
    this.caja.totalCredito = Number(this.credito);

    this.cajasServices.update(this.caja);

    this.guardar.emit();
  }

  _cancelar(){
    this.cancelar.emit();
  }

  

}



