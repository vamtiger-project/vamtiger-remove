import { resolve as resolvePath, resolve } from 'path';
import Args from 'vamtiger-argv/build/main';
import getHelp from 'vamtiger-commandline-help';
import remove, {
    CommandlineArg,
    ShortCommandlineArgs,
    CommandlineDescription
} from '.';

const workingDirectory = process.cwd();
const args = new Args();
const currentFiles = (args.has(CommandlineArg.file) && args.getAll(CommandlineArg.file)
    || args.has(ShortCommandlineArgs[CommandlineArg.file]) && args.getAll(ShortCommandlineArgs[CommandlineArg.file])) as string[];
const currrentFolder = (args.has(CommandlineArg.folder) && args.get(CommandlineArg.folder)
    || args.has(ShortCommandlineArgs[CommandlineArg.folder]) && args.get(ShortCommandlineArgs[CommandlineArg.folder])) as string;
const currentExclude = (args.has(CommandlineArg.exclude) && args.getAll(CommandlineArg.exclude)
    || args.has(ShortCommandlineArgs[CommandlineArg.exclude]) && args.getAll(ShortCommandlineArgs[CommandlineArg.exclude])) as string[];
const currrentFolderPattern = (args.has(CommandlineArg.excludePattern) && args.get(CommandlineArg.excludePattern)
    || args.has(ShortCommandlineArgs[CommandlineArg.excludePattern]) && args.get(ShortCommandlineArgs[CommandlineArg.excludePattern])) as string;
const help = (args.has(CommandlineArg.help) || args.has(ShortCommandlineArgs[CommandlineArg.help])) && getHelp({
    args: Object.assign(CommandlineArg),
    short: ShortCommandlineArgs,
    description: CommandlineDescription
});
const removeParams = (currentFiles || currrentFolder) && {
    files: currentFiles && currentFiles.map(file => resolvePath(workingDirectory, file)),
    folder: resolvePath(workingDirectory, currrentFolder),
    exclude: currentExclude,
    excludePattern: currrentFolderPattern
};

if (help) {
    console.log(help);
} else if (removeParams) {
    remove(removeParams)
        .catch(handleError);
}

function handleError(error: Error) {
    console.trace(error);
    process.exit();
}