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
const tempFile = `${__filename}.txt`;
const tempFileName = path_1.basename(tempFile);
const tempFileText = `Text File Text: ${new Date().toISOString()}`;
describe('remove-file: should remove', function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield vamtiger_create_file_1.default(tempFile, tempFileText);
        });
    });
    it('File', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                file: tempFile
            };
            let folderContent;
            yield __1.default(params);
            folderContent = yield vamtiger_get_directory_content_1.default(__dirname);
            chai_1.expect(folderContent.includes(tempFileName)).to.be.false;
        });
    });
});
//# sourceMappingURL=00-remove-file.js.map