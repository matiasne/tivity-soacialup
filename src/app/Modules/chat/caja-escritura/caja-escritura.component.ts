import { Component, Input, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/comentario';
import { AuthenticationService } from '../../authentication/authentication.service';
import { ComentariosService } from '../comentarios.service';

@Component({
  selector: 'app-caja-escritura',
  templateUrl: './caja-escritura.component.html',
  styleUrls: ['./caja-escritura.component.scss'],
})
export class CajaEscrituraComponent implements OnInit {

  @Input() objeto
  @Input() id

  public comentario:Comentario;
  public user:any

  constructor(
    private authService:AuthenticationService,
    private comentariosService:ComentariosService ,
  ) {
    this.comentario = new Comentario()
    
   }

  ngOnInit() {}

  enviar(){   
    this.user = this.authService.getActualUser();
    console.log(this.user)
    this.comentario.senderEmail = this.user.email;
    this.comentario.senderId = this.user.uid;

   
    this.comentariosService.add(this.comentario).then(data=>{
      console.log(data);    
    })
    
  }

}
