import { createSignal, createRoot } from "solid-js";

export default createRoot(() => {
  // if null, not selected.
  const [vaultPath, setVaultPathSignal] = createSignal<string | null>(
    localStorage.getItem("lastVaultPath")
  );
  
  const setVaultPath = (path: string): void => {
    setVaultPathSignal(path);
    localStorage.setItem("lastVaultPath", path);
  }
  
  const clearVaultPath = (): void => {
    setVaultPathSignal(null);
    localStorage.removeItem("lastVaultPath");
  };

  return { path: vaultPath, setPath: setVaultPath, clearPath: clearVaultPath };
});
