import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, EventAddArg, FullCalendarComponent, Calendar, EventInput } from '@fullcalendar/angular'; // useful for typechecking
import { ModalController } from '@ionic/angular';
import { CalendarModal, CalendarModalOptions } from 'ion2-calendar';
import { EditReservaPage } from 'src/app/edit-reserva/edit-reserva.page';
import { Comercio } from 'src/app/models/comercio';
import { ComerciosService } from 'src/app/Modules/comercio/comercios.service';
import { ToastService } from 'src/app/Services/toast.service';
import { Reserva } from '../../../models/reserva';
import { Subscripcion } from '../../../models/subscripcion';
import { NavegacionParametrosService } from '../../../Services/global/navegacion-parametros.service';
import { ReservasService } from '../reservas.service';

@Component({
  selector: 'app-list-reservas',
  templateUrl: './list-reservas.component.html',
  styleUrls: ['./list-reservas.component.scss'],
})
export class ListReservasComponent implements AfterViewInit , OnDestroy {

    //Filtros externos
    @Input() clienteIdFiltro= "";
    @Input() divisionFiltro ="";
    
    public fechaDesde = new Date();
    public fechaHasta = new Date();  
   
    @Input() vistaLista = false;  
    private comercio:Comercio 
  
    public itemsAll:any[] = [];
  
    public itemsView:Reserva[] =[];
  
    public obsReserva:any;
  
    
    
    constructor(
      private reservasService:ReservasService,
      private modalCtrl:ModalController,
      private navParametrosService:NavegacionParametrosService,
      private router:Router,
      private comercioService:ComerciosService,
      private toastService:ToastService
    ) { }  
  
    ngAfterViewInit() {      
        
      this.obsReserva = this.reservasService.listReservas().subscribe((data:any)=>{
        this.itemsAll = data;      
        this.mostrar(this.itemsAll)
      })
      this.comercio = new Comercio()
      this.comercio.asignarValores(this.comercioService.getSelectedCommerceValue())
      
    }
  
    

  
    ngOnDestroy(){
      this.obsReserva.unsubscribe()
    }
  
    editar(reserva){
      this.editarReserva(reserva)
    }
  
    
    
  
  
    async editarReserva(reserva){
      
      
      let res = new Reserva();
      res.asignarValores(reserva)
  
      this.navParametrosService.param = res
      const modal = await this.modalCtrl.create({
        component: EditReservaPage,  
        componentProps:{
          reserva:res
        },
        cssClass:'modal-custom-wrapper',
      });         
  
      modal.onDidDismiss()
      
      .then((retorno) => { 
  
        if(retorno.data){   
         
        this.reservasService.update(retorno.data).then(data=>{
          console.log("Reserva guardada")
        })
        }else{
  
        }     
  
  
      });
  
      await modal.present();
    }
  
    async nuevaReserva(fechaInicio = null){
      
      let res = new Reserva();
  
      if(fechaInicio){
  
        console.log(fechaInicio)
        let dateInicio = new Date(fechaInicio)  //Pot problemas con la hora que no viene en el calendario
        console.log(dateInicio)
        res.desde = dateInicio.toISOString();
      }
  
  
      if(this.divisionFiltro != ""){
        res.divisionNombre = this.divisionFiltro
      }
  
      if(this.clienteIdFiltro){
        res.asignarCliente(this.navParametrosService.param)
      }
      console.log(res)
      const modal = await this.modalCtrl.create({
        component: EditReservaPage,
        componentProps:{
          reserva: res,
       },     
        cssClass:'modal-custom-wrapper',
  
      });         
  
      modal.onDidDismiss()
      
      .then((retorno) => { 
  
        if(retorno.data){   
        this.reservasService.add(retorno.data).then(data=>{
          console.log("Reserva guardada")
        })
        }else{
  
        }     
      });
  
      await modal.present();
    }
  
  
    mostrar(arrayElementos){
     
      console.log(arrayElementos.length);    
      this.itemsView = []  
      for(let i = 0; i < arrayElementos.length; i++){ 
          
          let encontrado = true;
          
          if(encontrado  && this.divisionFiltro){   
            encontrado = false;
            let retorno =  (arrayElementos[i].divisionNombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(this.divisionFiltro.toLowerCase()) > -1);
            encontrado = retorno;          
          }
         
  
          if(encontrado && this.clienteIdFiltro){  
            encontrado = false; 
            if(arrayElementos[i].clienteId === this.clienteIdFiltro){
              encontrado = true;
            }
          }
          console.log(encontrado)
          if(encontrado && this.vistaLista){
            encontrado = false;
            let desdeReserva = new Date(arrayElementos[i].desde).getTime();
            if(desdeReserva > this.fechaDesde.getTime() && desdeReserva < this.fechaHasta.getTime())
              encontrado = true;
          }
  
          if(encontrado){            
            
            this.itemsView.push(arrayElementos[i])
  
  
          }
      }   
    }
  
    borrarDatosComponente() { // debe ser llamado por la página que contiene el componente
      this.obsReserva.unsubscribe()
    }
  
    
  
    async abrirSelectorFechas(){
      
      let comienzo = new Date();
      comienzo.setDate(comienzo.getDate() - this.comercio.config.memoriaDias);  
      const options: CalendarModalOptions = {
        title: '',
        from:comienzo,
        pickMode: 'range'
      };
   
      const myCalendar = await this.modalCtrl.create({
        component: CalendarModal,
        componentProps: { options }
      });
  
      myCalendar.onDidDismiss()
      .then((retorno) => {
        console.log(retorno)
        if(retorno.data){
          this.fechaDesde = retorno.data.from.dateObj,
          this.fechaHasta = retorno.data.to.dateObj
          this.fechaHasta.setDate(this.fechaHasta.getDate() + 1); 
          this.mostrar(this.itemsAll)
        }       
      });
   
      myCalendar.present();
  
    }

}
