import removePaths from './remove-paths';
import removeFolder from './remove-folder';
import {
    Remove
} from '.';

export default async function remove({ file, files, folder, exclude, excludePattern }: Remove.Params) {
    if (file) {
        await removePaths({
            paths: [file]
        });
    } else if (files) {
        await removePaths({
            paths: files
        });
    } else if (folder) {
        await removeFolder({
            path: folder,
            exclude,
            excludePattern
        });
    }
}