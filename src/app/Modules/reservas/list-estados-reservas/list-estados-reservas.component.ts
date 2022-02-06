import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EstadosReservasService } from 'src/app/Services/estados-reservas.service';

@Component({
  selector: 'app-list-estados-reservas',
  templateUrl: './list-estados-reservas.component.html',
  styleUrls: ['./list-estados-reservas.component.scss'],
})
export class ListEstadosReservasComponent implements OnInit {

  @Output() seleccionado = new EventEmitter<any>();
  @Output() editar = new EventEmitter<any>();
  
  public estados = []

  constructor(
    private estadosReservaService:EstadosReservasService
  ) { 
    this.estadosReservaService.list().subscribe(res =>{
      this.estados = res;
    })

  }

  ngOnInit() {}

  seleccionar(estado){
    console.log(estado)
    this.seleccionado.emit(estado)
  }

  editarClick(estado){
    console.log(estado)
    this.editar.emit(estado)
  }

  eliminar(estado){
    this.estadosReservaService.delete(estado.id).then(data=>{
      console.log("Borrado correctamente")
    })
  }

}
