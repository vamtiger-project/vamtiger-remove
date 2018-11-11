import archivePath from './archive-path';
import { IArchivePaths } from '.';

export default function ({ paths, archiveFolder, folderPath }: IArchivePaths['params']) {
    const archivePaths = paths.reduce((archive, currentPath) => archive.then(() => archivePath({
        path: currentPath,
        folderPath,
        archiveFolder
    })), Promise.resolve());

    return archivePaths;
}