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
const path_1 = require("path");
const vamtiger_get_path_data_1 = require("vamtiger-get-path-data");
const vamtiger_create_directory_recursive_1 = require("vamtiger-create-directory-recursive");
const vamtiger_copy_file_1 = require("vamtiger-copy-file");
function default_1({ path: currentPath, archiveFolder, folderPath: sourceFolderPath }) {
    return __awaiter(this, void 0, void 0, function* () {
        const pathData = yield vamtiger_get_path_data_1.default(currentPath);
        const filePath = pathData.isFile() && currentPath;
        const archiveFilePath = filePath && filePath.replace(sourceFolderPath, archiveFolder);
        const folderPath = archiveFilePath && path_1.dirname(archiveFilePath) || currentPath.replace(sourceFolderPath, archiveFolder);
        if (folderPath) {
            yield vamtiger_create_directory_recursive_1.default({
                path: folderPath
            });
        }
        if (filePath && archiveFilePath) {
            yield vamtiger_copy_file_1.default({
                source: filePath,
                destination: archiveFilePath
            });
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=archive-path.js.map