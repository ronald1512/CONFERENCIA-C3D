import KeepData from "../Analisis/KeepData";
import Retorno from "../Analisis/Retorno";
import NodoAST from "./NodoAST";


/**
 * Clase para el manejo de expresiones aritmeticas
 */
export default class Arithmetic extends NodoAST{
    public derecho: NodoAST;
    public izquierdo: NodoAST;
    public tipo: TipoA;
    constructor(fila: number, columna: number, izquierdo: NodoAST, tipo: TipoA, derecho: NodoAST){
        super(fila,columna);
        this.izquierdo=izquierdo;
        this.derecho=derecho;
        this.tipo=tipo;
    }
    public ejecutar(): Retorno {
        const left = this.izquierdo.ejecutar(); 
        const right = this.derecho.ejecutar();
        return this.suma(left,right);
    }

    private suma(left: Retorno, right: Retorno):Retorno{
        const kd=KeepData.getInstance();
        const T1=left.temporal+'+'+right.temporal;
        kd.addCode(kd.twoChilds(T1, left.temporal, '+', right.temporal));
        return new Retorno(T1);
    }
    
}

export enum TipoA{
    MAS ='+',
    MENOS='-', 
    POR='*', 
    DIV='/'
}