import { basename } from 'path';
import { expect } from 'chai';
import createFile from 'vamtiger-create-file';
import getFolderContent from 'vamtiger-get-directory-content';
import remove from '..';

const tempFiles = new Array(2)
    .fill(undefined)
    .map((entry, index) => `${__filename}_${index++}.txt`);
const tempFileNames = tempFiles.map(tempFile => basename(tempFile));

describe('remove-files: should remove', function() {
    beforeEach(async function () {
        await Promise.all(
            tempFiles.map(tempFile => createFile(tempFile, `Text File Text: ${new Date().toISOString()}`))
        );
    });

    it('Files', async function () {
        const params = {
            files: tempFiles
        };

        let folderContent: string[];

        await remove(params);

        folderContent = await getFolderContent(__dirname);

        expect(tempFileNames.every(tempFile => !folderContent.includes(tempFile))).to.be.true;
    });
});