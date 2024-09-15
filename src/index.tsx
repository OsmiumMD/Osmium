/* @refresh reload */
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import { render } from "solid-js/web";
import AppRouter from "./router";

render(() => <AppRouter />, document.getElementById("root") as HTMLElement);
