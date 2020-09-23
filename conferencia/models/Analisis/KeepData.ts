

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
    private constructor(){
        this.tmp_cnt=0;
        this.codigo='';
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
}