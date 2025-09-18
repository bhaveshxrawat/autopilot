import { schema } from "prosemirror-schema-basic";
import { useEffect, useRef } from "react";
import "../editor.css";
import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

export function useEditor(
  placeholder: React.RefObject<HTMLDivElement | null>,
  onChange?: (content: string) => void,
  completion?: string,
) {
  const viewRef = useRef<EditorView | null>(null);
  useEffect(() => {
    if (placeholder.current && !viewRef.current) {
      const editorState = EditorState.create({
        schema,
        plugins: [
          history(),
          keymap({
            "Mod-z": undo,
            "Mod-y": redo,
          }),
          keymap(baseKeymap),
        ],
      });

      const editorView = new EditorView(placeholder.current, {
        state: editorState,
        dispatchTransaction: (tr) => {
          const nextState = editorView.state.apply(tr);
          editorView.updateState(nextState);
          if (onChange) {
            onChange(nextState.doc.textContent);
          }
        },
      });

      viewRef.current = editorView;
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [placeholder.current, onChange]);

  useEffect(() => {
    if (viewRef.current && completion && completion.length > 0) {
      console.log("Inserting");
      const { state, dispatch } = viewRef.current;
      const tr = state.tr.insertText(completion, state.selection.to);
      dispatch(tr);
    }
  }, [completion]);
}
