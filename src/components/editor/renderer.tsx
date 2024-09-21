import { type Component, createEffect, onCleanup, onMount } from "solid-js";
import { EditorView } from "@codemirror/view";
import { File } from "../../types/File";

const theme = EditorView.baseTheme({
  "&": {
    height: "100%",
    "overflow-y": "auto",
  }
})

const Renderer: Component<{
  file: File
  content: string
  onContentUpdate: (content: string) => void
}> = (props) => {
  let root: HTMLDivElement | undefined;
  let view: EditorView | undefined;

  onMount(() => {
    view = new EditorView({
      doc: props.content,
      parent: root!,
      
      extensions: [
        // add base styles for the editor.
        theme,

        // wrap lines.
        EditorView.lineWrapping,

        // save content on change.
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const content = update.state.doc.toString();
            props.onContentUpdate(content)
          }
        })
      ]
    });

  });
  
  onCleanup(() => {
    view?.destroy();
  })

  let filePathBeforeUpdate = props.file.fullPath;

  createEffect(() => {
    if (view) {
      const isSameFile = filePathBeforeUpdate === props.file.fullPath;

      // clear everything and insert updated content.
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: props.content,
        },

        // we should keep user current selection
        // only if the file is the same.
        selection: isSameFile ? view.state.selection : void 0
      });

      if (!isSameFile) {
        // update the reference.
        filePathBeforeUpdate = props.file.fullPath;
      }
    }
  });

  return (
    <div class="w-full h-full" ref={root} />
  );
}

export default Renderer;
