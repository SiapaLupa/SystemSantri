"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../traits/errors");
function default_1(Model, key = "access_code") {
    return __awaiter(this, void 0, void 0, function* () {
        const { value } = yield Model.findOne({
            key,
        });
        if (!value) {
            throw new errors_1.NotFoundError("The Access Code configuration could not be found by the system. Please check your settings once more and try again.");
        }
        return value;
    });
}
exports.default = default_1;
