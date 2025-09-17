import EditorWrapper from "./features/editor/EditorWrapper";
import "./Main.css";

export default function Main() {
  return (
    <main>
      <div className="max-app main--wrapper">
        <h1 className="app-heading">Hey anon!</h1>
        <p className="app-body">
          Start typing. Need a hand? Click on 'Continue Writing' and see AI take
          over.
        </p>
        <EditorWrapper />
      </div>
    </main>
  );
}
