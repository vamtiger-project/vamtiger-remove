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
const vamtiger_get_directory_content_recursive_1 = require("vamtiger-get-directory-content-recursive");
const vamtiger_create_directory_recursive_1 = require("vamtiger-create-directory-recursive");
const vamtiger_copy_file_1 = require("vamtiger-copy-file");
function default_1({ archiveFolder, unarchivedFolder }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { file: archivedFiles = [], directory: archiveFolders = [] } = yield vamtiger_get_directory_content_recursive_1.default({
            path: archiveFolder,
            classified: true
        });
        const unarchivedFoldersPaths = archiveFolders.map(currentArchivedFolder => currentArchivedFolder.replace(archiveFolder, unarchivedFolder));
        const copyFilePaths = archivedFiles.map(currentArchivedFile => ({
            source: currentArchivedFile,
            destination: currentArchivedFile.replace(archiveFolder, unarchivedFolder)
        }));
        const unarchivedFolders = unarchivedFoldersPaths.reduce((unarchive, currentPath) => unarchive.then(() => vamtiger_create_directory_recursive_1.default({
            path: currentPath
        })), Promise.resolve());
        yield unarchivedFolders;
        yield Promise.all(copyFilePaths.map(vamtiger_copy_file_1.default));
    });
}
exports.default = default_1;
//# sourceMappingURL=unarchive.js.map