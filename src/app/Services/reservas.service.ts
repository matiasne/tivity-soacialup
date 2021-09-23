import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
import { Reserva } from '../models/reserva';
import { BaseService } from './base.service';
import { ComerciosService } from './comercios.service';

@Injectable({
  providedIn: 'root'
})
export class ReservasService extends BaseService{

  private comercioId = "";

  public memoriaDias = 0;

  constructor(
    protected afs: AngularFirestore,
    private comerciosService:ComerciosService
    ) {     
      super(afs); 
      this.comerciosService.getSelectedCommerce().subscribe(data=>{
        // let comercio_seleccionadoId = localStorage.getItem('comercio_seleccionadoId'); 
        if(data){
          this.memoriaDias = data.config.memoriaDias

         this.comercioId = data.id
         this.setPath("comercios/"+this.comercioId+"/reservas");
         }
        
      })
  }

  add(reserva:Reserva) {  
  
    console.log(reserva.desde)
  
    let desdeTimestamp =  firebase.firestore.Timestamp.fromDate(new Date(reserva.desde));
    console.log(desdeTimestamp.toDate());
    reserva.desde = desdeTimestamp.toDate();
    return super.add(reserva);
  }

  update(reserva:Reserva) {  

    console.log(reserva.desde)
    
    let desdeTimestamp =  firebase.firestore.Timestamp.fromDate(new Date(reserva.desde));
    console.log(desdeTimestamp.toDate());
    reserva.desde = desdeTimestamp.toDate();
    return super.update(reserva);
  }

  listReservas() {
    console.log('[BaseService] list: '+this.path);    

    let fechaDiasMemoria = new Date();
    console.log(this.memoriaDias)
    fechaDiasMemoria.setDate(fechaDiasMemoria.getDate() - Number(this.memoriaDias));

    return this.afs.collection(this.path, ref => ref.where('desde', '>=', fechaDiasMemoria)).snapshotChanges()
        .pipe(
            map(changes => {
                

                return changes.map(a => {
                    const data:any = a.payload.doc.data();

                    let desdeJSDate =  data.desde.toDate()
                    data.desde = desdeJSDate;


                    data.id = a.payload.doc.id;
                    data.fromCache = a.payload.doc.metadata.fromCache;

                    //================= borra lo anterior a la fecha configurada de almacenamiento
                   
                   /* if(this.memoriaDias > 0){

                      var batch = this.afs.firestore.batch();
                      let fechaDiasMemoria = new Date();                      
                      fechaDiasMemoria.setDate(fechaDiasMemoria.getDate() - Number(this.memoriaDias));  
                      let borrar = false;
                      console.log(data.desde)
                      if(data.desde instanceof firestore.Timestamp){
                        if(data.desde.toDate().getTime() < fechaDiasMemoria.getTime()){
                          borrar = true
                          var pedidoRef:any = this.getRef(data.id)
                          batch.delete(pedidoRef)
                          console.log("borrando pedido id: "+data.id)
                        }
                      }
                     // console.log(data.createdAt.toDate()+" "+fechaDiasMemoria)
                      
  
                      if(borrar){
                        batch.commit()
                      }
                    }*/
                    

                    return data;
                });
            })
        );          
  }    

  
}

