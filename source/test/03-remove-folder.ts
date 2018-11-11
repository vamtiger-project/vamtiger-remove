import { resolve as resolvePath, dirname } from 'path';
import { expect } from 'chai';
import createFile from 'vamtiger-create-file';
import createFolder from 'vamtiger-create-directory';
import createDirectoryRecursive from 'vamtiger-create-directory-recursive';
import getFolderContent from 'vamtiger-get-directory-content';
import getFolderContentRecursive from 'vamtiger-get-directory-content-recursive';
import remove from '..';

const tempFolderPath = __filename.replace('.js', '');
const nestedTempFolderPath = resolvePath(
    tempFolderPath + '-nested',
    'folder',
    'sub-folder'
);
const tempFilePaths = new Array(10)
    .fill(undefined)
    .map((entry, index) => resolvePath(dirname(nestedTempFolderPath), `temp-file-${++index}.txt`));

describe('remove-folder: should remove', function() {
    before(async function () {
        await Promise.all([
            createFolder(tempFolderPath).catch(error => {}),
            createDirectoryRecursive({
                path: nestedTempFolderPath
            })
        ]);

        await Promise.all(
            tempFilePaths.map(currentPath => createFile(currentPath, new Date().toISOString()))
        );;
    });

    it('Folder', async function () {
        const params = {
            folder: tempFolderPath
        };

        let folderContent: Set<string>;

        await remove(params);

        folderContent = await getFolderContent(__dirname).then(currentFolderContent => new Set(currentFolderContent));

        expect(folderContent.has(tempFolderPath)).to.be.false;;
    });

    it('Nested Folder', async function () {
        const currentFolder = dirname(dirname(nestedTempFolderPath));
        const params = {
            folder: currentFolder,
            exclude: tempFilePaths.slice(tempFilePaths.length - 2),
            excludePattern: 'file-(2|3)'
        };
        const excludePaths = tempFilePaths
            .slice(tempFilePaths.length - 2)
            .concat(tempFilePaths.filter(file => file.match(/file-(2|3)/)))

        let folderContent: Set<string>;

        await remove(params);

        folderContent = await getFolderContentRecursive({
            path: currentFolder
        }).then(currentFolderContent => new Set(currentFolderContent as string[]));

        expect(excludePaths.every(excludePath => folderContent.has(excludePath))).to.be.true;
    });
});