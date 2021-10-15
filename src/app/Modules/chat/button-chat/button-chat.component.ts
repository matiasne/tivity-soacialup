import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatPage } from 'src/app/chat/chat.page';
import { ComentariosService } from '../comentarios.service';

@Component({
  selector: 'app-button-chat',
  templateUrl: './button-chat.component.html',
  styleUrls: ['./button-chat.component.scss'],
})
export class ButtonChatComponent implements OnInit {

  @Input() objeto:any;
  @Input() id:any;

  constructor(
    private modalController:ModalController,
    private comentariosService:ComentariosService ,
  ) { }

  ngOnInit() {}

  async chat(){
    this.comentariosService.setearPath(this.objeto,this.id);   
    console.log(this.objeto+" "+this.id)
    const modal = await this.modalController.create({
      component: ChatPage,     
      cssClass:'modal-custom-wrapper',
      componentProps:{
        id:this.id,
        objeto:this.objeto
      }      
    });
    return await modal.present(); 
  }

}
