import { createResource, type Component } from "solid-js";
import type { Panel as IPanel } from "../types/Panel";
import { readTextFile } from '@tauri-apps/plugin-fs';

const Panel: Component<IPanel> = (panel) => {
  const [content] = createResource(() => panel.file.fullPath, (path) => readTextFile(path))

  return (
    <div>
      <p>
        {panel.file.name}
      </p>

      <div>
        <pre>{content()}</pre>
      </div>
    </div>
  )
};

export default Panel;
