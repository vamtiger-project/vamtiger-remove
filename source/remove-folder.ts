import { basename, resolve as resolvePath } from 'path';
import getFolderContent from 'vamtiger-get-directory-content-recursive';
import removePaths from './remove-paths';
import getTempFolder from './get-temp-folder';
import getPathsToExclude from './get-paths-to-exclude';
import archivePaths from './archive-paths';
import unarchive from './unarchive';
import permanentRemove from './remove-path';
import { RemoveFolder } from '.';

export default async function ({ path: folderPath, exclude, excludePattern = '' }: RemoveFolder.Params) {
    const excludePatterns = (exclude && typeof exclude === 'string' && [exclude] || exclude || []) as string[];
    const patterns = excludePatterns
        .concat([excludePattern])
        .filter(pattern => pattern) as string[];
    const excludeRegex = patterns.map(pattern => new RegExp(pattern));
    const tempFolder = await getTempFolder({
        path: basename(folderPath)
    });
    const folderContent = await getFolderContent({ path: folderPath }) as string[];
    const pathsToExclude = getPathsToExclude({
        paths: folderContent,
        regex: excludeRegex
    });

    await archivePaths({
        paths: pathsToExclude,
        folderPath,
        archiveFolder: tempFolder
    });

    await removePaths({
        paths: [folderPath]
    });

    await unarchive({
        archiveFolder: tempFolder,
        unarchivedFolder: folderPath
    });

    await permanentRemove({
        path: tempFolder
    });
}