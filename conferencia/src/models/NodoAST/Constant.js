"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var KeepData_1 = __importDefault(require("../Analisis/KeepData"));
var Retorno_1 = __importDefault(require("../Analisis/Retorno"));
var NodoAST_1 = __importDefault(require("./NodoAST"));
var Primitivo_1 = __importDefault(require("../Objeto/Primitivo"));
var Constant = /** @class */ (function (_super) {
    __extends(Constant, _super);
    function Constant(fila, columna, valor) {
        var _this = _super.call(this, fila, columna) || this;
        _this.valor = valor;
        return _this;
    }
    Constant.prototype.ejecutar = function () {
        return new Retorno_1.default(this.valor.getValue().toString()); //aqui el temporal va a ser solamente el valor puntual
    };
    Constant.prototype.obtenerAscendente = function (padre) {
        var kd = KeepData_1.default.getInstance();
        var este = kd.getHashCode(); //el hashcode de esta expresion
        var hijo = kd.getHashCode(); //el hashcode del valor que almacena
        var otroPadre = kd.getHashCode();
        //kd.addASTCode(kd.genDotName(este,this.valor.tipo));
        kd.addASTCode(kd.genDotName(este, 'constant'));
        kd.addASTCode(kd.genDotName(otroPadre, 'expr'));
        kd.addASTCode(kd.genRelation(padre, otroPadre));
        kd.addASTCode(kd.genRelation(otroPadre, este));
        if (this.valor instanceof Primitivo_1.default) {
            var contenido = this.valor.valor + '';
            contenido.replace("\"", "\\\"");
            kd.addASTCode(kd.genDotName(hijo, contenido));
        }
        else {
            kd.addASTCode(kd.genDotName(hijo, '-1'));
        }
        kd.addASTCode(kd.genRelation(este, hijo));
    };
    return Constant;
}(NodoAST_1.default));
exports.default = Constant;
