import Retorno from "../Analisis/Retorno";


export default abstract class NodoAST {
    public fila: number;
    public columna: number;

    constructor(fila: number, columna: number){
        this.fila=fila;
        this.columna=columna;
    }

    public abstract ejecutar():Retorno;
    public abstract obtenerAscendente(padre:number):void;
}