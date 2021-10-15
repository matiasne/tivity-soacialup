import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { firestore } from 'firebase';
import { map, subscribeOn } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Cliente } from './cliente';
import { KeywordService } from '../../Services/keyword.service';
import { BaseService } from '../../Services/base.service';
import { ComerciosService } from '../comercio/comercios.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends BaseService {

  private collectionGroup:string;
  
  constructor(
    protected afs: AngularFirestore,
    private keywordService:KeywordService,
    private comerciosService:ComerciosService
    ) {     
      super(afs); 
      this.comerciosService.getSelectedCommerce().subscribe(data=>{
        // let comercio_seleccionadoId = localStorage.getItem('comercio_seleccionadoId'); 
        if(data){         
          console.log(data.id)
         this.setPath('comercios/'+data.id+'/clientes')   
        }
        
      })
      this.collectionGroup ='/clientes';
  }


  public add(data:Cliente) {   

    this.keywordService.agregarKeywords(data, [data.nombre,data.email]);
   
    const param = JSON.parse(JSON.stringify(data));

    return super.add(param);
     
  }

  getRef(id){
    return this.afs.collection(this.path).doc(id).ref;
  }

  public getAll() {   
    return this.afs.collection(this.path).snapshotChanges();
  }
  
  public update(cliente:Cliente) {

    /*this.keywordService.agregarKeywords(cliente, [cliente.nombre,cliente.email]);


    console.log(cliente);*/
    const param = JSON.parse(JSON.stringify(cliente));

    return super.update(param)
  }

  public delete(data) {
    //Debo eliminar primero cada subscripción
    if(data.subscripciones){
      data.subscripciones.forEach(subscripcion => {
        this.afs.doc(subscripcion).delete();
      });
    }
    return super.delete(data);  
  }

  public addCtaCorriente(clienteId,ctaCorrienteId){
    let param ={
      ctaId:ctaCorrienteId
    }
    this.afs.collection(this.path+'/'+clienteId+'/ctasCorrientes').doc(ctaCorrienteId).set(param)
  }

  public deleteCtaCorriente(clienteId,ctaCorrienteId){
    this.afs.collection(this.path+'/'+clienteId+'/ctasCorrientes').doc(ctaCorrienteId).delete();
  }

  public search(limit,orderBy,palabra,ultimo){      
    if(ultimo == ""){
      console.log("!!!!!! primero")
      console.log(palabra)     
      console.log(orderBy)
      return this.afs.collection(this.path, ref => 
        ref.where('keywords','array-contains',palabra)
            .orderBy(orderBy)
            .limit(limit)).snapshotChanges();
    }
    else{
      console.log(palabra)     
      console.log(orderBy)
      return this.afs.collection(this.path, ref => 
        ref.where('keywords','array-contains',palabra)
            .orderBy(orderBy)
            .startAfter(ultimo)
            .limit(limit)).snapshotChanges();    
    }    
  }  

}
