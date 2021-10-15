import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, NavParams } from '@ionic/angular';
import { AutosizeModule} from 'ngx-autosize'
import { Comentario } from '../models/comentario';
import { AuthenticationService } from '../Modules/authentication/authentication.service';
import { ComentariosService } from '../Modules/chat/comentarios.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent) content:IonContent
  
  public id:any;
  public objeto:any;
  private obs:any;
  constructor(
    private modalController:ModalController,
    private navParams:NavParams,
    private comentariosService:ComentariosService
  ) {  
      this.obs = this.comentariosService.obtener().subscribe(data =>{
       
        setTimeout(()=>{
          this.content.scrollToBottom(200)
        })   
      })
  }

  ngOnInit(){
    this.id = this.navParams.get('id')
    this.objeto = this.navParams.get('objeto')
    console.log(this.id)
  }

  ionViewDidLeave(){
    this.obs.unsubscribe();
  }

  
  cerrar(){
    this.modalController.dismiss()
  }
  

}
