import { createStore } from "solid-js/store";
import { Panel } from "../types/Panel";

export const [panels, setPanels] = createStore<Panel[]>([]);
export const addPanel = (panel: Panel): void => setPanels((panels) => [...panels, panel]);
