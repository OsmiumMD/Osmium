import { type Component } from 'solid-js';
import { open } from '@tauri-apps/plugin-dialog';
import vault from '../stores/vault';
import { useNavigate } from '@solidjs/router';

const HomeView: Component = () => {
  const navigate = useNavigate();

  const handleSelectVault = async (): Promise<void> => {
    const folder = await open({
      multiple: false,
      directory: true,
      recursive: true
    });

    // user canceled.
    if (folder === null) return;

    vault.setPath(folder);
    navigate("/vault");
  }

  return (
    <div class="h-screen w-screen bg-[#1e1e1e] text-white select-none">
      <div class="flex h-full">
        <nav class="bg-[#262626] w-[260px] flex-shrink-0 border-r border-[#363636] p-6">
          <p class="text-xs opacity-60">Here shoud come the latest vaults opened, but that feature is not developed yet...</p>
        </nav>

        <main class="flex flex-col items-center py-12 w-full">
          <h1 class="text-2xl font-medium">
            Osmium
          </h1>
          <p class="text-sm opacity-60">
            Version 0.0.0
          </p>

          <div class="flex flex-col w-full max-w-[440px] pt-12">
            <section class="flex justify-between">
              <div class='flex flex-col gap-1'>
                <h2>
                  Open folder as vault 
                </h2>
                <p class="text-xs opacity-80">
                  Choose an existing folder of Markdown files.
                </p>
              </div>
              <button type="button" onClick={handleSelectVault}>
                Open
              </button>
            </section>
          </div>
        </main>

      </div>
    </div>
  )
};

export default HomeView;
