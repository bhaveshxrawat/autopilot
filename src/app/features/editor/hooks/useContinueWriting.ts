import type { EditorView } from "prosemirror-view";
import { type RefObject, useEffect, useRef } from "react";
export function useContinueWriting(
  ref: RefObject<EditorView | null>,
  data: string,
) {
  const prevCompletionRef = useRef("");
  useEffect(() => {
    if (ref.current && data && data.length > 0) {
      const prev = prevCompletionRef.current;
      // Only insert the new part
      const newPart = data.slice(prev.length);
      if (newPart.length > 0) {
        const { state, dispatch } = ref.current;
        const tr = state.tr.insertText(newPart, state.selection.to);
        dispatch(tr);
      }
      prevCompletionRef.current = data;
    }
    if (data === "" || data === undefined) {
      prevCompletionRef.current = "";
    }
  }, [ref.current, data]);
}
