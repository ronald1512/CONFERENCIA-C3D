"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeepData = /** @class */ (function () {
    function KeepData() {
        this.tmp_cnt = 0;
        this.codigo = '';
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
    return KeepData;
}());
exports.default = KeepData;
