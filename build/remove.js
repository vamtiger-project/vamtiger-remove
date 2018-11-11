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
const main_1 = require("vamtiger-argv/build/main");
const vamtiger_commandline_help_1 = require("vamtiger-commandline-help");
const remove_paths_1 = require("./remove-paths");
const remove_folder_1 = require("./remove-folder");
const _1 = require(".");
const args = new main_1.default();
const currentFiles = (args.has(_1.CommandlineArg.file) && args.getAll(_1.CommandlineArg.file)
    || args.has(_1.ShortCommandlineArgs[_1.CommandlineArg.file]) && args.getAll(_1.ShortCommandlineArgs[_1.CommandlineArg.file]));
const currrentFolder = (args.has(_1.CommandlineArg.folder) && args.get(_1.CommandlineArg.folder)
    || args.has(_1.ShortCommandlineArgs[_1.CommandlineArg.folder]) && args.get(_1.ShortCommandlineArgs[_1.CommandlineArg.folder]));
const currentExclude = (args.has(_1.CommandlineArg.exclude) && args.getAll(_1.CommandlineArg.exclude)
    || args.has(_1.ShortCommandlineArgs[_1.CommandlineArg.exclude]) && args.getAll(_1.ShortCommandlineArgs[_1.CommandlineArg.exclude]));
const currrentFolderPattern = (args.has(_1.CommandlineArg.excludePattern) && args.get(_1.CommandlineArg.excludePattern)
    || args.has(_1.ShortCommandlineArgs[_1.CommandlineArg.excludePattern]) && args.get(_1.ShortCommandlineArgs[_1.CommandlineArg.excludePattern]));
const help = args.has(_1.CommandlineArg.help) || args.has(_1.ShortCommandlineArgs[_1.CommandlineArg.help]) && vamtiger_commandline_help_1.default({
    args: Object.assign(_1.CommandlineArg),
    short: _1.ShortCommandlineArgs,
    description: _1.CommandlineDescription
});
const runRemove = currentFiles || currrentFolder;
if (help) {
    console.log(help);
}
else if (runRemove) {
    remove({
        files: currentFiles,
        folder: currrentFolder,
        exclude: currentExclude,
        excludePattern: currrentFolderPattern
    });
}
function remove({ file, files, folder, exclude, excludePattern }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (file) {
            yield remove_paths_1.default({
                paths: [file]
            });
        }
        else if (files) {
            yield remove_paths_1.default({
                paths: files
            });
        }
        else if (folder) {
            yield remove_folder_1.default({
                path: folder,
                exclude,
                excludePattern
            });
        }
    });
}
exports.default = remove;
//# sourceMappingURL=remove.js.map