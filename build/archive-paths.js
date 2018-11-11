"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const archive_path_1 = require("./archive-path");
function default_1({ paths, archiveFolder, folderPath }) {
    const archivePaths = paths.reduce((archive, currentPath) => archive.then(() => archive_path_1.default({
        path: currentPath,
        folderPath,
        archiveFolder
    })), Promise.resolve());
    return archivePaths;
}
exports.default = default_1;
//# sourceMappingURL=archive-paths.js.map