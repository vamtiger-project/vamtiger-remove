"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.default = ({ path: filePath }) => new Promise((resolve, reject) => fs_1.unlink(filePath, error => error ? reject(error) : resolve()));
//# sourceMappingURL=remove-file.js.map