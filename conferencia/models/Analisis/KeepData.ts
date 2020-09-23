

export default class  KeepData{
    private static instance: KeepData;

    public static getInstance(){
        if(!KeepData.instance){
            KeepData.instance=new KeepData();
        }
        return KeepData.instance;
    }
    public codigo:string;   //variable para almacenar el código generado
    public tmp_cnt:number;  //variable para llevar el conteo de temporales
    public label_cnt:number;  //variable para llevar el conteo de ETIQUETAS
    public node_cnt:number; //con esata variable se manejaran los identificadores de cada nodo en el AST
    public ast_code:string;
    private constructor(){
        this.tmp_cnt=0;
        this.codigo='';
        this.label_cnt=0;
        this.node_cnt=1;    //empieza en 1 porque 'inicio' es el 0
        this.ast_code='';
    }


    public resetAll(){
        KeepData.instance=new KeepData();
    }


    /**
     * Concatena codigo a el atributo 'codigo'
     *
     * @param {string} cad
     * @memberof KeepData
     */
    public addCode(cad: string){
        this.codigo+=cad+'\n';
    }


    /**
     * 
     * @param cad cadena a concatenar
     */
    public addASTCode(cad:string){
        this.ast_code+='\n\t'+cad;
    }



    public genDotName(raiz:number,nombre:string):string{
        return raiz+' [label="'+nombre+'"];'
    }

    public genRelation(left:number, right:number):string{
        return left+' -> '+right ;
    }


    public getFinalASTCode(){
        let salida='digraph G {\n\trankdir=TD;\n\t0 [label="inicio"];';

        salida+=this.ast_code;

        salida+='\n}';
        return salida;
    }






    /**
     * Sirve para simular el hashcode de cada nodo del ast
     *
     * @returns {number}
     * @memberof KeepData
     */
    public getHashCode():number{
        return this.node_cnt++; 
    }



    /**
     * Retorna un string de la forma:
     *  arg0=arg1;
     * @param {string} arg0
     * @param {string} arg1
     * @returns
     * @memberof KeepData
     */
    public oneChild(arg0: string, arg1: string){
        return arg0 + ' = ' + arg1+';';
    }

    /**
     * Retorna un string de la forma:
     *  arg0=arg1 op arg2;
     * @param {string} arg0
     * @param {string} arg1
     * @param {string} op
     * @param {string} arg2
     * @returns
     * @memberof KeepData
     */
    public twoChilds(arg0: string, arg1: string, op: string, arg2: string){
        return arg0+' = '+arg1+' '+op+' '+arg2+';';
    }


    /**
     * Funcion para generar temporales
     */
    public newTemp():string{
        let nuevo='T'+this.tmp_cnt++;
        return nuevo;
    }


    /**
     * Funcion para generar etiquetas
     */
    public newLabel():string{
        let nuevo='L'+this.label_cnt++;
        return nuevo;
    }

    /** 
     * Genera un salto hacia la etiqueta 'label' especificada:
     *  goto 'label';
     * @param {string} label
     * @returns {string}
     * @memberof KeepData
     */
    public genJump(label: string):string{
        return 'goto '+label+';';
    }

    public genIf(arg0: string, op: string, arg1:string, label:string): string{
        return 'if ( '+arg0+ ' '+ op+ ' '+arg1+' ) goto '+label+';';
    }
    
}