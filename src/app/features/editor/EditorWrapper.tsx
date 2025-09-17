"use client";

import { useMachine } from "@xstate/react";
import { memo, useCallback, useState } from "react";
import Editor from "./Editor";
import KeyMap from "./KeyMap";
import { contentMachine } from "./lib/contentMachine";

const MemoizedKeyMap = memo(KeyMap);

export default function EditorWrapper() {
  // const [content, setContent] = useState("");
  const [state, send] = useMachine(contentMachine);
  // const handleContentChange = useCallback(function handleContentChange(
  //   content: string,
  // ) {
  //   setContent(content);
  // }, []);
  const handleContentSend = useCallback(
    function handleContentSend(content: string) {
      send({ type: "SET", value: content });
    },
    [send],
  );
  return (
    <div className="editor--wrapper">
      <Editor onContentChange={handleContentSend} />
      <MemoizedKeyMap />
    </div>
  );
}
