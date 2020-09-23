

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
    private constructor(){
        this.tmp_cnt=0;
        this.codigo='';
        this.label_cnt=0;
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