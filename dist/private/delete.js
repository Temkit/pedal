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
Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = require("./../services/init");
var tools_1 = require("../services/tools");
var DeleteModule = (function () {
    function DeleteModule() {
        var _this = this;
        this.batchDeleteParams = {};
        this.deleteAll = function (key) { return __awaiter(_this, void 0, void 0, function () {
            var table, chunks, dataToDeleteParams, data, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        table = {};
                        chunks = [];
                        table[init_1.InitModule.getInstance().config.Table] = [];
                        this.batchDeleteParams["RequestItems"] = table;
                        dataToDeleteParams = this.queryFactory(key);
                        return [4, this.getDataToDelete(dataToDeleteParams)];
                    case 1:
                        data = _a.sent();
                        chunks = this.tools.chunkArray(data.Items, 24);
                        chunks = chunks.map(function (chunk) {
                            chunk = chunk.map(function (item) {
                                var key = {};
                                key[init_1.InitModule.getInstance().config.Key.PrimaryKey.name] =
                                    item[init_1.InitModule.getInstance().config.Key.PrimaryKey.name];
                                if (init_1.InitModule.getInstance().config.Key.SortKey &&
                                    item.hasOwnProperty(init_1.InitModule.getInstance().config.Key.SortKey.name)) {
                                    key[init_1.InitModule.getInstance().config.Key.SortKey.name] =
                                        item[init_1.InitModule.getInstance().config.Key.SortKey.name];
                                }
                                item = {
                                    DeleteRequest: {
                                        Key: key
                                    }
                                };
                                return item;
                            });
                            _this.batchDeleteParams.RequestItems[init_1.InitModule.getInstance().config.Table] = chunk;
                            console.log(JSON.stringify(_this.batchDeleteParams, null, 2));
                            init_1.InitModule.getInstance().dynamodb.batchWriteItem(_this.batchDeleteParams, function (err, data) {
                                if (err)
                                    console.log(err, err.stack);
                                else
                                    console.log(data);
                            });
                            return _this.batchDeleteParams;
                        });
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); };
        this.getDataToDelete = function (params) {
            var query = new Promise(function (resolve, reject) {
                init_1.InitModule.getInstance().dynamodb.query(params, function (error, data) {
                    if (error)
                        reject(error);
                    resolve(data);
                });
            });
            return query;
        };
        this.queryFactory = function (key) {
            var typedPrimarykey = {};
            var typedSortKey = {};
            typedPrimarykey[init_1.InitModule.getInstance().config.Key.PrimaryKey.type] =
                key[init_1.InitModule.getInstance().config.Key.PrimaryKey.name];
            var KeyConditionExpression = "#" +
                init_1.InitModule.getInstance().config.Key.PrimaryKey.name +
                " = :" +
                init_1.InitModule.getInstance().config.Key.PrimaryKey.name;
            var ExpressionAttributeNames = {};
            ExpressionAttributeNames["#" + init_1.InitModule.getInstance().config.Key.PrimaryKey.name] = init_1.InitModule.getInstance().config.Key.PrimaryKey.name;
            var ExpressionAttributeValues = {};
            var TypedExpressionAttributeValues = {};
            TypedExpressionAttributeValues[init_1.InitModule.getInstance().config.Key.PrimaryKey.type] = key[init_1.InitModule.getInstance().config.Key.PrimaryKey.name];
            ExpressionAttributeValues[":" + init_1.InitModule.getInstance().config.Key.PrimaryKey.name] = TypedExpressionAttributeValues;
            if (init_1.InitModule.getInstance().config.Key.SortKey &&
                key.hasOwnProperty(init_1.InitModule.getInstance().config.Key.SortKey.name)) {
                typedSortKey[init_1.InitModule.getInstance().config.Key.SortKey.type] =
                    key[init_1.InitModule.getInstance().config.Key.SortKey.name];
                KeyConditionExpression =
                    KeyConditionExpression +
                        " AND #" +
                        init_1.InitModule.getInstance().config.Key.SortKey.name +
                        " = :" +
                        init_1.InitModule.getInstance().config.Key.SortKey.name;
                ExpressionAttributeNames["#" + init_1.InitModule.getInstance().config.Key.SortKey.name] = init_1.InitModule.getInstance().config.Key.SortKey.name;
                var TypedExpressionAttributeValues_1 = {};
                TypedExpressionAttributeValues_1[init_1.InitModule.getInstance().config.Key.SortKey.type] = key[init_1.InitModule.getInstance().config.Key.SortKey.name];
                ExpressionAttributeValues[":" + init_1.InitModule.getInstance().config.Key.SortKey.name] = TypedExpressionAttributeValues_1;
            }
            return {
                TableName: init_1.InitModule.getInstance().config.Table,
                KeyConditionExpression: KeyConditionExpression,
                ExpressionAttributeNames: ExpressionAttributeNames,
                ExpressionAttributeValues: ExpressionAttributeValues
            };
        };
        this.tools = new tools_1.ToolsModule();
    }
    return DeleteModule;
}());
exports.DeleteModule = DeleteModule;
