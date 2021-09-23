
import { MovimientoCtaCorriente } from './movimientoCtaCorriente';

export class CtaCorriente{
    public id ="";
    public comercioId= localStorage.getItem('comercio_seleccionadoId');   
    public nombre="";
    public coTitularesId=[];
    public montoActual=0;
    public montoTotal =0;

    public comercios = [];
    public clientes =[];


	constructor(
        public vendedorId:"", 
        public vendedorNombre:""
		){
    }
    
    public asignarValores(init?: Partial<CtaCorriente>) {
        Object.assign(this, init);
    }
}