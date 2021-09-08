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
var fs_1 = __importDefault(require("fs"));
var imageHelper_1 = require("../Helpers/imageHelper");
var strings_1 = require("../Helpers/strings");
describe('Request Validation Tests', function () {
    var name = 'encenadaport.jpg';
    var width = '900';
    var height = '600';
    var format = 'png';
    it('Expect success with default values', function () {
        expect(imageHelper_1.validateData(name, width, height, format)).toEqual(strings_1.strings.validatedSuccess);
    });
    it('Expect invalid width with negative width', function () {
        expect(imageHelper_1.validateData(name, '-600', height, format)).toEqual(strings_1.strings.invalidWidth);
    });
    it('Expect invalid height with NaN height', function () {
        expect(imageHelper_1.validateData(name, width, 'height', format)).toEqual(strings_1.strings.invalidHeight);
    });
});
describe('Process Image Tests', function () {
    it('Expect new resized file created after cache cleared', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Removing Cache Directory and Contents');
                    imageHelper_1.clearCache();
                    imageHelper_1.createScaledFolder();
                    return [4 /*yield*/, imageHelper_1.processImageRequest('fjord.jpg', '600', '800', 'jpg')];
                case 1:
                    _a.sent();
                    expect(fs_1.default.existsSync(imageHelper_1.getCreatedFileName())).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Expect cached file from same request', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, r, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageHelper_1.processImageRequest('fjord.jpg', '600', '800', 'jpg')];
                case 1:
                    response = _a.sent();
                    expect(fs_1.default.existsSync(imageHelper_1.getCreatedFileName())).toEqual(true);
                    r = response;
                    status = r[0];
                    expect(status === strings_1.strings.successCached);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Expect new file with different format type', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, r, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageHelper_1.processImageRequest('fjord.jpg', '600', '800', 'png')];
                case 1:
                    response = _a.sent();
                    expect(fs_1.default.existsSync(imageHelper_1.getCreatedFileName())).toEqual(true);
                    r = response;
                    status = r[0];
                    expect(status === strings_1.strings.successNew);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Expect file not founderror', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, r, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageHelper_1.processImageRequest('fjords.jpg', '600', '800', 'jpg')];
                case 1:
                    response = _a.sent();
                    r = response;
                    status = r[0];
                    expect(status === strings_1.strings.errorOriginalFileNotFound);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Expect incompatible type error from conversion type', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, r, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageHelper_1.processImageRequest('fjord.jpg', '600', '800', 'jpg2')];
                case 1:
                    response = _a.sent();
                    r = response;
                    status = r[0];
                    expect(status === strings_1.strings.errorIncompatibleType);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Expect incompatible type error from original type', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, r, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, imageHelper_1.processImageRequest('fjord.jpg2', '600', '800', 'jpg')];
                case 1:
                    response = _a.sent();
                    r = response;
                    status = r[0];
                    expect(status === strings_1.strings.errorIncompatibleType);
                    return [2 /*return*/];
            }
        });
    }); });
});
