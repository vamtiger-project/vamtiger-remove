"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1({ paths, regex }) {
    const pathsToExclude = new Set();
    let excludePath;
    paths.forEach(currentPath => {
        excludePath = !pathsToExclude.has(currentPath) && regex.some(currentRegex => currentPath.match(currentRegex) ? true : false);
        if (excludePath) {
            pathsToExclude.add(currentPath);
        }
    });
    return Array.from(pathsToExclude);
}
exports.default = default_1;
//# sourceMappingURL=get-paths-to-exclude.js.map