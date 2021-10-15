import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Horario } from '../models/horario';
import { BaseService } from './base.service';
import { ComerciosService } from '../Modules/comercio/comercios.service';

@Injectable({
  providedIn: 'root'
})
export class HorariosService extends BaseService {

  constructor(
    protected firestore: AngularFirestore,
    private comerciosService:ComerciosService
    ) {     
      super(firestore); 
      this.comerciosService.getSelectedCommerce().subscribe(data=>{
        // let comercio_seleccionadoId = localStorage.getItem('comercio_seleccionadoId'); 
        if(data){
          
          this.setPath('comercios/'+data.id+'/horarios')   
         }
        
      })
  }

  getCollection(comercioId:any){
    return 'comercios/'+comercioId+'/horarios';
  }
  

}
