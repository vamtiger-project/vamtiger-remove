import { GetFilePath } from '.';
import getPathData from 'vamtiger-get-path-data';

export default async function({ path: currentPath }: GetFilePath.Params) {
    const pathData = await getPathData(currentPath);
    const filePath = pathData.isFile() && currentPath;

    return filePath;
}