"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var fs=require("fs"),os=require("os"),path=require("path"),getPathData=_interopDefault(require("vamtiger-get-path-data")),createFolder=_interopDefault(require("vamtiger-create-directory-recursive")),copyFile=_interopDefault(require("vamtiger-copy-file")),getFolderContent=_interopDefault(require("vamtiger-get-directory-content-recursive"));const remove=require("trash");async function removePaths({paths:e}){return e&&await remove(e)}var getTempFolder=({path:e})=>new Promise((t,r)=>{const a=path.resolve(os.tmpdir(),e);fs.mkdtemp(a,(e,a)=>e?r(e):t(a))});function getPathsToExclude({paths:e,regex:t}){const r=new Set;let a;return e.forEach(e=>{(a=!r.has(e)&&t.some(t=>!!e.match(t)))&&r.add(e)}),Array.from(r)}async function archivePath({path:e,archiveFolder:t,folderPath:r}){const a=(await getPathData(e)).isFile()&&e,o=a&&a.replace(r,t),i=o&&path.dirname(o)||e.replace(r,t);i&&await createFolder({path:i}),a&&o&&await copyFile({source:a,destination:o})}function archivePaths({paths:e,archiveFolder:t,folderPath:r}){return e.reduce((e,a)=>e.then(()=>archivePath({path:a,folderPath:r,archiveFolder:t})),Promise.resolve())}async function unarchive({archiveFolder:e,unarchivedFolder:t}){const{file:r=[],directory:a=[]}=await getFolderContent({path:e,classified:!0}),o=a.map(r=>r.replace(e,t)),i=r.map(r=>({source:r,destination:r.replace(e,t)})),n=o.length&&o.reduce((e,t)=>e.then(()=>createFolder({path:t})),Promise.resolve())||createFolder({path:t});await n,await Promise.all(i.map(copyFile))}var removeFile=({path:e})=>new Promise((t,r)=>fs.unlink(e,e=>e?r(e):t())),removeFolder=({path:e})=>new Promise((t,r)=>fs.rmdir(e,e=>e?r(e):t()));async function permanentRemove({path:e}){const t=await getPathData(e),{file:r=[],directory:a=[]}=await getFolderContent({path:e,classified:!0}),o=new Set(t.isFile()?r.concat([e]):r),i=new Set(a.reverse().concat([e]));await Promise.all(Array.from(o).map(e=>removeFile({path:e}))),await Array.from(i).reduce((e,t)=>e.then(()=>removeFolder({path:t})),Promise.resolve())}async function removeFolder$1({path:e,exclude:t,excludePattern:r=""}){const a=(t&&"string"==typeof t&&[t]||t||[]).map(t=>`^${path.resolve(e,t)}$`).concat([r]).filter(e=>e).map(e=>new RegExp(e)),o=await getTempFolder({path:path.basename(e)}),i=getPathsToExclude({paths:await getFolderContent({path:e}),regex:a});await archivePaths({paths:i,folderPath:e,archiveFolder:o}),await removePaths({paths:[e]}),await unarchive({archiveFolder:o,unarchivedFolder:e}),await permanentRemove({path:o})}async function remove$1({file:e,files:t,folder:r,exclude:a,excludePattern:o}){e?await removePaths({paths:[e]}):t?await removePaths({paths:t}):r&&await removeFolder$1({path:r,exclude:a,excludePattern:o})}!function(e){e.file="file",e.folder="folder",e.exclude="exclude",e.excludePattern="excludePattern",e.help="help"}(exports.CommandlineArg||(exports.CommandlineArg={})),function(e){e.f="f",e.d="d",e.e="e",e.p="p",e.h="h"}(exports.AbbreviatedCommandlineArg||(exports.AbbreviatedCommandlineArg={}));const ShortCommandlineArgs={[exports.CommandlineArg.file]:exports.AbbreviatedCommandlineArg.f,[exports.CommandlineArg.folder]:exports.AbbreviatedCommandlineArg.d,[exports.CommandlineArg.exclude]:exports.AbbreviatedCommandlineArg.e,[exports.CommandlineArg.excludePattern]:exports.AbbreviatedCommandlineArg.p,[exports.CommandlineArg.help]:exports.AbbreviatedCommandlineArg.h},CommandlineDescription={[exports.CommandlineArg.file]:"File to remove",[exports.CommandlineArg.folder]:"Folder to remove",[exports.CommandlineArg.exclude]:"File/Folder to exclude",[exports.CommandlineArg.excludePattern]:"File/Folder pattern to exclude",[exports.CommandlineArg.help]:"List help options"};exports.ShortCommandlineArgs=ShortCommandlineArgs,exports.CommandlineDescription=CommandlineDescription,exports.default=remove$1;
//# sourceMappingURL=index.js.map
