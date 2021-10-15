import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, NavParams } from '@ionic/angular';
import { Comentario } from 'src/app/models/comentario';
import { AuthenticationService } from '../../authentication/authentication.service';
import { ComentariosService } from '../comentarios.service';

@Component({
  selector: 'app-list-mensajes',
  templateUrl: './list-mensajes.component.html',
  styleUrls: ['./list-mensajes.component.scss'],
})
export class ListMensajesComponent implements OnInit, OnDestroy, AfterViewInit {

  
  
  @Input() objeto
  @Input() id
  private obs:any
  public mensajes =[];
  public user:any

  constructor(
    private authService:AuthenticationService,
    private comentariosService:ComentariosService ,
  ) { }

  ngOnInit() {

    
    
  }

  ngAfterViewInit(){
    this.user = this.authService.getActualUser();
    this.user.id = this.authService.getUID();
    console.log(this.objeto+" "+this.id);

    this.comentariosService.setearPath(this.objeto,this.id);   
      this.obs = this.comentariosService.obtener().subscribe(data =>{
        data.forEach((item:any) =>{
          let agregar = true;
          this.mensajes.forEach(mensaje =>{
            if(mensaje.id == item.id){
              agregar = false
            }
          })
          console.log(agregar)
          if(agregar){
            this.mensajes.push(item)
          }
        })
        
      })
  }

  ngOnDestroy(){
    this.obs.unsubscribe();
  }

  
  eliminar(mensaje){
    this.comentariosService.delete(mensaje.id).then(data=>{
      
    })
  }

}
