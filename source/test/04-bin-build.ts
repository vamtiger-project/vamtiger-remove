import { resolve as resolvePath, basename } from 'path'
import { expect } from 'chai';
import bash from 'vamtiger-bash';
import getFolderContent from 'vamtiger-get-directory-content-recursive';

const buildPath = resolvePath(
    __dirname,
    '../../build'
);
const build = 'npm run build';
const bundleExclude = 'node build/bin --folder build --exclude index.js --exclude index.js.map --exclude index.d.ts --exclude bin.js --exclude bin.js.map --exclude bin.d.ts';
const bundleExcludePattern = 'node build/bin --folder build --excludePattern "(index|bin)\.(js(\.map)?|d\.ts)"';
const bashOptions = {
    cwd: resolvePath(
        __dirname,
        '../..'
    )
};
const excludedFiles = [
    'bin.d.ts',
    'bin.js',
    'bin.js.map',
    'index.d.ts',
    'index.js',
    'index.js.map'
];

describe('vamtger-remove: bin', function () {
    describe('exclude', function () {
        before(async function () {
            await bash(build, bashOptions);
            await bash(bundleExclude, bashOptions);
        });

        it('files', async function () {
            const folderConent = await getFolderContent({
                path: buildPath
            }) as string[];
            const remainingFiles = folderConent.map(entry => basename(entry));

            expect(remainingFiles.length).to.equal(excludedFiles.length);
            expect(remainingFiles.every(remainingFile => excludedFiles.some(excludedFile => remainingFile === excludedFile))).to.be.true;
        });
    });

    describe('exclude pattern', function () {
        before(async function () {
            await bash(build, bashOptions);
            await bash(bundleExcludePattern, bashOptions);
        });

        it('files', async function () {
            const folderConent = await getFolderContent({
                path: buildPath
            }) as string[];
            const remainingFiles = folderConent.map(entry => basename(entry));

            expect(remainingFiles.length).to.equal(excludedFiles.length);
            expect(remainingFiles.every(remainingFile => excludedFiles.some(excludedFile => remainingFile === excludedFile))).to.be.true;
        });
    });
});