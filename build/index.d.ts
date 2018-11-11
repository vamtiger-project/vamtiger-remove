/// <reference types="node" />
import { unlink, rmdir, PathLike } from 'fs';
import { ClassifiedDirectoryContent } from 'vamtiger-get-directory-content-recursive/build/directory-content';
export declare type DirectoryContent = {
    [K in keyof ClassifiedDirectoryContent]?: ClassifiedDirectoryContent[K];
};
export declare type DirectoryContentKey = keyof ClassifiedDirectoryContent;
export declare type CurrentDirectoryContent = ClassifiedDirectoryContent[DirectoryContentKey] | string[] | undefined;
export declare enum CommandlineArg {
    file = "file",
    folder = "folder",
    exclude = "exclude",
    excludePattern = "excludePattern",
    help = "help"
}
export declare enum AbbreviatedCommandlineArg {
    f = "f",
    d = "d",
    e = "e",
    p = "p",
    h = "h"
}
export declare const ShortCommandlineArgs: {
    [CommandlineArg.file]: AbbreviatedCommandlineArg;
    [CommandlineArg.folder]: AbbreviatedCommandlineArg;
    [CommandlineArg.exclude]: AbbreviatedCommandlineArg;
    [CommandlineArg.excludePattern]: AbbreviatedCommandlineArg;
    [CommandlineArg.help]: AbbreviatedCommandlineArg;
};
export declare const CommandlineDescription: {
    [CommandlineArg.file]: string;
    [CommandlineArg.folder]: string;
    [CommandlineArg.exclude]: string;
    [CommandlineArg.excludePattern]: string;
    [CommandlineArg.help]: string;
};
export declare namespace RemoveFile {
    type Params = {
        path: PathLike;
    };
}
export declare namespace RemoveFiles {
    type Params = {
        paths: Remove.Params['files'];
    };
}
export declare namespace RemoveFolder {
    type Params = {
        path: string;
        exclude: Remove.Params['exclude'];
        excludePattern: Remove.Params['excludePattern'];
    };
}
export declare namespace GetFilePath {
    type Params = {
        path: string;
    };
}
export declare namespace GetFolderContent {
    type Params = {
        folderPath: RemoveFolder.Params['path'];
        exclude?: string;
        excludePattern?: string;
    };
}
export declare namespace Remove {
    type Params = {
        file?: string;
        folder?: string;
        files?: string[];
        recursive?: boolean;
        exclude?: string | string[];
        excludePattern?: string;
    };
}
export interface IGetTempFolder {
    params: {
        path: string;
    };
}
export interface IGetPathsToExclude {
    params: {
        paths: string[];
        regex: RegExp[];
    };
}
export interface IArchivePaths {
    params: {
        paths: string[];
        folderPath: string;
        archiveFolder: string;
    };
}
export interface IArchivePath {
    params: {
        path: string;
        folderPath: string;
        archiveFolder: string;
    };
}
export interface IUnArchive {
    params: {
        archiveFolder: string;
        unarchivedFolder: string;
    };
}
export interface IRemovePath {
    params: {
        path: string;
    };
}
export interface IRemoveFolderPath {
    params: {
        path: string;
    };
}
export declare const removeFile: typeof unlink.__promisify__;
export declare const removeFolder: typeof rmdir.__promisify__;
export { default as remove } from './remove';
declare const _default: any;
export default _default;
