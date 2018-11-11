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
const vamtiger_get_directory_content_recursive_1 = require("vamtiger-get-directory-content-recursive");
const remove_paths_1 = require("./remove-paths");
const get_temp_folder_1 = require("./get-temp-folder");
const get_paths_to_exclude_1 = require("./get-paths-to-exclude");
const archive_paths_1 = require("./archive-paths");
const unarchive_1 = require("./unarchive");
const remove_path_1 = require("./remove-path");
function default_1({ path: folderPath, exclude, excludePattern = '' }) {
    return __awaiter(this, void 0, void 0, function* () {
        const excludePatterns = (exclude && typeof exclude === 'string' && [exclude] || exclude || []);
        const patterns = excludePatterns
            .concat([excludePattern])
            .filter(pattern => pattern);
        const excludeRegex = patterns.map(pattern => new RegExp(pattern));
        const tempFolder = yield get_temp_folder_1.default({
            path: path_1.basename(folderPath)
        });
        const folderContent = yield vamtiger_get_directory_content_recursive_1.default({ path: folderPath });
        const pathsToExclude = get_paths_to_exclude_1.default({
            paths: folderContent,
            regex: excludeRegex
        });
        yield archive_paths_1.default({
            paths: pathsToExclude,
            folderPath,
            archiveFolder: tempFolder
        });
        yield remove_paths_1.default({
            paths: [folderPath]
        });
        yield unarchive_1.default({
            archiveFolder: tempFolder,
            unarchivedFolder: folderPath
        });
        yield remove_path_1.default({
            path: tempFolder
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=remove-folder.js.map