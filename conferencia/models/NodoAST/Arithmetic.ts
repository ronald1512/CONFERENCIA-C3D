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
        
        //aqui hacen falta todas las validaciones...
        const kd=KeepData.getInstance();
        const T1=kd.newTemp();
        kd.addCode(kd.twoChilds(T1, left.temporal, this.tipo, right.temporal));
        return new Retorno(T1);
    }

    public obtenerAscendente(padre: number): void {
        const kd=KeepData.getInstance();
        const este=kd.getHashCode();
        kd.addASTCode(kd.genDotName(este, 'expr'));
        kd.addASTCode(kd.genRelation(padre, este));
        this.izquierdo.obtenerAscendente(este);
        const signo=kd.getHashCode();
        kd.addASTCode(kd.genDotName(signo, this.tipo));
        kd.addASTCode(kd.genRelation(este, signo));
        this.derecho.obtenerAscendente(este);
    }
    
}

export enum TipoA{
    MAS ='+',
    MENOS='-', 
    POR='*', 
    DIV='/'
}