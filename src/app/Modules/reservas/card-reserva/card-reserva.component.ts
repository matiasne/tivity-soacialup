import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';

@Component({
  selector: 'app-card-reserva',
  templateUrl: './card-reserva.component.html',
  styleUrls: ['./card-reserva.component.scss'],
})
export class CardReservaComponent implements OnInit {

  @Input() item:Reserva;
  @Output() select = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
    
  }

  seleccionar(){
    this.select.emit();  
  }

}

