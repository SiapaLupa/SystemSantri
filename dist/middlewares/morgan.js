"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../utils/logger"));
const stream = {
    // Use the http severity
    write: (message) => logger_1.default.http(message),
};
const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};
const morganMiddleware = (0, morgan_1.default)(
// Define message format string (this is the default one).
// The message format is made from tokens, and each token is
// defined inside the Morgan library.
// You can create your custom token to show what do you want from a request.
":remote-addr :method :url :status :res[content-length] - :response-time ms", 
// Options: in this case, I overwrote the stream and the skip logic.
// See the methods above.
{ stream, skip });
module.exports = morganMiddleware;
