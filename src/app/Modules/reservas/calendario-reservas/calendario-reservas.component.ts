import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { ModalController } from '@ionic/angular';
import { Reserva } from 'src/app/models/reserva';
import { NavegacionParametrosService } from 'src/app/Services/global/navegacion-parametros.service';
import { ReservasService } from 'src/app/Modules/reservas/reservas.service';
import { ToastService } from 'src/app/Services/toast.service';
import { EditReservaPage } from 'src/app/edit-reserva/edit-reserva.page';

@Component({
  selector: 'app-calendario-reservas',
  templateUrl: './calendario-reservas.component.html',
  styleUrls: ['./calendario-reservas.component.scss'],
})
export class CalendarioReservasComponent implements OnInit , AfterViewInit {

  @ViewChild("fullcalendar", { static: false }) calendarComponent: FullCalendarComponent;
  calendarApi: Calendar;

  public itemsAll = []
  public itemsView = []
  events:any[] = [];

  public divisionFiltro = "";
  public clienteIdFiltro ="";

  public obsReserva:any
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    slotDuration: '00:15:00',
    locale: 'es',
    dayHeaderFormat:{ weekday: 'short' },
    dateClick: this.handleDateClick.bind(this), // bind is important!
   // events: this.events,
    height:900,  
    eventClick: this.handleEventClick.bind(this),
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,prev,next today'
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    buttonText:{
      today:    'Hoy',
      month:    'Meses',
      week:     'Semanas',
      day:      'días',
      list:     'lista'
    }
  };

  public initCalendar = true;

  constructor(
    private toastService:ToastService,
    private navParametrosService:NavegacionParametrosService,
    private modalCtrl:ModalController,
    private reservasService:ReservasService
  ) {

    

    
   }
  

  ngOnInit() {

    
  }


  ngAfterViewInit(){
    if(this.initCalendar){
      console.log("Iniciando calendario")
      this.initCalendar = false
      this.calendarApi = this.calendarComponent.getApi();     
      this.calendarComponent.options = this.calendarOptions; 
      this
    }

    this.obsReserva = this.reservasService.listReservas().subscribe((data:any)=>{
      this.itemsAll = data;      
      this.mostrar(this.itemsAll)
    })


    document.addEventListener('DOMContentLoaded', function() {
      var calendarEl = document.getElementById('calendar');
      const calendar = new Calendar(calendarEl, this.calendarOptions);

      calendar.render();
    })

    
  }

  borrarDatosComponente() { // debe ser llamado por la página que contiene el componente
    this.obsReserva.unsubscribe()
  }

  mostrar(arrayElementos){
    this.calendarComponent.options = this.calendarOptions;
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
       
        if(encontrado){            
          
          this.itemsView.push(arrayElementos[i])


        }
    }   
    this.updateCalendar()
  }

  handleEventClick(info){
    console.log('Event: ' + info.event.title);
    console.log(info.event.extendedProps);
    let reserva = new Reserva()
    reserva.asignarValores(info.event.extendedProps)
    this.editarReserva(reserva)
  }
  
  handleDateClick(arg) {
    console.log(arg)
  
    if(arg.view.type == 'dayGridMonth'){
      console.log(arg.date.getTime())
      console.log((new Date()).getTime())
      
      this.calendarApi.changeView('timeGridDay');
      this.calendarApi.gotoDate(arg.date)
    }
    
    if(arg.view.type != 'dayGridMonth'){
      if(arg.date.getTime() < (new Date()).getTime()){
        this.toastService.alert("Solo se permite reservas a fechas futuras","")
        return 
      }
      this.nuevaReserva(arg.date) 
    }
       
  }

  updateCalendar(){
    if(this.calendarApi){
      this.calendarApi.removeAllEvents()
      this.itemsView.forEach(element => {
        let event = {
          id:element.id,
          title:"reserva",
          start:element.desde,
          end:element.hasta,
          color:element.estado.color,
          extendedProps:JSON.parse(JSON.stringify(element))          
        }
        this.calendarApi.addEvent(event)
        
        this.events.push(event);
      })
    }
    
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
        console.log("Reserva editada")
      })
      }else{

      }     


    });

    await modal.present();
  }

  async nuevaReserva(fechaInicio = null){
    
    let res = new Reserva();

    if(fechaInicio){
      let dateInicio = new Date(fechaInicio)  //Pot problemas con la hora que no viene en el calendario
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
          this.updateCalendar()
        })
      }else{

      }     
    });

    await modal.present();
  }

}
