import { useState } from 'react';
import { X } from 'lucide-react';
import ChatPanel from './ChatPanel';
import { CHAT_UI } from '../../config/chat';

const agentAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5zGYFRLZiS9CGukcB2ceA_Le6ecX0pFHNsBnGrum3MtVGmQzCdIWnUYXd_ApQqzJFWTmy6dk0NxnHWC0GGd6VSSuuft3cTaI1iHMt0tNvpgY5R555km4X4H3AmkbydJXByJC07V3Bdi92ti7mAENgJXdTPnf0OlVEiffCssDKvM3d0F0GjTQfIUO7kYm_9wWuvQFMJ_P56HLOL3BxNtENTdcvWdRSk8Pwbfb8vRLYJUtodVjIbps_ZF-kIuAhAKp--iKYlXfyggk';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ui = CHAT_UI.en;

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-4 sm:bottom-8 sm:right-8">
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="group relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#adc6ff]/50 bg-[#071423] shadow-[0_0_30px_rgba(173,198,255,0.34)] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label={isOpen ? ui.closeChat : ui.openChat}
        aria-expanded={isOpen}
      >
        <div className="absolute inset-0 animate-pulse bg-[#adc6ff]/20" />
        {isOpen ? (
          <X className="relative z-10 mx-auto h-7 w-7 text-[#d7e3f9]" />
        ) : (
          <img alt="AI Agent" className="relative z-10 h-full w-full object-cover" src={agentAvatar} />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
