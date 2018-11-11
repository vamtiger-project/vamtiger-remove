import { mkdtemp } from 'fs';
import { tmpdir } from 'os';
import { resolve as resolvePath } from 'path';
import { IGetTempFolder } from '.';

export default ({ path: folder }: IGetTempFolder['params']) => new Promise((resolve, reject) => {
    const tempFolder = resolvePath(
        tmpdir(),
        folder
    );

    mkdtemp(tempFolder, (error, folder) => error ? reject(error) : resolve(folder))
}) as Promise<string>;