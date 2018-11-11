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
const chai_1 = require("chai");
const vamtiger_create_file_1 = require("vamtiger-create-file");
const vamtiger_create_directory_1 = require("vamtiger-create-directory");
const vamtiger_create_directory_recursive_1 = require("vamtiger-create-directory-recursive");
const vamtiger_get_directory_content_1 = require("vamtiger-get-directory-content");
const vamtiger_get_directory_content_recursive_1 = require("vamtiger-get-directory-content-recursive");
const __1 = require("..");
const tempFolderPath = __filename.replace('.js', '');
const nestedTempFolderPath = path_1.resolve(tempFolderPath + '-nested', 'folder', 'sub-folder');
const tempFilePaths = new Array(10)
    .fill(undefined)
    .map((entry, index) => path_1.resolve(path_1.dirname(nestedTempFolderPath), `temp-file-${++index}.txt`));
describe('remove-folder: should remove', function () {
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                vamtiger_create_directory_1.default(tempFolderPath).catch(error => { }),
                vamtiger_create_directory_recursive_1.default({
                    path: nestedTempFolderPath
                })
            ]);
            yield Promise.all(tempFilePaths.map(currentPath => vamtiger_create_file_1.default(currentPath, new Date().toISOString())));
            ;
        });
    });
    it('Folder', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                folder: tempFolderPath
            };
            let folderContent;
            yield __1.default(params);
            folderContent = yield vamtiger_get_directory_content_1.default(__dirname).then(currentFolderContent => new Set(currentFolderContent));
            chai_1.expect(folderContent.has(tempFolderPath)).to.be.false;
            ;
        });
    });
    it('Nested Folder', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const currentFolder = path_1.dirname(path_1.dirname(nestedTempFolderPath));
            const params = {
                folder: currentFolder,
                exclude: tempFilePaths.slice(tempFilePaths.length - 2),
                excludePattern: 'file-(2|3)'
            };
            const excludePaths = tempFilePaths
                .slice(tempFilePaths.length - 2)
                .concat(tempFilePaths.filter(file => file.match(/file-(2|3)/)));
            let folderContent;
            yield __1.default(params);
            folderContent = yield vamtiger_get_directory_content_recursive_1.default({
                path: currentFolder
            }).then(currentFolderContent => new Set(currentFolderContent));
            chai_1.expect(excludePaths.every(excludePath => folderContent.has(excludePath))).to.be.true;
        });
    });
});
//# sourceMappingURL=03-remove-folder.js.map