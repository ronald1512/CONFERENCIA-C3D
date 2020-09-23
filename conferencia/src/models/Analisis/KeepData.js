"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeepData = /** @class */ (function () {
    function KeepData() {
    }
    KeepData.getInstance = function () {
        if (!KeepData.instance) {
            KeepData.instance = new KeepData();
        }
        return KeepData.instance;
    };
    return KeepData;
}());
exports.default = KeepData;
