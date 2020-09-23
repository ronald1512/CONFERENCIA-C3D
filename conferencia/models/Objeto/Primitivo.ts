import Objeto, { Tipo } from "./Objeto";


export default class Primitivo extends Objeto{
    public valor: Object;

    constructor(tipo: Tipo, valor: Object){
        super(tipo);
        this.valor=valor;
    }

    public getValue(): Object {
        throw new Error("Method not implemented.");
    }
    
}