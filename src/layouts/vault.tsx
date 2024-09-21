import { createEffect, createSignal, For, Show, type ParentComponent } from "solid-js";
import vault from "../stores/vault";
import { useNavigate } from "@solidjs/router";
import FileTree from "../components/file-tree";
import type { File } from "../types/File";
import type { Panel as IPanel } from "../types/Panel";
import { addPanel, panels } from "../stores/panels";
import Panel from "../components/panel";
import { createStore } from "solid-js/store";

const VaultLayout: ParentComponent = (props) => {
  const navigate = useNavigate();
  
  createEffect(() => {
    const path = vault.path();
    
    if (path === null) {
      navigate("/");
    }
  });

  const [panels, setPanels] = createStore<IPanel[]>([]);
  const handleFileClick = async (file: File) => {
    setPanels(0, prev => ({ files: prev ? [...prev.files, file] : [file] }));
  }

  return (
    <div class="flex">
      <div>
        <Show when={vault.path()}>
          {vaultPath => (
            <div>
              <FileTree
                path={vaultPath()}
                onFileClick={handleFileClick}  
              />

              {props.children}
            </div>
          )}
        </Show>
      </div>

      <main>
        <Show when={panels.length > 0}>
          <For each={panels}>
            {panel => <Panel {...panel} />}
          </For>
        </Show>
      </main>
    </div>
  )
};

export default VaultLayout;
