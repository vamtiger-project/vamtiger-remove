import { basename } from 'path';
import { expect } from 'chai';
import createFile from 'vamtiger-create-file';
import getFolderContent from 'vamtiger-get-directory-content';
import remove from '..';

const tempFile = `${__filename}.txt`;
const tempFileName = basename(tempFile);
const tempFileText = `Text File Text: ${new Date().toISOString()}`;

describe('remove-file: should remove', function() {
    beforeEach(async function () {
        await createFile(tempFile, tempFileText);
    });

    it('File', async function () {
        const params = {
            file: tempFile
        };

        let folderContent;

        await remove(params);

        folderContent = await getFolderContent(__dirname);

        expect(folderContent.includes(tempFileName)).to.be.false;
    });
});