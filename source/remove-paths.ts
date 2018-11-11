import { RemoveFiles } from '.';
import remove = require('trash');

export default async function ({ paths }: RemoveFiles.Params) {
    const result = paths && await remove(paths);

    return result;
}