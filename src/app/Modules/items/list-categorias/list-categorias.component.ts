import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from 'src/app/Services/categorias.service';

@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.scss'],
})
export class ListCategoriasComponent implements OnInit {

  @Output() seleccionado = new EventEmitter<Categoria>();
  @Output() editar = new EventEmitter<Categoria>();
  
  private categoriasSubs:Subscription;
  public categorias =[];
  public buscando = true;

  constructor(
    private categoriaServices:CategoriasService
  ) { 
    this.categoriasSubs = this.categoriaServices.getAll().subscribe(snapshot=>{                 
      this.categorias = [];
      this.buscando = false;
      snapshot.forEach((snap: any) => {           
          var item = snap.payload.doc.data();
          item.id = snap.payload.doc.id;              
          this.categorias.push(item);             
      });
    }); 

  }

  ionViewDidLeave(){
    this.categoriasSubs.unsubscribe();
  }

  ngOnInit() {
  }

  _editar(){
    this.editar.emit()
  }

  _seleccionado(cocina){
    this.seleccionado.emit(cocina)
  } 

}