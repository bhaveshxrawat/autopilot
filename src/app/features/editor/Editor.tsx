"use client";

import { useCompletion } from "@ai-sdk/react";
import { SparkleIcon, StopCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { useMachine } from "@xstate/react";
import { useCallback, useRef } from "react";
import { toast } from "sonner";
import Button from "@/app/components/ui/Button";
import { useContinueWriting } from "./hooks/useContinueWriting";
import { useEditor } from "./hooks/useEditor";
import { contentMachine } from "./lib/contentMachine";

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [state, send] = useMachine(contentMachine);
  const handleContentSend = useCallback(
    function handleContentSend(content: string) {
      send({ type: "SET", value: content });
    },
    [send],
  );
  const { completion, complete, isLoading, stop } = useCompletion({
    api: "/api/continuewriting",
    id: "continuewriting",
    onError(error) {
      console.log(error.message);
      toast.error(error.message);
    },
  });
  useEditor(editorRef, handleContentSend, completion);
  // useContinueWriting(editorRef, completion)
  async function handleContinueWriting() {
    const input = state.context.content;
    if (input.trim() === "") {
      toast.error("Must enter something for AI to write up on");
      return;
    }
    await complete(input);
  }
  return (
    <div className="prose-editor">
      <div className="editor" ref={editorRef} />
      <Button
        className="prose-editor-btn"
        onClick={isLoading ? stop : handleContinueWriting}
      >
        {isLoading ? (
          <>
            <StopCircleIcon /> Stop
          </>
        ) : (
          <>
            <SparkleIcon /> Continue Writing
          </>
        )}
      </Button>
    </div>
  );
}
