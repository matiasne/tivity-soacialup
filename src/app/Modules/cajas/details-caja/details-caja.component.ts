import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { EditPedidoPage } from 'src/app/edit-pedido/edit-pedido.page';
import { Caja } from 'src/app/models/caja';
import { Comercio } from 'src/app/models/comercio';
import { EnumTipoMovimientoCaja, MovimientoCaja } from 'src/app/models/movimientoCaja';
import { Pedido } from 'src/app/models/pedido';
import { NavegacionParametrosService } from 'src/app/Services/global/navegacion-parametros.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { MovimientosService } from 'src/app/Services/movimientos.service';
import { VentasService } from 'src/app/Services/ventas.service';
import { ComerciosService } from '../../comercio/comercios.service';
import { PedidoService } from '../../pedidos/pedido.service';
import { CajasService } from '../cajas.service';

@Component({
  selector: 'app-details-caja',
  templateUrl: './details-caja.component.html',
  styleUrls: ['./details-caja.component.scss'],
})
export class DetailsCajaComponent implements OnInit {

  public enumTipoMovimientoCaja = EnumTipoMovimientoCaja
  
  public items:MovimientoCaja[] = [];
  @Input() caja:Caja;
  @Output() abrirCaja = new EventEmitter<any>();
  
  public totalGeneral = 0;

  public optionCaja = "";

  public fechaDesde = new Date();

  public comercio:Comercio

  public totales = {
    efectivo: 0,
    debito:0,
    credito:0,
    ctaCorriente:0,
    general:0
  }
  constructor(
    public cajasService:CajasService,
    public ventasServices:VentasService,
    public router:Router,
    public loadingService:LoadingService,
    public alertController:AlertController,
    private movimientosService:MovimientosService,
    private comercioService:ComerciosService,
    private pedidosService:PedidoService,
    public navParametrosService:NavegacionParametrosService,
    private modalController:ModalController,
    public changeRef:ChangeDetectorRef,
  ) { 
    this.comercio = new Comercio()
    this.comercio = this.comercioService.getSelectedCommerceValue()

    this.fechaDesde.setDate(this.fechaDesde.getDate() - 1);  
    
    
    

  }

  ngOnInit() {

    this.movimientosService.setearPath(this.caja.id)
    this.movimientosService.getMovimientosCaja(this.caja.id,this.fechaDesde).subscribe(data =>{
    
      this.items = data;
      console.log(this.items)     
    }); 

    this.refrescar(); 
  }

  onChangeAtras(event){
    this.fechaDesde.setDate(this.fechaDesde.getDate() - Number(event.target.value));
    this.refrescar()   
  }

  refrescar(){
    
    this.cajasService.get(this.caja.id).subscribe(data=>{
      this.caja.asignarValores(data);
      console.log(data)
      console.log("Cambiando valores de caja!")
      this.changeRef.detectChanges()   
    })
    
  }

  
  irEgreso(){
    this.router.navigate(['form-egreso-caja',
    {
      cajaId:this.caja.id,
      totalActual: this.caja.totalEfectivo
    }
    ]);
  }

  irIngreso(){
    this.router.navigate(['form-ingreso-caja',
    {
      cajaId:this.caja.id
    }
    ]);
  }

  irCierre(){
    this.router.navigate(['form-cierre-caja',
      {
        cajaId:this.caja.id,
      }
    ]);
  }

  irApertura(){
    this.abrirCaja.emit();
  }

  
}
