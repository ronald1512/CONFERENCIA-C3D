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
exports.TipoL = void 0;
var KeepData_1 = __importDefault(require("../Analisis/KeepData"));
var Retorno_1 = __importDefault(require("../Analisis/Retorno"));
var NodoAST_1 = __importDefault(require("./NodoAST"));
/**
 * Clase para el manejo de expresiones aritmeticas
 */
var Logical = /** @class */ (function (_super) {
    __extends(Logical, _super);
    function Logical(fila, columna, izquierdo, tipo, derecho) {
        var _this = _super.call(this, fila, columna) || this;
        _this.izquierdo = izquierdo;
        _this.derecho = derecho;
        _this.tipo = tipo;
        return _this;
    }
    Logical.prototype.ejecutar = function () {
        var left = this.izquierdo.ejecutar();
        var right = this.derecho.ejecutar();
        //aqui hacen falta todas las validaciones...
        if (this.tipo == TipoL.AND) {
            return this.AND(left, right);
        }
        else {
            return this.OR(left, right);
        }
    };
    Logical.prototype.obtenerAscendente = function (padre) {
        var kd = KeepData_1.default.getInstance();
        var este = kd.getHashCode();
        kd.addASTCode(kd.genDotName(este, this.tipo));
        kd.addASTCode(kd.genRelation(padre, este));
        this.izquierdo.obtenerAscendente(este);
        this.derecho.obtenerAscendente(este);
    };
    Logical.prototype.AND = function (left, right) {
        var kd = KeepData_1.default.getInstance();
        var T1 = kd.newTemp();
        var L1 = kd.newLabel();
        var L2 = kd.newLabel();
        kd.addCode(kd.genIf(left.temporal, '==', '0', L1));
        kd.addCode(kd.genIf(right.temporal, '==', '0', L1));
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(kd.genJump(L2));
        kd.addCode(L1 + ':');
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(L2 + ':');
        return new Retorno_1.default(T1);
    };
    Logical.prototype.OR = function (left, right) {
        var kd = KeepData_1.default.getInstance();
        var T1 = kd.newTemp();
        var L1 = kd.newLabel();
        var L2 = kd.newLabel();
        kd.addCode(kd.genIf(left.temporal, '==', '1', L1));
        kd.addCode(kd.genIf(right.temporal, '==', '1', L1));
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(kd.genJump(L2));
        kd.addCode(L1 + ':');
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(L2 + ':');
        return new Retorno_1.default(T1);
    };
    return Logical;
}(NodoAST_1.default));
exports.default = Logical;
var TipoL;
(function (TipoL) {
    TipoL["AND"] = "&&";
    TipoL["OR"] = "||";
})(TipoL = exports.TipoL || (exports.TipoL = {}));
