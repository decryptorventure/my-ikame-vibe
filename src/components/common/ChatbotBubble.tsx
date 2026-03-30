import { ChatCircleIcon } from '@phosphor-icons/react';
import { Tooltip } from '@frontend-team/ui-kit';

export default function ChatbotBubble() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Tooltip 
        content={<span className="font-semibold">Chat với iKame AI 🤖</span>}
        side="left"
      >
        <button
          type="button"
          aria-label="Chat with iKame AI"
          className="size-14 radius_round bg_accent_primary text_contrast shadow_xl hover:shadow_m hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center cursor-pointer border border_primary/20 group outline-none"
        >
          <ChatCircleIcon size={32} weight="fill" className="group-hover:rotate-12 transition-transform" />
          <div className="absolute top-0 right-0 size-3.5 bg_error radius_round border-2 border_canvas_primary" />
        </button>
      </Tooltip>
    </div>
  );
}
