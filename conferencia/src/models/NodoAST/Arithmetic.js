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
exports.TipoA = void 0;
var KeepData_1 = __importDefault(require("../Analisis/KeepData"));
var Retorno_1 = __importDefault(require("../Analisis/Retorno"));
var NodoAST_1 = __importDefault(require("./NodoAST"));
/**
 * Clase para el manejo de expresiones aritmeticas
 */
var Arithmetic = /** @class */ (function (_super) {
    __extends(Arithmetic, _super);
    function Arithmetic(fila, columna, izquierdo, tipo, derecho) {
        var _this = _super.call(this, fila, columna) || this;
        _this.izquierdo = izquierdo;
        _this.derecho = derecho;
        _this.tipo = tipo;
        return _this;
    }
    Arithmetic.prototype.ejecutar = function () {
        var left = this.izquierdo.ejecutar();
        var right = this.derecho.ejecutar();
        //aqui hacen falta todas las validaciones...
        var kd = KeepData_1.default.getInstance();
        var T1 = kd.newTemp();
        kd.addCode(kd.twoChilds(T1, left.temporal, this.tipo, right.temporal));
        return new Retorno_1.default(T1);
    };
    Arithmetic.prototype.obtenerAscendente = function (padre) {
        var kd = KeepData_1.default.getInstance();
        var este = kd.getHashCode();
        kd.addASTCode(kd.genDotName(este, this.tipo));
        kd.addASTCode(kd.genRelation(padre, este));
        this.izquierdo.obtenerAscendente(este);
        this.derecho.obtenerAscendente(este);
    };
    return Arithmetic;
}(NodoAST_1.default));
exports.default = Arithmetic;
var TipoA;
(function (TipoA) {
    TipoA["MAS"] = "+";
    TipoA["MENOS"] = "-";
    TipoA["POR"] = "*";
    TipoA["DIV"] = "/";
})(TipoA = exports.TipoA || (exports.TipoA = {}));
