import { createResource, For, Show, type Component } from "solid-js";
import { readDir } from '@tauri-apps/plugin-fs';
import type { Directory, File } from "../types/File";

const processEntriesRecursively = async (path: string, parentDirectory: Directory): Promise<void> => {
  const entries = await readDir(path);

  for (const entry of entries) {
    const fullPath = `${path}/${entry.name}`;

    if (entry.isDirectory) {
      const directory = {
        fullPath,
        name: entry.name,
        children: []
      } satisfies Directory;

      await processEntriesRecursively(fullPath, directory)
      parentDirectory.children.push(directory)
    }
    else {
      const file = {
        fullPath,
        name: entry.name
      } satisfies File;

      parentDirectory.children.push(file);
    }
  }
}

const fetchFiles = async (path: string): Promise<Directory> => {
  const rootDirectory = {
    fullPath: path,
    name: path.split("/").pop()!,
    children: []
  } satisfies Directory;

  await processEntriesRecursively(path, rootDirectory);

  return rootDirectory;
}

const DirectoryTree: Component<Directory & {
  indent?: number
  onFileClick: (file: File) => void
}> = (directory) => {
  const indent = () => directory.indent ?? 0;

  return (
    <div class="flex flex-col">
      <p>{directory.name}</p>

      <div class="flex flex-col"
        style={{
          "margin-left": `${indent() * 20}px`
        }}
      >
        <For each={directory.children}>
          {entry => (
            <Show when={"children" in entry} fallback={
              <a
                class="cursor-pointer"
                onClick={() => directory.onFileClick(entry as File)}
              >
                {entry.name}
              </a>
            }>
              <DirectoryTree
                {...entry as Directory}
                indent={indent() + 1}
                onFileClick={directory.onFileClick}
              />
            </Show>
          )}
        </For>
      </div>

    </div>
  )
}

const FileTree: Component<{
  path: string,
  onFileClick: (file: File) => void
}> = (props) => {
  const [rootDirectory] = createResource(props.path, fetchFiles);

  return (
    <div class="flex flex-col">
      <Show when={rootDirectory()}>
        {rootDirectory => 
          <DirectoryTree
            {...rootDirectory()}
            onFileClick={props.onFileClick}
          />
        }
      </Show>
    </div>
  )
};

export default FileTree;
