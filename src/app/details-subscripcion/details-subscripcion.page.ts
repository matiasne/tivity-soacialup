import { Component, OnInit } from '@angular/core';
import { SubscripcionesService } from '../Services/subscripciones.service';
import { ActivatedRoute } from '@angular/router';
import { Subscripcion } from '../models/subscripcion';
import { Cliente } from '../models/cliente';
import { Servicio } from '../models/servicio';
import { PagaresService } from '../Services/pagares.service';

@Component({
  selector: 'app-details-subscripcion',
  templateUrl: './details-subscripcion.page.html',
  styleUrls: ['./details-subscripcion.page.scss'],
})
export class DetailsSubscripcionPage implements OnInit {

  public subscripcion:Subscripcion; 
  public cliente:Cliente;
  public servicio:Servicio;
  public pagares = [];
  constructor(
    private route: ActivatedRoute,
    private subscripcionesService:SubscripcionesService,
    private pagaresService:PagaresService,
  ) { 
    this.subscripcion = new Subscripcion("","");
    this.cliente = new Cliente();
    this.servicio = new Servicio();
  }

  ngOnInit() {

    this.subscripcionesService.get(this.route.snapshot.params.id).subscribe(data=>{
      console.log(data);
      this.subscripcion.asignarValores(data);
               
      this.subscripcion.clienteRef.get().then(snap=>{
        this.subscripcion["cliente"].nombre = snap.data().nombre;
      });

      this.subscripcion.servicioRef.get().then(snap=>{
        if(snap)
          this.subscripcion["servicio"].nombre = snap.data().nombre;
      });
    
      if(this.subscripcion.planRef){
        this.subscripcion.planRef.get().then(snap=>{
          if(snap){ 
            this.subscripcion['plan'].nombre = snap.data().nombre;
            this.subscripcion['plan'].precio = snap.data().precio;
          }
          
        });
      }
      else{
        this.subscripcion['plan'] = {
          precio: this.subscripcion.precio,
          tipo:this.subscripcion.tipo,
          dias:this.subscripcion.dias,
          nombre: "Personalizado"
        }
      }
     

      let fechaActual = new Date();
      let fechaAMesActual = new Date(this.subscripcion.fechaInicio);
      fechaAMesActual.setMonth(fechaActual.getMonth());

      if(fechaActual > fechaAMesActual){
        fechaAMesActual.setMonth(fechaActual.getMonth()+1);
      }

      let fechaProximoPago = fechaAMesActual;
      this.subscripcion.proximoPago = fechaProximoPago;

      console.log(fechaProximoPago);

    })  

    this.pagaresService.setSubsId(this.route.snapshot.params.id);
    this.pagaresService.list().subscribe(data =>{
      console.log(data)
      this.pagares = data;
    })
    

  }

  cobrar(pagare){
 
  }

}
