import { Servicio } from './servicio';
import { Cliente } from './cliente';
import { DocumentReference } from 'angularfire2/firestore';
export class Subscripcion{
    public id ="";
    public clienteId =""; //necesario para la busqueda
    public clienteRef:DocumentReference;
    public servicioId=""; //necesario para la busqueda
    public servicioRef:DocumentReference;
    public planRef:DocumentReference;
    public proximoPago:any;
    public fechaInicio:any;
    public vendedorRef:DocumentReference;
    public vendedor_nombre= "";
    public tipo="";
    public dias="";
    public precio=0;
    public pagoAdelantado= "";
    public descipcion_venta= "";

    public cliente = {
        nombre:""
    }

    public servicio = {
        nombre:""
    }

    public plan = {
        precio:0,
        nombre:"",
        tipo:"",
        dias:""
    }
    
	constructor(
		public vendedorId:"", 
        public vendedorNombre:""
		){

    }
    
    public asignarValores(init?: Partial<Subscripcion>) {
        Object.assign(this, init);
    }
}

