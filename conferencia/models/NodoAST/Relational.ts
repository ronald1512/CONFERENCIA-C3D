import KeepData from "../Analisis/KeepData";
import Retorno from "../Analisis/Retorno";
import NodoAST from "./NodoAST";


/**
 * Clase para el manejo de expresiones aritmeticas
 */
export default class Logical extends NodoAST {
    public derecho: NodoAST;
    public izquierdo: NodoAST;
    public tipo: TipoR;
    constructor(fila: number, columna: number, izquierdo: NodoAST, tipo: TipoR, derecho: NodoAST) {
        super(fila, columna);
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.tipo = tipo;
    }
    public ejecutar(): Retorno {
        const left = this.izquierdo.ejecutar();
        const right = this.derecho.ejecutar();

        //aqui hacen falta todas las validaciones...
        switch (this.tipo) {
            case "==":
                return this.IGIG(left, right);
            case "!=":
                return this.DIFDE(left, right);
            case ">":
                return this.MAY(left, right);
            default: //<
                return this.MEN(left, right);
        }
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

    public IGIG(left: Retorno, right: Retorno): Retorno {
        const kd = KeepData.getInstance();
        const T1 = kd.newTemp();
        const L1 = kd.newLabel();
        const L2 = kd.newLabel();
        const L3 = kd.newLabel();
        kd.addCode(kd.genIf(left.temporal, '==', right.temporal, L1));
        kd.addCode(kd.genJump(L3));
        kd.addCode(L1+':');
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(kd.genJump(L2));

        kd.addCode(L3+':');
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(L2+':');
        return new Retorno(T1);
    }

    public DIFDE(left: Retorno, right: Retorno): Retorno {
        const kd = KeepData.getInstance();
        const T1 = kd.newTemp();
        const L1 = kd.newLabel();
        const L2 = kd.newLabel();
        const L3 = kd.newLabel();
        kd.addCode(kd.genIf(left.temporal, '<>', right.temporal, L1));
        kd.addCode(kd.genJump(L3));
        kd.addCode(L1+':');
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(kd.genJump(L2));

        kd.addCode(L3+':');
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(L2+':');
        return new Retorno(T1);
    }

    public MAY(left: Retorno, right: Retorno): Retorno {
        const kd = KeepData.getInstance();
        const T1 = kd.newTemp();
        const L1 = kd.newLabel();
        const L2 = kd.newLabel();
        const L3 = kd.newLabel();
        kd.addCode(kd.genIf(left.temporal, '>', right.temporal, L1));
        kd.addCode(kd.genJump(L3));
        kd.addCode(L1+':');
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(kd.genJump(L2));

        kd.addCode(L3+':');
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(L2+':');
        return new Retorno(T1);
    }
    public MEN(left: Retorno, right: Retorno): Retorno {
        const kd = KeepData.getInstance();
        const T1 = kd.newTemp();
        const L1 = kd.newLabel();
        const L2 = kd.newLabel();
        const L3 = kd.newLabel();
        kd.addCode(kd.genIf(left.temporal, '<', right.temporal, L1));
        kd.addCode(kd.genJump(L3));
        kd.addCode(L1+':');
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(kd.genJump(L2));

        kd.addCode(L3+':');
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(L2+':');
        return new Retorno(T1);
    }

}

export enum TipoR {
    IGIG = '==',
    DIFDE = '!=',
    MEN = '<',
    MAY = '>'
}