import Objeto, { Tipo } from "./Objeto";


export default class Primitivo extends Objeto{
    public valor: Object;

    constructor(tipo: Tipo, valor: Object){
        super(tipo);
        this.valor=valor;
    }

    public getValue(): Object {
        if(this.tipo==Tipo.BOOLEAN){
            const res= this.valor.toString().toLowerCase() === 'true';
            return res?'1':'0';
        }else{
            return this.valor;
        }
    }
    
}