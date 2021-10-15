import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class NavegacionParametrosService {

  public param: any;

  public parametroSubject = new BehaviorSubject<any>("");

  constructor() { }

  public getParam(){ 
    return this.parametroSubject.asObservable();
  }

  public setParam(param:any){
    this.parametroSubject.next(param);
  }
}
