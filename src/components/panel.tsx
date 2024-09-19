import { createResource, type Component } from "solid-js";
import type { Panel as IPanel } from "../types/Panel";
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import Renderer from "./editor/renderer";

const Panel: Component<IPanel> = (panel) => {
  const [content, { mutate }] = createResource(() => panel.file.fullPath, (path) => readTextFile(path))

  const handleFileUpdate = async (content: string): Promise<void> => {
    mutate(content);
    await writeTextFile(panel.file.fullPath, content);
  }

  return (
    <div>
      <p>
        {panel.file.name}
      </p>

      <div>
        <Renderer
          content={content() ?? ""}
          onContentUpdate={handleFileUpdate}
        />
      </div>
    </div>
  )
};

export default Panel;
