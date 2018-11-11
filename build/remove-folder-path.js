"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.default = ({ path: folderPath }) => new Promise((resolve, reject) => fs_1.rmdir(folderPath, error => error ? reject(error) : resolve()));
//# sourceMappingURL=remove-folder-path.js.map