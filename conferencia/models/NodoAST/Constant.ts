import KeepData from "../Analisis/KeepData";
import Retorno from "../Analisis/Retorno";
import Objeto from "../Objeto/Objeto";
import NodoAST from "./NodoAST";
import Primitivo from '../Objeto/Primitivo'


export default class Constant extends NodoAST{
    
    public valor: Objeto;

    constructor(fila: number, columna: number, valor: Objeto){
        super(fila, columna);
        this.valor=valor;
    }
    public ejecutar(): Retorno {
        return new Retorno(this.valor.getValue().toString());   //aqui el temporal va a ser solamente el valor puntual
    }

    public obtenerAscendente(padre: number): void {
        const kd=KeepData.getInstance();
        const este=kd.getHashCode();    //el hashcode de esta expresion
        const hijo=kd.getHashCode();    //el hashcode del valor que almacena
        const otroPadre=kd.getHashCode();    
        //kd.addASTCode(kd.genDotName(este,this.valor.tipo));
        kd.addASTCode(kd.genDotName(este,'constant'));
        kd.addASTCode(kd.genDotName(otroPadre,'expr'));
        kd.addASTCode(kd.genRelation(padre, otroPadre));
        kd.addASTCode(kd.genRelation(otroPadre, este));
        if(this.valor instanceof Primitivo){
            let contenido=this.valor.valor+'';
            contenido.replace("\"", "\\\"");
            kd.addASTCode(kd.genDotName(hijo, contenido))
        }else{
            kd.addASTCode(kd.genDotName(hijo, '-1'));
        }
        kd.addASTCode(kd.genRelation(este, hijo));
    }
}