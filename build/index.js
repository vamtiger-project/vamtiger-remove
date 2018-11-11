"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs_1 = require("fs");
var CommandlineArg;
(function (CommandlineArg) {
    CommandlineArg["file"] = "file";
    CommandlineArg["folder"] = "folder";
    CommandlineArg["exclude"] = "exclude";
    CommandlineArg["excludePattern"] = "excludePattern";
    CommandlineArg["help"] = "help";
})(CommandlineArg = exports.CommandlineArg || (exports.CommandlineArg = {}));
var AbbreviatedCommandlineArg;
(function (AbbreviatedCommandlineArg) {
    AbbreviatedCommandlineArg["f"] = "f";
    AbbreviatedCommandlineArg["d"] = "d";
    AbbreviatedCommandlineArg["e"] = "e";
    AbbreviatedCommandlineArg["p"] = "p";
    AbbreviatedCommandlineArg["h"] = "h";
})(AbbreviatedCommandlineArg = exports.AbbreviatedCommandlineArg || (exports.AbbreviatedCommandlineArg = {}));
exports.ShortCommandlineArgs = {
    [CommandlineArg.file]: AbbreviatedCommandlineArg.f,
    [CommandlineArg.folder]: AbbreviatedCommandlineArg.d,
    [CommandlineArg.exclude]: AbbreviatedCommandlineArg.e,
    [CommandlineArg.excludePattern]: AbbreviatedCommandlineArg.p,
    [CommandlineArg.help]: AbbreviatedCommandlineArg.h
};
exports.CommandlineDescription = {
    [CommandlineArg.file]: 'File to remove',
    [CommandlineArg.folder]: 'Folder to remove',
    [CommandlineArg.exclude]: 'File/Folder to exclude',
    [CommandlineArg.excludePattern]: 'File/Folder pattern to exclude',
    [CommandlineArg.help]: 'List help options'
};
exports.removeFile = util_1.promisify(fs_1.unlink);
exports.removeFolder = util_1.promisify(fs_1.rmdir);
var remove_1 = require("./remove");
exports.remove = remove_1.default;
exports.default = exports.remove;
//# sourceMappingURL=index.js.map