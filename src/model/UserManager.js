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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./User");
var UserDb_1 = require("./UserDb");
var UserManager = /** @class */ (function () {
    function UserManager() {
        this.userDb = new UserDb_1.default();
    }
    UserManager.prototype.register = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var existingUser, highestId, user;
            var username = _b.username, password = _b.password;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!username || !password) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "Felaktig input",
                                }];
                        }
                        return [4 /*yield*/, this.userDb.load({ username: username })];
                    case 1:
                        existingUser = _c.sent();
                        if (existingUser) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "User finns redan",
                                }];
                        }
                        highestId = Math.max.apply(Math, __spreadArray(__spreadArray([], this.userDb.users.map(function (user) { return user.id; }), false), [0], false));
                        user = new User_1.default(highestId + 1, username, password);
                        return [4 /*yield*/, this.userDb.save(user)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: "Användare skapad",
                            }];
                }
            });
        });
    };
    UserManager.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!username || !password) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "Felaktig input",
                                }];
                        }
                        return [4 /*yield*/, this.userDb.load({ username: username })];
                    case 1:
                        user = _a.sent();
                        if (user && user.username === username && user.password === password) {
                            this.currentUser = user;
                            return [2 /*return*/, {
                                    success: true,
                                    message: "Login Successful",
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "Felaktigt användarnamn eller lösenord",
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserManager.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userDb.load({ id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserManager.prototype.updateUser = function (id_1, _a) {
        return __awaiter(this, arguments, void 0, function (id, _b) {
            var user;
            var username = _b.username;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.currentUser || this.currentUser.id !== id) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "Not logged in as user",
                                }];
                        }
                        if (!username) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "Felaktig input",
                                }];
                        }
                        return [4 /*yield*/, this.userDb.load({ id: id })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "User finns inte",
                                }];
                        }
                        return [4 /*yield*/, this.userDb.updateUsername(id, username)];
                    case 2:
                        _c.sent();
                        this.currentUser.username = username;
                        return [2 /*return*/, {
                                success: true,
                                message: username,
                            }];
                }
            });
        });
    };
    return UserManager;
}());
exports.default = UserManager;
