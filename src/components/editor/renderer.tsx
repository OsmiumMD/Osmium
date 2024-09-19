import { Component } from "solid-js";

const Renderer: Component<{
  content: string
  onContentUpdate: (content: string) => void
}> = (props) => {
  return (
    <div>
      <textarea
        value={props.content}
        onInput={(e) => props.onContentUpdate(e.currentTarget.value)}
      />
    </div>
  );
}

export default Renderer;
