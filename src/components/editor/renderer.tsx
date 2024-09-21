import { type Component, createEffect, onCleanup } from "solid-js";
import { EditorView } from "@codemirror/view";

const theme = EditorView.baseTheme({
  "&": {
    height: "100%",
    "overflow-y": "auto",
  }
})

const Renderer: Component<{
  content: string
  onContentUpdate: (content: string) => void
}> = (props) => {
  let root: HTMLDivElement | undefined;
  let view: EditorView | undefined;

  createEffect(() => {
    view = new EditorView({
      // state: EditorView.
      doc: props.content,
      parent: root!,
      
      extensions: [
        theme,
        // zebraStripes(),
      ]
    });

    onCleanup(() => {
      view?.destroy();
    })
  });


  return (
    <div class="w-full h-full" ref={root} />
  );
}

export default Renderer;
