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
const vamtiger_get_directory_content_1 = require("vamtiger-get-directory-content");
const __1 = require("..");
const tempFiles = new Array(2)
    .fill(undefined)
    .map((entry, index) => `${__filename}_${index++}.txt`);
const tempFileNames = tempFiles.map(tempFile => path_1.basename(tempFile));
describe('remove-files: should remove', function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(tempFiles.map(tempFile => vamtiger_create_file_1.default(tempFile, `Text File Text: ${new Date().toISOString()}`)));
        });
    });
    it('Files', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                files: tempFiles
            };
            let folderContent;
            yield __1.default(params);
            folderContent = yield vamtiger_get_directory_content_1.default(__dirname);
            chai_1.expect(tempFileNames.every(tempFile => !folderContent.includes(tempFile))).to.be.true;
        });
    });
});
//# sourceMappingURL=01-remove-files.js.map