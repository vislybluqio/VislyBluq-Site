import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatPanel from './ChatPanel';
import { CHAT_UI } from '../../config/chat';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ui = CHAT_UI.en;

  return (
    <>
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}

      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={`fixed bottom-4 right-4 sm:right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-gray-700 hover:bg-gray-800'
            : 'bg-gradient-to-br from-visly-navy to-visly-blue hover:from-visly-blue hover:to-visly-cyan'
        } text-white`}
        aria-label={isOpen ? ui.closeChat : ui.openChat}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
};

export default ChatWidget;
