import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Comercio } from 'src/app/models/comercio';
import { EnumEstadoCocina } from 'src/app/models/item';
import { EnumEstadoCobro } from 'src/app/models/pedido';
import { ComentariosService } from '../../chat/comentarios.service';
import { ComerciosService } from '../../comercio/comercios.service';
import { PedidoService } from '../../pedidos/pedido.service';

@Component({
  selector: 'app-card-comanda',
  templateUrl: './card-comanda.component.html',
  styleUrls: ['./card-comanda.component.scss'],
})
export class CardComandaComponent implements OnInit {

  @Input() public pedido:any;
  @Input() public cocinasFiltro:any;
  @Input() showAvatar = true;

  @Output() ver = new EventEmitter<any>();

  public comercio:Comercio; 
  public pEstado = EnumEstadoCocina;
  public cEstado = EnumEstadoCobro;

  public submit = false;

  public vencimiento:any 
  public minutosRestantes = 0;
  public interval:any
  public restantesPorcentaje = 100;

  constructor(
    private comercioService:ComerciosService,
    private pedidosService:PedidoService,
    private modalController:ModalController,
    private comentariosService:ComentariosService,
    private alertController:AlertController
  ) { 
    this.comercio = new Comercio();
    this.comercio.asignarValores(this.comercioService.getSelectedCommerceValue());   
    this.submit = false;
    
    
   
  }

  open(){
    this.ver.emit();
  }

  setVencimiento(){ 
    if (this.pedido.fechaTomado){
      this.vencimiento = this.pedido.fechaTomado.toDate()
      if(this.pedido.comanda){
        if(this.pedido.comanda.demora > 0){
          this.vencimiento.setMinutes(this.pedido.fechaTomado.toDate().getMinutes() + this.pedido.comanda.demora);
  
          let fechaHoy = new Date()
          this.minutosRestantes = Math.round((this.vencimiento.getTime() - fechaHoy.getTime()) / (1000 * 60))
  
          if(this.minutosRestantes < 0){
            this.minutosRestantes = 0;
          }
          
          this.restantesPorcentaje = (this.minutosRestantes/this.pedido.comanda.demora)*100        
          console.log(this.minutosRestantes+" %"+this.restantesPorcentaje)
          if(this.minutosRestantes > 0){
            this.interval = setInterval(()=>{
              
                
                let fechaHoy = new Date()
                this.minutosRestantes = Math.round((this.vencimiento.getTime() - fechaHoy.getTime()) / (1000 * 60))
                
                
                
  
                this.restantesPorcentaje = (this.minutosRestantes/this.pedido.comanda.demora)*100
  
                console.log(this.minutosRestantes+" %"+this.restantesPorcentaje)
              
            },60000)
          }
        }
      }
    }
    
    
    
  }

  ngOnDestroy(){
    console.log("destroy comanda")
    clearInterval(this.interval);
  }

  ngOnInit() {
    
    if(this.pedido.comanda)
      this.minutosRestantes = this.pedido.comanda.demora
    this.pedido.items.sort(function(a, b) {
      return Number(a.cocinaId) - Number(b.cocinaId);
    });
    this.submit = false;
    this.setVencimiento()
  }

  async rechazar(){
    this.setearProductosDeCocina(EnumEstadoCocina.rechazado)     
  } 

  tomar(){
    
    this.setearProductosDeCocina(EnumEstadoCocina.tomado)
    this.open()
  }

  listo(){
    this.setearProductosDeCocina(EnumEstadoCocina.completo)
  }

 
  async cancelar(){ 
    const alert = await this.alertController.create({
      header: 'Está seguro que desea suspender la comanda?',
      message: '',
      buttons: [
        { 
          text: 'No',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => { 
                    
            this.setearProductosDeCocina(EnumEstadoCocina.solicitado)            
          }
        }
      ]
    });
    await alert.present();    
  }

  async volver(){ 
    const alert = await this.alertController.create({
      header: 'Está seguro que desea volver la comanda?',
      message: '',
      buttons: [
        { 
          text: 'No',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => {           
            this.setearProductosDeCocina(EnumEstadoCocina.tomado)          
          }
        }
      ]
    });
    await alert.present();    
  }

  finalizar(){
    this.setearProductosDeCocina(EnumEstadoCocina.finalizado)
  }

  setearProductosDeCocina(estado){
    this.submit = true;  
    this.pedido.comanda.estado = estado;
    this.pedidosService.update(this.pedido).then(data=>{
      console.log("Pedido Actualizado");
    }) 
  }

}
