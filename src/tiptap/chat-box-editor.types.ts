import type { JSONContent } from '@tiptap/react';

export interface ChatBoxContent {
  html: string;
  json: JSONContent;
  text: string;
}

export interface ChatBoxEditorProps {
  emoji?: boolean;
  imageUpload?: boolean;
  mention?: boolean;
  onSend?: (content: ChatBoxContent) => void;
  placeholder?: string;
  toolbar?: boolean;
}
