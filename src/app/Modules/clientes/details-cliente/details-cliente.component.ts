import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscripcionesService } from '../../../Services/subscripciones.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { FormComentarioPage } from '../../../form-comentario/form-comentario.page';
import { ClientesEstadosService } from '../../../Services/clientes-estados.service';
import { BeneficiosService } from '../../../Services/beneficios.service';
import { SelectBeneficioPage } from '../../../select-beneficio/select-beneficio.page';
import { NavegacionParametrosService } from '../../../Services/global/navegacion-parametros.service';
import { ClientesService } from 'src/app/Modules/clientes/clientes.service';
import { Subscription } from 'rxjs';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-details-cliente',
  templateUrl: './details-cliente.component.html',
  styleUrls: ['./details-cliente.component.scss'],
})
export class DetailsClienteComponent implements OnInit {

  @Input() cliente:Cliente;
  public estadosClientes =[];
  public beneficios = []; 
  public ctasCorrientes = [];
  public subsCliente:Subscription;

  constructor(
    public clientesServices:ClientesService,
    public subscripcionesService:SubscripcionesService,
    public router:Router,
    private callNumber: CallNumber,
    private emailComposer: EmailComposer,
    private alertController:AlertController,
    private modalController:ModalController,
    private clientesEstadosService:ClientesEstadosService,
    private beneficiosService:BeneficiosService,
  ) { 
    this.cliente = new Cliente()
    this.clientesEstadosService.list().subscribe((data) => {
      this.estadosClientes = data;
    });
    
  }

  ngOnInit() {}

  async openAddEstado(){
   
  }

  cambioEstado(){
    this.clientesServices.update(this.cliente).then(data=>{
      console.log(data);
    });
  }
 


  async agregarBeneficio(){
    const modal = await this.modalController.create({
      component: SelectBeneficioPage      
    });
    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data)
        this.beneficiosService.agregarBeneficioAUsuario(this.cliente,retorno.data.item).then(data=>{
          console.log(data)
        })
    });
    return await modal.present();
  }

  async cancelarBeneficio(beneficio){ 
    const alert = await this.alertController.create({
      header: 'Está seguro?',
      message: '',
      buttons: [
        { 
          text: 'No',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => {           
            this.beneficiosService.eliminarBeneficioAUsuario(this.cliente,beneficio).then(data=>{
              console.log(data)
            })           
          }
        }
      ]
    });
    await alert.present();    
  }

  crearCuentaCorriente(){
    this.router.navigate(['form-cta-corriente']);    
  }

  seleccionarCuentaCorriente(item){
    this.router.navigate(['details-cta-corriente',{
      id: item.id
    }]);
  }

  verDetalles(id){
    this.router.navigate(['details-subscripcion',{id:id}]);
  } 

  ionViewDidLeave(){
    this.subsCliente.unsubscribe();
  }

  llamar(){
    this.callNumber.callNumber(this.cliente.telefono, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  enviarMail(){    
      let email = {
        to: this.cliente.email,          
      }      
      // Send a text message using default options
      this.emailComposer.open(email);      
  }

  editar(){
    this.router.navigate(['form-cliente',{id:this.cliente.id}]);
  }

  cobrar(pagare){
    
  }

  editarCtaCorriente(item){
    this.router.navigate(['form-cta-corriente',{
      id: item.id
    }]);
  }

  async eliminarSubscripcion(item){

    const alert = await this.alertController.create({
      header: 'Está seguro que desea eliminar la subscripción?',
      message: 'Se perderán todos los movimientos y pagos de la misma.',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            
          }
        }, {
          text: 'Eliminar',
          handler: () => {           
            this.subscripcionesService.delete(item.id);  
          }
        }
      ]
    });
    await alert.present();    
  }

 
  async agregarComentario(){
    const modal = await this.modalController.create({
      component: FormComentarioPage,
      componentProps:{
        comentableId:this.cliente.id,
        comentableTipo:"clientes"
      }      
    }); 
    modal.onDidDismiss()
    .then((retorno) => {
      if(retorno.data)
        this.cliente.asignarValores(retorno.data.item);        
    });
    return await modal.present();
  }


}
