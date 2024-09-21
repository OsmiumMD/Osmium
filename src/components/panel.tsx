import { createResource, createSignal, For, Show, type Component } from "solid-js";
import type { Panel as IPanel } from "../types/Panel";
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import Renderer from "./editor/renderer";
import { File } from "../types/File";

const Panel: Component<IPanel> = (panel) => {
  

  const [currentlyActive, setCurrentlyActive] = createSignal<File | undefined>(panel.files[0]);

  const TextFile: Component<File> = (file) => {
    const [content, { mutate }] = createResource(() => file.fullPath, (path) => readTextFile(path))

    const handleFileUpdate = async (content: string): Promise<void> => {
      mutate(content);
      await writeTextFile(file.fullPath, content);
    }

    return (
      <div>
        <Renderer
          content={content() ?? ""}
          onContentUpdate={handleFileUpdate}
        />
      </div>
    )
  }

  return (
    <div>
      <nav class="flex">
        <For each={panel.files}>
          {(file) => (
            <button
              classList={{ active: file === currentlyActive() }}
              onClick={() => setCurrentlyActive(file)}
            >
              {file.name}
            </button>
          )}
        </For>
      </nav>

      <Show when={currentlyActive()}>
        {file => <TextFile {...file()} />}
      </Show>
    </div>
  )
};

export default Panel;
