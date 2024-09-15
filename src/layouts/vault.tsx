import { createEffect, For, Show, type ParentComponent } from "solid-js";
import vault from "../stores/vault";
import { useNavigate } from "@solidjs/router";
import FileTree from "../components/file-tree";
import type { File } from "../types/File";
import { addPanel, panels } from "../stores/panels";
import Panel from "../components/panel";

const VaultLayout: ParentComponent = (props) => {
  const navigate = useNavigate();
  
  createEffect(() => {
    const path = vault.path();
    
    if (path === null) {
      navigate("/");
    }
  });

  const handleFileClick = async (file: File) => {
    addPanel({ file });
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
