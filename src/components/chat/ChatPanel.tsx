import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Send, Mic, MicOff, Loader2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import EscalationForm from './EscalationForm';
import { useSpeech } from '../../hooks/useSpeech';
import {
  CHAT_API,
  CHAT_LANGUAGES,
  CHAT_UI,
  MAX_CLIENT_MESSAGES,
  type ChatLanguageCode,
} from '../../config/chat';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  onClose: () => void;
}

const STORAGE_LANG = 'vislybluq-chat-lang';

const ChatPanel = ({ onClose }: ChatPanelProps) => {
  const [language, setLanguage] = useState<ChatLanguageCode>(() => {
    const saved = sessionStorage.getItem(STORAGE_LANG) as ChatLanguageCode | null;
    return saved && CHAT_LANGUAGES.some((l) => l.code === saved) ? saved : 'en';
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userMessageCount = messages.filter((m) => m.role === 'user').length;

  const ui = CHAT_UI[language];
  const langConfig = CHAT_LANGUAGES.find((l) => l.code === language)!;
  const { speechSupported, isListening, speak, startListening, stopListening } = useSpeech();

  useEffect(() => {
    sessionStorage.setItem(STORAGE_LANG, language);
  }, [language]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: ui.welcome }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- welcome only when empty
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, showEscalation]);

  const buildTranscript = () =>
    messages.map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n\n');

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    if (userMessageCount >= MAX_CLIENT_MESSAGES) {
      setShowEscalation(true);
      return;
    }

    setError(null);
    const userMsg: Message = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    const apiMessages = nextMessages.filter(
      (m, i) => !(i === 0 && m.role === 'assistant' && m.content === CHAT_UI[language].welcome)
    );

    try {
      const res = await fetch(CHAT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages.length > 0 ? apiMessages : [userMsg],
          language,
        }),
      });

      const data = (await res.json()) as {
        reply?: string;
        shouldEscalate?: boolean;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error || ui.error);
      }

      const reply = data.reply || ui.error;
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);

      if (data.shouldEscalate) {
        setShowEscalation(true);
      }

      if (speechSupported) {
        speak(reply, langConfig.speech);
      }
    } catch {
      setError(ui.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const toggleMic = () => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening(langConfig.speech, (transcript) => {
      setInput(transcript);
    });
  };

  return (
    <div
      className="fixed bottom-20 right-4 sm:right-6 z-50 flex flex-col w-[calc(100vw-2rem)] max-w-[400px] h-[min(560px,calc(100vh-6rem))] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
      role="dialog"
      aria-label={ui.title}
    >
      <header className="flex items-start justify-between gap-2 px-4 py-3 bg-visly-dark text-white shrink-0">
        <div className="min-w-0">
          <h2 className="font-semibold text-sm">{ui.title}</h2>
          <p className="text-xs text-gray-300 truncate">{ui.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as ChatLanguageCode)}
            className="text-xs bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-visly-cyan"
            aria-label="Language"
          >
            {CHAT_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} className="text-visly-dark">
                {l.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={ui.closeChat}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((msg, i) => (
          <ChatMessage
            key={`${i}-${msg.content.slice(0, 20)}`}
            role={msg.role}
            content={msg.content}
            speakLabel={ui.speakReply}
            onSpeak={
              msg.role === 'assistant' && speechSupported
                ? () => speak(msg.content, langConfig.speech)
                : undefined
            }
          />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            {ui.typing}
          </div>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {showEscalation && (
          <EscalationForm language={language} transcript={buildTranscript()} />
        )}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-3 border-t border-gray-100 shrink-0 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          {speechSupported && (
            <button
              type="button"
              onClick={toggleMic}
              className={`shrink-0 p-2.5 rounded-xl border transition-colors ${
                isListening
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'border-gray-200 text-visly-navy hover:bg-visly-gray'
              }`}
              aria-label={isListening ? ui.micStop : ui.micStart}
              title={isListening ? ui.listening : ui.micStart}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={ui.placeholder}
            disabled={isLoading}
            className="flex-1 min-w-0 px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue focus:border-visly-blue"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="shrink-0 p-2.5 rounded-xl bg-visly-navy text-white hover:bg-visly-blue disabled:opacity-50 transition-colors"
            aria-label={ui.send}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <p className="text-[10px] text-gray-400 text-center mt-2">
          {ui.poweredBy} ·{' '}
          <Link to="/contact" className="text-visly-blue hover:underline">
            {ui.contactLink}
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default ChatPanel;
