"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resume = exports.resumeSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.resumeSchema = new mongoose_1.default.Schema({
    account_id: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "Account",
    },
    technical_skill: {
        type: String,
        trim: true,
        default: null,
    },
    education: {
        type: String,
        trim: true,
        default: null,
    },
    personal_background: {
        type: String,
        trim: true,
        default: null,
    },
    experience: {
        type: String,
        trim: true,
        default: null,
    },
}, { timestamps: true });
exports.Resume = mongoose_1.default.model("Resume", exports.resumeSchema);
exports.default = exports.Resume;
