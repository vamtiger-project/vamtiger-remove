"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
exports.default = ({ path: folder }) => new Promise((resolve, reject) => {
    const tempFolder = path_1.resolve(os_1.tmpdir(), folder);
    fs_1.mkdtemp(tempFolder, (error, folder) => error ? reject(error) : resolve(folder));
});
//# sourceMappingURL=get-temp-folder.js.map