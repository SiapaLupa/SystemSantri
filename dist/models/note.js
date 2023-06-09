"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.noteSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.noteSchema = new mongoose_1.default.Schema({
    learning_id: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "Learning",
    },
    note: {
        type: String,
        trim: true,
        require: [true, "Please type in your message."],
    },
});
exports.Note = mongoose_1.default.model("Note", exports.noteSchema);
exports.default = exports.Note;
