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
const vamtiger_get_directory_content_1 = require("vamtiger-get-directory-content");
const vamtiger_get_directory_content_recursive_1 = require("vamtiger-get-directory-content-recursive");
const get_file_path_1 = require("./get-file-path");
function default_1({ folderPath, exclude, excludePattern }) {
    return __awaiter(this, void 0, void 0, function* () {
        const recursiveParams = recursive && {
            path: folderPath,
            classified: true
        };
        const excludeRegex = excludePattern && new RegExp(excludePattern);
        const directoryFileContent = !recursive && (yield vamtiger_get_directory_content_1.default(folderPath));
        const directoryFileContentPaths = directoryFileContent && directoryFileContent.map(entry => path_1.resolve(folderPath, entry));
        const currentDirectoryFilePaths = directoryFileContentPaths && (yield Promise.all(directoryFileContentPaths.map(currentPath => get_file_path_1.default({
            path: currentPath
        }))));
        const directoryFilePaths = currentDirectoryFilePaths && currentDirectoryFilePaths.filter(currentFilePath => currentFilePath);
        const directoryContent = (recursiveParams && (yield vamtiger_get_directory_content_recursive_1.default(recursiveParams)) || {});
        const keys = (directoryContent && Object.keys(directoryContent) || []);
        let key;
        let currentDirectoryContent;
        if (directoryFilePaths)
            directoryContent.file = directoryFilePaths;
        else if (directoryContent)
            for (key of keys) {
                currentDirectoryContent = directoryContent[key] && directoryContent[key];
                currentDirectoryContent = currentDirectoryContent && currentDirectoryContent.filter(currentPath => currentPath !== exclude)
                    .map(currentPath => currentPath.toString())
                    .filter(currentPath => excludeRegex && !currentPath.match(excludeRegex));
                directoryContent[key] = currentDirectoryContent;
            }
        return directoryContent;
    });
}
exports.default = default_1;
//# sourceMappingURL=get-folder-content.js.map