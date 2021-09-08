"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var imageHelper_1 = require("./Helpers/imageHelper");
imageHelper_1.createScaledFolder();
var app = express_1.default();
var port = 3000;
app.use('/api', index_1.default);
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
exports.default = app;
