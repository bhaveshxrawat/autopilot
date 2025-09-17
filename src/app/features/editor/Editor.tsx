"use client";

import { useRef } from "react";
import { useEditor } from "./hooks/useEditor";

interface EditorProps {
  onContentChange: (content: string) => void;
}

export default function Editor({ onContentChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  useEditor(editorRef, onContentChange);
  return <div className="editor" ref={editorRef} />;
}
