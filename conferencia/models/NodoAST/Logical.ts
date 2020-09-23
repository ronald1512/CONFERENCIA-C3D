import KeepData from "../Analisis/KeepData";
import Retorno from "../Analisis/Retorno";
import NodoAST from "./NodoAST";


/**
 * Clase para el manejo de expresiones aritmeticas
 */
export default class Logical extends NodoAST{
    public derecho: NodoAST;
    public izquierdo: NodoAST;
    public tipo: TipoL;
    constructor(fila: number, columna: number, izquierdo: NodoAST, tipo: TipoL, derecho: NodoAST){
        super(fila,columna);
        this.izquierdo=izquierdo;
        this.derecho=derecho;
        this.tipo=tipo;
    }
    public ejecutar(): Retorno {
        const left = this.izquierdo.ejecutar(); 
        const right = this.derecho.ejecutar();
        
        //aqui hacen falta todas las validaciones...
        if(this.tipo==TipoL.AND){
            return this.AND(left, right);
        }else{
            return this.OR(left, right);
        }
    }

    public obtenerAscendente(padre: number): void {
        const kd=KeepData.getInstance();
        const este=kd.getHashCode();
        kd.addASTCode(kd.genDotName(este, this.tipo))
        kd.addASTCode(kd.genRelation(padre, este));
        this.izquierdo.obtenerAscendente(este);
        this.derecho.obtenerAscendente(este);
    }

    public AND (left: Retorno, right:Retorno):Retorno{
        const kd=KeepData.getInstance();
        const T1=kd.newTemp();
        const L1=kd.newLabel();
        const L2=kd.newLabel();

        kd.addCode(kd.genIf(left.temporal,'==', '0', L1));
        kd.addCode(kd.genIf(right.temporal,'==', '0', L1));
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(kd.genJump(L2));
        kd.addCode(L1+':');
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(L2+':');
        return new Retorno(T1);
    }

    public OR (left: Retorno, right:Retorno):Retorno{
        const kd=KeepData.getInstance();
        const T1=kd.newTemp();
        const L1=kd.newLabel();
        const L2=kd.newLabel();

        kd.addCode(kd.genIf(left.temporal,'==', '1', L1));
        kd.addCode(kd.genIf(right.temporal,'==', '1', L1));
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(kd.genJump(L2));
        kd.addCode(L1+':');
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(L2+':');
        return new Retorno(T1);
    }
    
}

export enum TipoL{
    AND='&&',
    OR ='||', 
}