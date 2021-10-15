import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/Services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AfipInterceptorService implements HttpInterceptor {

  constructor(
    private toastService:ToastService,
    ) {}

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err)=>this.handleError(err))
        )
    }

    public handleError(error:HttpErrorResponse):Observable<HttpEvent<any>> {
      alert("!!!!")
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", JSON.parse(error.error.message))
            alert(error.error.message)
        }
   
        if (error.status === 0) {      
           // this.toastService.mensaje("¡Ups!", "No hay conexión a internet.")
        }   
        
        if (error.status === 500) {
          this.toastService.mensaje("Error en servidores", "")
      } 

        if (error.status === 422) {
            let mensaje = ""
            Object.keys(error.error.errors).forEach(key=> {
                mensaje += error.error.errors[key][0] + "\n"        
            })
            this.toastService.mensaje(error.error.message, mensaje)
        } 

        if (error.status > 499) {
            console.log(error)
            this.toastService.alert("Error",error.error.message)
        } 
   
        return throwError(error)
    }
}
