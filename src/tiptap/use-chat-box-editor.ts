import { useCallback, useEffect, useRef, useState } from 'react';
import { Emoji, gitHubEmojis } from '@tiptap/extension-emoji';
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { Mention } from '@tiptap/extension-mention';
import { Placeholder, Selection } from '@tiptap/extensions';
import { ImageUploadNode } from '@frontend-team/tiptap-kit/components/tiptap-node/image-upload-node/image-upload-node-extension';
import { handleImageUpload, MAX_FILE_SIZE } from '@frontend-team/tiptap-kit/lib/tiptap-utils';
import { StarterKit } from '@tiptap/starter-kit';
import { useEditor } from '@tiptap/react';
import type { JSONContent } from '@tiptap/react';
import type { ChatBoxEditorProps } from '@/tiptap/chat-box-editor.types';

const EMPTY_CONTENT: JSONContent = { type: 'doc', content: [] };

export function useChatBoxEditor({
  placeholder = 'Type a message...',
  onSend,
  toolbar = false,
  emoji = true,
  imageUpload = true,
  mention = true,
}: ChatBoxEditorProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [hasContent, setHasContent] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleSendRef = useRef<() => void>(() => undefined);
  const isSuggestionMenuOpenRef = useRef<() => boolean>(() => false);

  const suggestionSelector = [
    mention ? '[data-selector="tiptap-mention-dropdown-menu"]' : null,
    emoji ? '[data-selector="tiptap-emoji-dropdown-menu"]' : null,
  ].filter(Boolean).join(', ');

  const getSuggestionMenus = useCallback(() => {
    if (!suggestionSelector) {
      return [];
    }

    return Array.from(document.querySelectorAll<HTMLElement>(suggestionSelector));
  }, [suggestionSelector]);

  const isSuggestionMenuOpen = useCallback(
    () => getSuggestionMenus().length > 0,
    [getSuggestionMenus],
  );

  useEffect(() => { isSuggestionMenuOpenRef.current = isSuggestionMenuOpen; }, [isSuggestionMenuOpen]);

  const isSuggestionMenuTarget = useCallback(
    (target: EventTarget | null) => {
      if (!(target instanceof Node)) {
        return false;
      }

      return getSuggestionMenus().some((menu) => menu.contains(target));
    },
    [getSuggestionMenus],
  );

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocapitalize: 'off',
        autocorrect: 'off',
        'aria-label': 'Chat message input',
        class: 'chat-box-editor',
      },
      handleKeyDown: (_view, event) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.metaKey && !event.ctrlKey) {
          if (isSuggestionMenuOpenRef.current()) {
            return false;
          }

          event.preventDefault();
          handleSendRef.current();
          return true;
        }

        return false;
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        heading: toolbar ? {} : false,
        codeBlock: toolbar ? {} : false,
        blockquote: toolbar ? {} : false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      Placeholder.configure({ placeholder }),
      Selection,
      Highlight.configure({ multicolor: true }),
      ...(mention ? [Mention] : []),
      ...(emoji
        ? [Emoji.configure({
            emojis: gitHubEmojis.filter((item) => !item.name.includes('regional')),
            forceFallbackImages: true,
          })]
        : []),
      ...(imageUpload
        ? [
            Image,
            ImageUploadNode.configure({
              accept: 'image/*',
              maxSize: MAX_FILE_SIZE,
              limit: 3,
              upload: handleImageUpload,
              onError: (error: unknown) => console.error('Upload failed:', error),
            }),
          ]
        : []),
    ],
    content: EMPTY_CONTENT,
    onUpdate: ({ editor: currentEditor }) => {
      setHasContent(!currentEditor.isEmpty);
    },
  });

  const handleSend = useCallback(() => {
    if (!editor || editor.isEmpty) {
      return;
    }

    onSend?.({
      json: editor.getJSON(),
      html: editor.getHTML(),
      text: editor.getText(),
    });
    editor.commands.clearContent(true);
    editor.commands.blur();
    setHasContent(false);
    setIsCollapsed(true);
  }, [editor, onSend]);

  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

  const handleFocus = useCallback(() => { setIsCollapsed(false); }, []);

  const handleBlur = useCallback(() => {
    if (!editor) {
      return;
    }

    requestAnimationFrame(() => {
      if (wrapperRef.current?.contains(document.activeElement)) {
        return;
      }

      if (isSuggestionMenuTarget(document.activeElement)) {
        return;
      }

      if (editor.isEmpty) {
        setIsCollapsed(true);
      }
    });
  }, [editor, isSuggestionMenuTarget]);

  useEffect(() => {
    if (editor) setHasContent(!editor.isEmpty);
  }, [editor]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current?.contains(event.target as Node) || isSuggestionMenuTarget(event.target)) {
        return;
      }

      if (editor.isEmpty) {
        setIsCollapsed(true);
        editor.commands.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editor, isSuggestionMenuTarget]);

  const handleEmojiClick = useCallback(() => {
    setIsCollapsed(false);
    editor?.chain().focus().insertContent(':').run();
  }, [editor]);

  return { editor, handleBlur, handleEmojiClick, handleFocus, handleSend, hasContent, isCollapsed, wrapperRef };
}
