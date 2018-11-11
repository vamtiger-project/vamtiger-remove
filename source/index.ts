import { promisify } from 'util';
import { unlink, rmdir, PathLike } from 'fs';
import { ClassifiedDirectoryContent } from 'vamtiger-get-directory-content-recursive/build/directory-content';

export type DirectoryContent = {
    [K in keyof ClassifiedDirectoryContent]?: ClassifiedDirectoryContent[K];
};

export type DirectoryContentKey = keyof ClassifiedDirectoryContent;

export type CurrentDirectoryContent = ClassifiedDirectoryContent[DirectoryContentKey] | string[] | undefined;

export enum CommandlineArg {
    file = 'file',
    folder = 'folder',
    exclude = 'exclude',
    excludePattern = 'excludePattern',
    help = 'help'
}

export enum AbbreviatedCommandlineArg {
    f = 'f',
    d = 'd',
    e = 'e',
    p = 'p',
    h = 'h'
}

export const ShortCommandlineArgs = {
    [CommandlineArg.file]: AbbreviatedCommandlineArg.f,
    [CommandlineArg.folder]: AbbreviatedCommandlineArg.d,
    [CommandlineArg.exclude]: AbbreviatedCommandlineArg.e,
    [CommandlineArg.excludePattern]: AbbreviatedCommandlineArg.p,
    [CommandlineArg.help]: AbbreviatedCommandlineArg.h
}

export const CommandlineDescription = {
    [CommandlineArg.file]: 'File to remove',
    [CommandlineArg.folder]: 'Folder to remove',
    [CommandlineArg.exclude]: 'File/Folder to exclude',
    [CommandlineArg.excludePattern]: 'File/Folder pattern to exclude',
    [CommandlineArg.help]: 'List help options'
}

export namespace RemoveFile {
    export type Params = {
        path: PathLike;
    }
}

export namespace RemoveFiles {
    export type Params = {
        paths: Remove.Params['files'];
    }
}

export namespace RemoveFolder {
    export type Params = {
        path: string;
        exclude: Remove.Params['exclude'];
        excludePattern: Remove.Params['excludePattern'];
    }
}

export namespace GetFilePath {
    export type Params = {
        path: string;
    }
}

export namespace GetFolderContent {
    export type Params = {
        folderPath: RemoveFolder.Params['path'];
        exclude?: string;
        excludePattern?: string;
    }
}

export namespace Remove {
    export type Params = {
        file?: string;
        folder?: string;
        files?: string[];
        recursive?: boolean;
        exclude?: string | string[];
        excludePattern?: string;
    }
}

export interface IGetTempFolder {
    params: {
        path: string;
    }
}

export interface IGetPathsToExclude {
    params: {
        paths: string[];
        regex: RegExp[];
    }
}

export interface IArchivePaths {
    params: {
        paths: string[];
        folderPath: string;
        archiveFolder: string;
    }
}

export interface IArchivePath {
    params: {
        path: string;
        folderPath: string;
        archiveFolder: string;
    }
}

export interface IUnArchive {
    params: {
        archiveFolder: string;
        unarchivedFolder: string;
    }
}

export interface IRemovePath {
    params: {
        path: string;
    }
}

export interface IRemoveFolderPath {
    params: {
        path: string;
    }
}

export const removeFile = promisify(unlink);

export const removeFolder = promisify(rmdir);

export { default as remove} from './remove';

export default exports.remove;