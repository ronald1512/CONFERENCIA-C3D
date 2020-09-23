
declare var require: any
class EditorController{
    public compilar(text:string){
        var parser = require('../models/J#/Analisis/grammar.js');
        var respuesta=parser.parse(text);  
        
    }
}