import { rmdir as removeFolder } from 'fs';
import { IRemoveFolderPath } from '.';

export default ({ path: folderPath }: IRemoveFolderPath['params']) => new Promise((resolve, reject) =>
    removeFolder(folderPath, error => error ? reject(error) : resolve())
) as Promise<void>;