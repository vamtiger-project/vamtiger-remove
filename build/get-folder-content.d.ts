import { GetFolderContent, DirectoryContent } from '.';
export default function ({ folderPath, exclude, excludePattern }: GetFolderContent.Params): Promise<DirectoryContent>;
