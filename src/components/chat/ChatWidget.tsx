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
        className="group relative flex min-h-16 items-center gap-3 rounded-full border-2 border-[#77d8ff] bg-[#adc6ff] px-3 py-2 pr-5 text-[#002e69] shadow-[0_0_38px_rgba(119,216,255,0.65)] transition-all duration-300 hover:scale-105 hover:bg-white active:scale-95"
        aria-label={isOpen ? ui.closeChat : ui.openChat}
        aria-expanded={isOpen}
      >
        <span className="absolute -inset-1 -z-10 animate-pulse rounded-full bg-[#77d8ff]/40 blur-md" />
        <span className="relative flex h-12 w-12 overflow-hidden rounded-full border border-[#002e69]/20 bg-[#071423]">
          {isOpen ? (
            <X className="m-auto h-7 w-7 text-white" />
          ) : (
            <img alt="AI Agent" className="h-full w-full object-cover" src={agentAvatar} />
          )}
        </span>
        <span className="hidden text-left text-xs font-black leading-tight sm:block">
          Chat with<br />our AI
        </span>
      </button>
    </div>
  );
};

export default ChatWidget;
