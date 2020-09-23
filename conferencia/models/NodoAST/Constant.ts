import Retorno from "../Analisis/Retorno";
import Objeto from "../Objeto/Objeto";
import NodoAST from "./NodoAST";


export default class Constant extends NodoAST{
    
    public valor: Objeto;

    constructor(fila: number, columna: number, valor: Objeto){
        super(fila, columna);
        this.valor=valor;
    }
    public ejecutar(): Retorno {
        return new Retorno(this.valor.getValue().toString());   //aqui el temporal va a ser solamente el valor puntual
    }
}