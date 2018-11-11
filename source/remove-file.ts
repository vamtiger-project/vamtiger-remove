import { unlink as removeFile } from 'fs';
import {
    RemoveFile
} from '.';

export default ({ path: filePath }: RemoveFile.Params) => new Promise((resolve, reject) =>
    removeFile(filePath, error => error ? reject(error) : resolve())
);