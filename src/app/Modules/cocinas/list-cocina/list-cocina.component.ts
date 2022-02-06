import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cocina } from 'src/app/models/cocina';
import { CocinasService } from 'src/app/Services/cocinas.service';

@Component({
  selector: 'app-list-cocina',
  templateUrl: './list-cocina.component.html',
  styleUrls: ['./list-cocina.component.scss'],
})
export class ListCocinaComponent implements OnInit {

  @Output() seleccionado = new EventEmitter<Cocina>();
  @Output() editar = new EventEmitter<Cocina>();
  
  cocinasSubs:Subscription;
  public cocinas =[];
  public buscando = true;
  
  constructor(
    private cocinaService:CocinasService,
  ) { }

  ngOnInit() {
    this.cocinasSubs = this.cocinaService.list().subscribe((cocinas:any)=>{                 
      this.cocinas = cocinas;     
      this.buscando = false;
    });
  }

  ionViewDidLeave(){
    this.cocinasSubs.unsubscribe();
  }

  _editar(){
    this.editar.emit()
  }

  _seleccionado(cocina){
    this.seleccionado.emit(cocina)
  } 

}