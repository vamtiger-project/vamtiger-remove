import { dirname, basename, resolve as resolvePath } from 'path';
import getPathData from 'vamtiger-get-path-data';
import createFolder from 'vamtiger-create-directory-recursive';
import copyFile from 'vamtiger-copy-file';
import { IArchivePath } from '.';

export default async function({ path: currentPath, archiveFolder, folderPath: sourceFolderPath }: IArchivePath['params']) {
    const pathData = await getPathData(currentPath);
    const filePath = pathData.isFile() && currentPath;
    const archiveFilePath = filePath && filePath.replace(sourceFolderPath, archiveFolder);
    const folderPath = archiveFilePath && dirname(archiveFilePath) || currentPath.replace(sourceFolderPath, archiveFolder);

    if (folderPath) {
        await createFolder({
            path: folderPath
        });
    }

    if (filePath && archiveFilePath) {
        await copyFile({
            source: filePath,
            destination: archiveFilePath
        });
    }
}