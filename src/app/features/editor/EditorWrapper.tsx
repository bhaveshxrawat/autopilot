import Editor from "./Editor";
import KeyMap from "./KeyMap";

export default function EditorWrapper() {
  return (
    <div className="editor--wrapper">
      <Editor />
      <KeyMap />
    </div>
  );
}
