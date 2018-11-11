"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vamtiger_get_path_data_1 = require("vamtiger-get-path-data");
function default_1({ path: currentPath }) {
    return __awaiter(this, void 0, void 0, function* () {
        const pathData = yield vamtiger_get_path_data_1.default(currentPath);
        const filePath = pathData.isFile() && currentPath;
        return filePath;
    });
}
exports.default = default_1;
//# sourceMappingURL=get-file-path.js.map