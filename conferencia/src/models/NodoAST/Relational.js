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
exports.TipoR = void 0;
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
    };
    Logical.prototype.obtenerAscendente = function (padre) {
        var kd = KeepData_1.default.getInstance();
        var este = kd.getHashCode();
        kd.addASTCode(kd.genDotName(este, 'expr'));
        kd.addASTCode(kd.genRelation(padre, este));
        this.izquierdo.obtenerAscendente(este);
        var signo = kd.getHashCode();
        kd.addASTCode(kd.genDotName(signo, this.tipo));
        kd.addASTCode(kd.genRelation(este, signo));
        this.derecho.obtenerAscendente(este);
    };
    Logical.prototype.IGIG = function (left, right) {
        var kd = KeepData_1.default.getInstance();
        var T1 = kd.newTemp();
        var L1 = kd.newLabel();
        var L2 = kd.newLabel();
        var L3 = kd.newLabel();
        kd.addCode(kd.genIf(left.temporal, '==', right.temporal, L1));
        kd.addCode(kd.genJump(L3));
        kd.addCode(L1 + ':');
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(kd.genJump(L2));
        kd.addCode(L3 + ':');
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(L2 + ':');
        return new Retorno_1.default(T1);
    };
    Logical.prototype.DIFDE = function (left, right) {
        var kd = KeepData_1.default.getInstance();
        var T1 = kd.newTemp();
        var L1 = kd.newLabel();
        var L2 = kd.newLabel();
        var L3 = kd.newLabel();
        kd.addCode(kd.genIf(left.temporal, '<>', right.temporal, L1));
        kd.addCode(kd.genJump(L3));
        kd.addCode(L1 + ':');
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(kd.genJump(L2));
        kd.addCode(L3 + ':');
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(L2 + ':');
        return new Retorno_1.default(T1);
    };
    Logical.prototype.MAY = function (left, right) {
        var kd = KeepData_1.default.getInstance();
        var T1 = kd.newTemp();
        var L1 = kd.newLabel();
        var L2 = kd.newLabel();
        var L3 = kd.newLabel();
        kd.addCode(kd.genIf(left.temporal, '>', right.temporal, L1));
        kd.addCode(kd.genJump(L3));
        kd.addCode(L1 + ':');
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(kd.genJump(L2));
        kd.addCode(L3 + ':');
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(L2 + ':');
        return new Retorno_1.default(T1);
    };
    Logical.prototype.MEN = function (left, right) {
        var kd = KeepData_1.default.getInstance();
        var T1 = kd.newTemp();
        var L1 = kd.newLabel();
        var L2 = kd.newLabel();
        var L3 = kd.newLabel();
        kd.addCode(kd.genIf(left.temporal, '<', right.temporal, L1));
        kd.addCode(kd.genJump(L3));
        kd.addCode(L1 + ':');
        kd.addCode(kd.oneChild(T1, '1'));
        kd.addCode(kd.genJump(L2));
        kd.addCode(L3 + ':');
        kd.addCode(kd.oneChild(T1, '0'));
        kd.addCode(L2 + ':');
        return new Retorno_1.default(T1);
    };
    return Logical;
}(NodoAST_1.default));
exports.default = Logical;
var TipoR;
(function (TipoR) {
    TipoR["IGIG"] = "==";
    TipoR["DIFDE"] = "!=";
    TipoR["MEN"] = "<";
    TipoR["MAY"] = ">";
})(TipoR = exports.TipoR || (exports.TipoR = {}));
