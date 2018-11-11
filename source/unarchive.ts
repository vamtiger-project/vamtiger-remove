import getFolderContent from 'vamtiger-get-directory-content-recursive';
import createFolder from 'vamtiger-create-directory-recursive';
import copyFile from 'vamtiger-copy-file';
import { IUnArchive } from '.';


export default async function ({ archiveFolder, unarchivedFolder }: IUnArchive['params']) {
    const { file: archivedFiles = [], directory: archiveFolders = [] } = await getFolderContent({
        path: archiveFolder,
        classified: true
    }) as { file: string[], directory: string[]};
    const unarchivedFoldersPaths = archiveFolders.map(currentArchivedFolder => currentArchivedFolder.replace(archiveFolder, unarchivedFolder));
    const copyFilePaths = archivedFiles.map(currentArchivedFile => ({
        source: currentArchivedFile,
        destination: currentArchivedFile.replace(archiveFolder, unarchivedFolder)
    }));
    const unarchivedFolders = unarchivedFoldersPaths.reduce((unarchive, currentPath) => unarchive.then(() => createFolder({
        path: currentPath
    })), Promise.resolve());

    await unarchivedFolders

    await Promise.all(copyFilePaths.map(copyFile));
}