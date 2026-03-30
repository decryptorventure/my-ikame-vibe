import { EditorContent, EditorContext } from '@tiptap/react';
import { BlockquoteButton } from '@frontend-team/tiptap-kit/components/tiptap-ui/blockquote-button';
import { CodeBlockButton } from '@frontend-team/tiptap-kit/components/tiptap-ui/code-block-button';
import { EmojiDropdownMenu } from '@frontend-team/tiptap-kit/components/tiptap-ui/emoji-dropdown-menu';
import { ImageUploadButton } from '@frontend-team/tiptap-kit/components/tiptap-ui/image-upload-button';
import { LinkPopover } from '@frontend-team/tiptap-kit/components/tiptap-ui/link-popover';
import { ListDropdownMenu } from '@frontend-team/tiptap-kit/components/tiptap-ui/list-dropdown-menu';
import { MarkButton } from '@frontend-team/tiptap-kit/components/tiptap-ui/mark-button';
import { MentionDropdownMenu } from '@frontend-team/tiptap-kit/components/tiptap-ui/mention-dropdown-menu';
import { ImageIcon } from '@frontend-team/tiptap-kit/components/tiptap-icons/image-icon';
import { SmilePlusIcon } from '@frontend-team/tiptap-kit/components/tiptap-icons/smile-plus-icon';
import { Button } from '@frontend-team/tiptap-kit/components/tiptap-ui-primitive/button';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@frontend-team/tiptap-kit/components/tiptap-ui-primitive/toolbar';
import '@/tiptap/chat-box-editor.css';
import { useChatBoxEditor } from '@/tiptap/use-chat-box-editor';
import type { ChatBoxEditorProps } from '@/tiptap/chat-box-editor.types';

export type { ChatBoxContent, ChatBoxEditorProps } from '@/tiptap/chat-box-editor.types';

export function ChatBoxEditor(props: ChatBoxEditorProps) {
  const {
    emoji = true,
    imageUpload = true,
    mention = true,
    toolbar = false,
  } = props;
  const {
    editor,
    handleBlur,
    handleEmojiClick,
    handleFocus,
    handleSend,
    hasContent,
    isCollapsed,
    wrapperRef,
  } = useChatBoxEditor(props);

  return (
    <div ref={wrapperRef} className="chat-box-wrapper" data-collapsed={isCollapsed}>
      <EditorContext.Provider value={{ editor }}>
        {toolbar && !isCollapsed ? (
          <Toolbar className="chat-box-toolbar">
            <ToolbarGroup>
              <MarkButton type="bold" />
              <MarkButton type="italic" />
              <MarkButton type="underline" />
              <MarkButton type="strike" />
              <LinkPopover />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <ListDropdownMenu types={['bulletList', 'orderedList']} />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <CodeBlockButton />
              <BlockquoteButton />
            </ToolbarGroup>
          </Toolbar>
        ) : null}

        <div className="chat-box-inner">
          <EditorContent
            editor={editor}
            role="presentation"
            className="chat-box-editor-content"
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {mention ? <MentionDropdownMenu /> : null}
            {emoji ? <EmojiDropdownMenu /> : null}
          </EditorContent>

          <div className="chat-box-bottom-bar">
            <div className="chat-box-bottom-actions">
              {emoji ? (
                <Button
                  type="button"
                  data-style="ghost"
                  onClick={handleEmojiClick}
                  aria-label="Emoji"
                >
                  <SmilePlusIcon className="tiptap-button-icon" />
                </Button>
              ) : null}

              {imageUpload ? <ImageUploadButton icon={ImageIcon} /> : null}
            </div>

            <button
              type="button"
              className="chat-box-send-button"
              data-has-content={hasContent}
              onClick={handleSend}
              disabled={!hasContent}
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
        </div>
      </EditorContext.Provider>
    </div>
  );
}
