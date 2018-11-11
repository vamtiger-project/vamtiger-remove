import { IGetPathsToExclude } from '.';

export default function ({ paths, regex }: IGetPathsToExclude['params']) {
    const pathsToExclude = new Set<string>();

    let excludePath: boolean;

    paths.forEach(currentPath => {
        excludePath = !pathsToExclude.has(currentPath) && regex.some(currentRegex => currentPath.match(currentRegex) ? true : false);

        if (excludePath) {
            pathsToExclude.add(currentPath);
        }
    });

    return Array.from(pathsToExclude);
}