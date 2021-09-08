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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.getCreatedFileName = exports.createScaledFolder = exports.validateData = exports.processImageRequest = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var strings_1 = require("./strings");
var filename;
var extension = 'jpg';
var format = extension;
var width;
var height;
var baseFilePath;
var newFilePath;
var getResizedImage = function (filepath, width, height, newFilePath, format) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Creating New Resized File: ' + newFilePath);
                return [4 /*yield*/, sharp_1.default(filepath)
                        .resize({
                        width: parseInt(width),
                        height: parseInt(height)
                    })
                        .toFormat(format)
                        .toFile(newFilePath)];
            case 1:
                _a.sent();
                console.log('Created File');
                return [2 /*return*/];
        }
    });
}); };
function splitFilename(input) {
    if (input.includes('.')) {
        var splitFilename_1 = input.split('.');
        extension = splitFilename_1[splitFilename_1.length - 1];
        filename = input.replace('.' + extension, '');
    }
    else {
        filename = "" + input;
        extension = 'jpg';
    }
    console.log("Filename without extension: " + filename);
    console.log("Old Extension: " + extension);
}
function processImageRequest(inputName, inputWidth, inputHeight, inputConversionFormat) {
    return __awaiter(this, void 0, void 0, function () {
        var fileStatus;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    width = inputWidth;
                    height = inputHeight;
                    fileStatus = strings_1.strings.errorFileConversion;
                    if (!strings_1.strings.validFormatTypes.includes(inputConversionFormat)) {
                        fileStatus = strings_1.strings.errorIncompatibleType;
                    }
                    splitFilename(inputName);
                    setConversionFormat(inputConversionFormat);
                    configureFilePaths();
                    if (!(fileStatus !== strings_1.strings.errorIncompatibleType && strings_1.strings.validFormatTypes.includes(extension))) return [3 /*break*/, 4];
                    fileStatus = strings_1.strings.errorFileConversion; //if there is an error later, this will not get set to success.
                    console.log('Searching for existing file: ' + newFilePath);
                    if (!fs_1.default.existsSync(newFilePath)) return [3 /*break*/, 1];
                    fileStatus = strings_1.strings.successCached;
                    console.log(strings_1.strings.resizedFileFound);
                    return [3 /*break*/, 4];
                case 1:
                    console.log('Exisitng resized file not found.');
                    console.log("Searching for original file: " + baseFilePath);
                    if (!!fs_1.default.existsSync(baseFilePath)) return [3 /*break*/, 2];
                    fileStatus = strings_1.strings.errorOriginalFileNotFound;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, getResizedImage(baseFilePath, width, height, newFilePath, format)];
                case 3:
                    _a.sent();
                    fileStatus = strings_1.strings.successNew;
                    _a.label = 4;
                case 4: return [2 /*return*/, [fileStatus, newFilePath]];
            }
        });
    });
}
exports.processImageRequest = processImageRequest;
function validateData(name, width, height, format) {
    var validationStatus = '';
    if (!strings_1.strings.filenameRegEx.test(name))
        validationStatus += '-Invalid filename';
    if (!strings_1.strings.integerRegEx.test(width))
        validationStatus += strings_1.strings.invalidWidth;
    if (!strings_1.strings.integerRegEx.test(height))
        validationStatus += strings_1.strings.invalidHeight;
    if (format != undefined && !strings_1.strings.validFormatTypes.includes(format))
        validationStatus += "-Invalid format: " + format;
    if (validationStatus == '') {
        validationStatus = strings_1.strings.validatedSuccess;
    }
    //console.log(`Request Validation Status: ${validationStatus}`);
    return validationStatus;
}
exports.validateData = validateData;
function createScaledFolder() {
    var imagePath = path_1.default.resolve(strings_1.strings.imagesFolder);
    var scaledPath = path_1.default.join(imagePath, strings_1.strings.scaledFolder);
    if (!fs_1.default.existsSync(scaledPath)) {
        fs_1.default.mkdirSync(scaledPath);
    }
}
exports.createScaledFolder = createScaledFolder;
function setConversionFormat(conversionFormat) {
    if (conversionFormat !== '' && conversionFormat != '') {
        format = conversionFormat;
    }
    else {
        format = extension;
    }
    console.log("New Format: " + format);
}
function configureFilePaths() {
    var imagePath = path_1.default.resolve(strings_1.strings.imagesFolder);
    var newFileName = filename + "_" + width + "_" + height + "." + format;
    baseFilePath = path_1.default.join(imagePath, filename + "." + extension);
    newFilePath = path_1.default.join(imagePath, strings_1.strings.scaledFolder, newFileName);
}
function getCreatedFileName() {
    return newFilePath;
}
exports.getCreatedFileName = getCreatedFileName;
function clearCache() {
    fs_1.default.rmdirSync(path_1.default.resolve("images/scaled"), { recursive: true });
}
exports.clearCache = clearCache;
