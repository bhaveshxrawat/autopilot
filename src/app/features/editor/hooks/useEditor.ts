import { schema } from "prosemirror-schema-basic";
import { useLayoutEffect, useRef } from "react";
import "../editor.css";
import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

export function useEditor(
  placeholder: React.RefObject<HTMLDivElement | null>,
  onChange?: (content: string) => void,
) {
  const viewRef = useRef<EditorView | null>(null);
  useLayoutEffect(() => {
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
  return viewRef;
}
