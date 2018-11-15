# [VAMTIGER Remove](https://github.com/vamtiger-project/vamtiger-remove)
Remove files/folders and place in trash folder for respective operating system.

## Installation
[VAMTIGER Remove](https://github.com/vamtiger-project/vamtiger-remove) can be installed using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/):
```bash
npm i vamtiger-remove
```
or
```bash
yarn add vamtiger-remove
```

[VAMTIGER Remove](https://github.com/vamtiger-project/vamtiger-remove) can also be installed globally:
```javascript
npm i --global vamtiger-remove
```
or
```javascript
yarn global vamtiger-remove
```

## Usage
Customiseable options can be listed:
```bash
vamtiger-remove --help
```
| Argument       | Short | Description                    |
|----------------|-------|--------------------------------|
| --exclude        | -e     | File/Folder to exclude         |
| --excludePattern | -p     | File/Folder pattern to exclude |
| --file           | -f     | File to remove                 |
| --folder         | -d     | Folder to remove               |
| --help           | -h     | List help options              |

[VAMTIGER Node Typescript Commit](https://github.com/vamtiger-project/vamtiger-remove) can be referenced as an [npm](https://www.npmjs.com/) and can be used to remove files.
```json
{
    "scripts": {
        "commit": "vamtiger-remove --file some/relative/file/path --file another/relative/file/path"
    }
}
```

Folders can also be removed.
```json
{
    "scripts": {
        "commit": "vamtiger-remove --folder some/relative/folder/path"
    }
}
```

Paths can be excluded explicitly.
```json
{
    "scripts": {
        "commit": "vamtiger-remove --folder some/relative/folder/path --exclude some-file.txt --exclude another-file.txt"
    }
}
```

Paths can also be excluded by specifying a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) pattern.
```json
{
    "scripts": {
        "commit": "vamtiger-remove --folder some/relative/folder/path --excludePattern \"(some|another)-file.txt\""
    }
}
```
