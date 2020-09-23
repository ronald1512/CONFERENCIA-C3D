

export default abstract class Objeto {
    public tipo: Tipo;

    constructor(tipo: Tipo){
        this.tipo=tipo;
    }

    /**
     * Devuelve el valor del objeto (entero, decimal o boolean)
     * Es abstracto para cada clase hija lo modifique a su gusto
     */
    public abstract getValue(): Object;
}

export enum Tipo {
    INTEGER = 'INTEGER',
    DOUBLE = 'DOUBLE',
    BOOLEAN = 'BOOLEAN',
}