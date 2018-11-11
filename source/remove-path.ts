import getFolderContent from 'vamtiger-get-directory-content-recursive';
import getPathData from 'vamtiger-get-path-data';
import removeFile from './remove-file';
import removeFolder from './remove-folder-path';
import { IRemovePath } from '.';
import { promises } from 'fs';

export default async function ({ path: currentPath}: IRemovePath['params']) {
    const pathData = await getPathData(currentPath);
    const { file = [], directory = [] } = await getFolderContent({
        path: currentPath,
        classified: true
    }) as { file: string[], directory: string[]};
    const files = new Set(pathData.isFile() ? file.concat([currentPath]) : file);
    const folders = new Set(
        directory
            .reverse()
            .concat([currentPath])
    );

    await Promise.all(Array.from(files).map(filePath => removeFile({
        path: filePath
    })));

    await Array
        .from(folders)
        .reduce((removeCurrentFolder, folderPath) => removeCurrentFolder.then(() => removeFolder({
            path: folderPath
        })), Promise.resolve());
}