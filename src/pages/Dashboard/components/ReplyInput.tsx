import { Avatar } from '@frontend-team/ui-kit';
import { ChatBoxEditor } from '@/tiptap/chat-box-editor';
import type { ChatBoxContent } from '@/tiptap/chat-box-editor.types';

interface ReplyInputProps {
  onClose: () => void;
  replyToName: string;
}

export default function ReplyInput({ replyToName, onClose }: ReplyInputProps) {
  const handleSend = (content: ChatBoxContent) => {
    console.log('Reply sent:', content);
    onClose();
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar size="xxs" fallback="U" alt="User" />
      <div className="flex-1">
        <ChatBoxEditor
          placeholder={`Trả lời ${replyToName}...`}
          onSend={handleSend}
          toolbar={false}
          emoji={true}
          imageUpload={false}
          mention={false}
        />
      </div>
    </div>
  );
}
