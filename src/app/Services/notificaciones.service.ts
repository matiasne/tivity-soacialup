import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { RolesService } from './roles.service';
import { NotifificacionesAppService } from './notifificaciones-app.service';
import { Notificacion } from '../models/notificacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  private httpParams = new HttpParams({
      
  })

  private options = {
    headers: this.httpHeaders,
    params: this.httpParams
  };

  constructor(
    private usuariosService:UsuariosService,
    private rolesService:RolesService,
    private httpClient: HttpClient,
    private notificacionesAppService:NotifificacionesAppService
  ) { }

  enviarByMail(email,titulo,mensaje){

    let sub = this.usuariosService.getByEmail(email).subscribe(snapshot=>{
      console.log(snapshot);
      snapshot.forEach(snap =>{
        
        var usuario:any = snap.payload.doc.data();
        usuario.id = snap.payload.doc.id;   
        console.log(usuario);


        if(usuario.notificationCelulartoken){
          this.enviarHttp(usuario.notificationCelulartoken,titulo,mensaje).subscribe(data=>{
            console.log(data);
          });
        }
        else{
          console.log("notification_token no existe en el usuario");
        }

        if(usuario.notificacionesWebToken){
          this.enviarHttp(usuario.notificacionesWebToken,titulo,mensaje).subscribe(data=>{
            console.log(data);
          });
        }
        else{
          console.log("notificacionesWebToken no existe en el usuario");
        }

        let notificacion = new Notificacion();
        notificacion.userId = usuario.id;
        notificacion.titulo = titulo;
        notificacion.mensaje = mensaje;
        notificacion.tipo = "simple";
        notificacion.estado = "pendiente";

        this.notificacionesAppService.create(notificacion);

      });

      sub.unsubscribe();
    })
  }

  enviarById(id,titulo,mensaje){

    let sub = this.usuariosService.get(id).subscribe(snapshot=>{
      
        var usuario:any = snapshot.payload.data();
        usuario.id = snapshot.payload.id;   
        console.log(usuario);

        if(usuario.notificationCelulartoken)
          this.enviarHttp(usuario.notificationCelulartoken,titulo,mensaje).subscribe(data=>{
            console.log(data);
          });

        if(usuario.notificacionesWebToken)
          this.enviarHttp(usuario.notificacionesWebToken,titulo,mensaje).subscribe(data=>{
            console.log(data);
          });

        let notificacion = new Notificacion();
        notificacion.userId = usuario.id;
        notificacion.titulo = titulo;
        notificacion.mensaje = mensaje;
        notificacion.tipo = "simple";
        notificacion.estado = "pendiente";

        this.notificacionesAppService.create(notificacion);
        sub.unsubscribe();
    })
  }

  enviarByRolId(id,titulo,mensaje){

    console.log("!!!!!!!!!!!!!!")
    let sub = this.rolesService.get(id).subscribe(snapshot=>{      
      var rol:any = snapshot.payload.data();
      if(rol){
        rol.id = snapshot.payload.id;   
        console.log(rol);

        if(rol.estado == "aceptado"){
          this.enviarById(rol.userId,titulo,mensaje);
        }    
      }
      sub.unsubscribe();          
    })
  }

  private enviarHttp(token,titulo,mensaje){
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': 'key='+environment.firebase.claveServidor
    });   
 
    let options = {
      headers: this.httpHeaders
    };  

    let body = {
      "notification": {
          "title": titulo,
          "body": mensaje
      },
      "to": token
      }

    console.log(body);

    return this.httpClient.post("https://fcm.googleapis.com/fcm/send",body, options) .pipe(
      retry(0),
      catchError(this.handleError)
    );

  }


  // Handle API errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', JSON.parse(error.error.message));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    var mensaje = "Ocurrió un error, por favor intente más tarde";
    if(error.status == 0){
      mensaje = "Error al conectar con el servidor, por favor verifique su conexión a internet";        
    }

    return throwError(mensaje);
  };

  
}
