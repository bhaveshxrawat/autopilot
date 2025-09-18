import type { EditorView } from "prosemirror-view";
import { type RefObject, useEffect } from "react";
export function useContinueWriting(
  editorRef: RefObject<EditorView | null>,
  data: string,
) {
  useEffect(() => {
    if (editorRef.current && data && data.length > 0) {
      console.log("Inserting");
      const { state, dispatch } = editorRef.current;
      const tr = state.tr.insertText(data, state.selection.to);
      dispatch(tr);
    }
  }, [editorRef.current, data]);
}
