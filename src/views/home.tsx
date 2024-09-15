import { type Component } from 'solid-js';
import { open } from '@tauri-apps/plugin-dialog';
import vault from '../stores/vault';
import { useNavigate } from '@solidjs/router';

const HomeView: Component = () => {
  const navigate = useNavigate();

  const handleSelectVault = async (): Promise<void> => {
    const folder = await open({
      multiple: false,
      directory: true
    });

    // user canceled.
    if (folder === null) return;

    vault.setPath(folder);
    navigate("/vault");
  }

  return (
    <div>
      <p>no vault is selected</p>
      
      <button type="button" onClick={handleSelectVault}>
        Select a vault
      </button>
    </div>
  )
};

export default HomeView;
