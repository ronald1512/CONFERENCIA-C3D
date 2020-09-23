"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeepData = /** @class */ (function () {
    function KeepData() {
        this.tmp_cnt = 0;
        this.codigo = '';
        this.label_cnt = 0;
        this.node_cnt = 1; //empieza en 1 porque 'inicio' es el 0
        this.ast_code = '';
    }
    KeepData.getInstance = function () {
        if (!KeepData.instance) {
            KeepData.instance = new KeepData();
        }
        return KeepData.instance;
    };
    KeepData.prototype.resetAll = function () {
        KeepData.instance = new KeepData();
    };
    /**
     * Concatena codigo a el atributo 'codigo'
     *
     * @param {string} cad
     * @memberof KeepData
     */
    KeepData.prototype.addCode = function (cad) {
        this.codigo += cad + '\n';
    };
    /**
     *
     * @param cad cadena a concatenar
     */
    KeepData.prototype.addASTCode = function (cad) {
        this.ast_code += '\n\t' + cad;
    };
    KeepData.prototype.genDotName = function (raiz, nombre) {
        return raiz + ' [label="' + nombre + '"];';
    };
    KeepData.prototype.genRelation = function (left, right) {
        return left + ' -> ' + right;
    };
    KeepData.prototype.getFinalASTCode = function () {
        var salida = 'digraph G {\n\trankdir=TD;\n\t0 [label="inicio"];';
        salida += this.ast_code;
        salida += '\n}';
        return salida;
    };
    /**
     * Sirve para simular el hashcode de cada nodo del ast
     *
     * @returns {number}
     * @memberof KeepData
     */
    KeepData.prototype.getHashCode = function () {
        return this.node_cnt++;
    };
    /**
     * Retorna un string de la forma:
     *  arg0=arg1;
     * @param {string} arg0
     * @param {string} arg1
     * @returns
     * @memberof KeepData
     */
    KeepData.prototype.oneChild = function (arg0, arg1) {
        return arg0 + ' = ' + arg1 + ';';
    };
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
    KeepData.prototype.twoChilds = function (arg0, arg1, op, arg2) {
        return arg0 + ' = ' + arg1 + ' ' + op + ' ' + arg2 + ';';
    };
    /**
     * Funcion para generar temporales
     */
    KeepData.prototype.newTemp = function () {
        var nuevo = 'T' + this.tmp_cnt++;
        return nuevo;
    };
    /**
     * Funcion para generar etiquetas
     */
    KeepData.prototype.newLabel = function () {
        var nuevo = 'L' + this.label_cnt++;
        return nuevo;
    };
    /**
     * Genera un salto hacia la etiqueta 'label' especificada:
     *  goto 'label';
     * @param {string} label
     * @returns {string}
     * @memberof KeepData
     */
    KeepData.prototype.genJump = function (label) {
        return 'goto ' + label + ';';
    };
    KeepData.prototype.genIf = function (arg0, op, arg1, label) {
        return 'if ( ' + arg0 + ' ' + op + ' ' + arg1 + ' ) goto ' + label + ';';
    };
    return KeepData;
}());
exports.default = KeepData;
