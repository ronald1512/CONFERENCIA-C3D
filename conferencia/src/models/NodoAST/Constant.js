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
var Retorno_1 = __importDefault(require("../Analisis/Retorno"));
var NodoAST_1 = __importDefault(require("./NodoAST"));
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
    return Constant;
}(NodoAST_1.default));
exports.default = Constant;
