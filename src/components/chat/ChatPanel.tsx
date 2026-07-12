import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Edit3, Loader2, Mic, MicOff, Send, Square, Volume2, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import EscalationForm from './EscalationForm';
import { useSpeech } from '../../hooks/useSpeech';
import {
  CHAT_API,
  CHAT_FEEDBACK_API,
  CHAT_LANGUAGES,
  CHAT_UI,
  MAX_CLIENT_MESSAGES,
  type ChatLanguageCode,
} from '../../config/chat';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MemoryExchange {
  user: string;
  assistant: string;
}

interface ChatPanelProps {
  onClose: () => void;
}

const STORAGE_LANG = 'vislybluq-chat-lang';
const STORAGE_SESSION = 'vislybluq-chat-session';
const STORAGE_MEMORY = 'vislybluq-chat-memory';
const MAX_MEMORY_EXCHANGES = 10;
const formatAssistantText = (text: string) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '\u2022 ')
    .replace(/\s\*\s/g, ' \u2022 ')
    .trim();

const speechText = (text: string) =>
  formatAssistantText(text)
    .replace(/^\u2022\s*/gm, '')
    .replace(/\u2022/g, ', ');

const agentAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5zGYFRLZiS9CGukcB2ceA_Le6ecX0pFHNsBnGrum3MtVGmQzCdIWnUYXd_ApQqzJFWTmy6dk0NxnHWC0GGd6VSSuuft3cTaI1iHMt0tNvpgY5R555km4X4H3AmkbydJXByJC07V3Bdi92ti7mAENgJXdTPnf0OlVEiffCssDKvM3d0F0GjTQfIUO7kYm_9wWuvQFMJ_P56HLOL3BxNtENTdcvWdRSk8Pwbfb8vRLYJUtodVjIbps_ZF-kIuAhAKp--iKYlXfyggk';

const readMemory = (): MemoryExchange[] => {
  try {
    const raw = localStorage.getItem(STORAGE_MEMORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is MemoryExchange =>
        Boolean(
          item &&
            typeof item === 'object' &&
            typeof (item as MemoryExchange).user === 'string' &&
            typeof (item as MemoryExchange).assistant === 'string'
        )
      )
      .slice(-MAX_MEMORY_EXCHANGES);
  } catch {
    return [];
  }
};

const writeMemory = (memory: MemoryExchange[]) => {
  localStorage.setItem(STORAGE_MEMORY, JSON.stringify(memory.slice(-MAX_MEMORY_EXCHANGES)));
};

const rememberExchange = (user: string, assistant: string) => {
  writeMemory([...readMemory(), { user, assistant }].slice(-MAX_MEMORY_EXCHANGES));
};
const getSessionId = () => {
  const existing = sessionStorage.getItem(STORAGE_SESSION);
  if (existing) return existing;
  const next = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  sessionStorage.setItem(STORAGE_SESSION, next);
  return next;
};

const ChatPanel = ({ onClose }: ChatPanelProps) => {
  const [language, setLanguage] = useState<ChatLanguageCode>(() => {
    const saved = sessionStorage.getItem(STORAGE_LANG) as ChatLanguageCode | null;
    return saved && CHAT_LANGUAGES.some((lang) => lang.code === saved) ? saved : 'en';
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedbackByMessage, setFeedbackByMessage] = useState<Record<string, 'up' | 'down'>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef('');
  const location = useLocation();
  const userMessageCount = messages.filter((message) => message.role === 'user').length;
  const ui = CHAT_UI[language];
  const langConfig = CHAT_LANGUAGES.find((lang) => lang.code === language)!;
  const { speechSupported, isListening, speak, stopSpeaking, startListening, stopListening } = useSpeech();

  if (!sessionIdRef.current && typeof window !== 'undefined') {
    sessionIdRef.current = getSessionId();
  }

  useEffect(() => {
    stopSpeaking();
    return () => stopSpeaking();
  }, [stopSpeaking]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_LANG, language);
    stopSpeaking();
  }, [language, stopSpeaking]);

  useEffect(() => {
    setMessages((current) =>
      current.length === 0 ? [{ role: 'assistant', content: ui.welcome }] : current
    );
  }, [ui.welcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, showEscalation]);

  const buildTranscript = () =>
    messages.map((message) => `${message.role === 'user' ? 'User' : 'Assistant'}: ${message.content}`).join('\n\n');

  const findPreviousUserMessage = (assistantIndex: number) => {
    for (let index = assistantIndex - 1; index >= 0; index -= 1) {
      if (messages[index]?.role === 'user') return messages[index].content;
    }
    return '';
  };

  const sendFeedback = async (assistantIndex: number, rating: 'up' | 'down') => {
    const assistantMessage = messages[assistantIndex];
    if (!assistantMessage || assistantMessage.role !== 'assistant') return;

    const feedbackKey = `${assistantIndex}-${assistantMessage.content.slice(0, 40)}`;
    setFeedbackByMessage((current) => ({ ...current, [feedbackKey]: rating }));

    try {
      await fetch(CHAT_FEEDBACK_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          language,
          route: location.pathname,
          sessionId: sessionIdRef.current,
          userMessage: findPreviousUserMessage(assistantIndex),
          assistantMessage: assistantMessage.content,
        }),
      });
    } catch (feedbackError) {
      console.warn('Unable to log chat feedback', feedbackError);
    }
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    if (userMessageCount >= MAX_CLIENT_MESSAGES) {
      setShowEscalation(true);
      return;
    }

    stopSpeaking();
    setError(null);
    const userMsg: Message = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    const apiMessages = nextMessages.filter(
      (message, index) => !(index === 0 && message.role === 'assistant' && message.content === CHAT_UI[language].welcome)
    );

    try {
      const response = await fetch(CHAT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages.length > 0 ? apiMessages : [userMsg],
          language,
          memory: readMemory(),
        }),
      });
      const data = (await response.json()) as {
        reply?: string;
        shouldEscalate?: boolean;
        error?: string;
      };
      if (!response.ok) throw new Error(data.error || ui.error);

      const reply = formatAssistantText(data.reply || ui.error);
      stopSpeaking();
      rememberExchange(trimmed, reply);
      setMessages((current) => [...current, { role: 'assistant', content: reply }]);
      if (data.shouldEscalate) setShowEscalation(true);
    } catch {
      stopSpeaking();
      setError(ui.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage(input);
  };

  const toggleMic = () => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening(langConfig.speech, (transcript) => setInput(transcript));
  };

  return (
    <div className="flex h-[min(600px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#142030]/80 shadow-2xl backdrop-blur-2xl" role="dialog" aria-label={ui.title}>
      <header className="flex items-center justify-between border-b border-white/10 bg-[#101c2c] p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-[#adc6ff]/30">
            <img alt="AI Avatar" className="h-full w-full object-cover" src={agentAvatar} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#d7e3f9]">Visly Intelligence</h2>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#77d8ff]" />
              <span className="text-[10px] uppercase tracking-wider text-[#c2c6d6]">Online</span>
            </div>
          </div>
        </div>
        <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-[#c2c6d6] hover:bg-white/5 hover:text-[#adc6ff]" aria-label={ui.closeChat}>
          <X className="h-5 w-5" />
        </button>
      </header>

      <div className="flex gap-2 overflow-x-auto border-b border-white/5 px-4 py-2">
        {CHAT_LANGUAGES.map((lang) => (
          <button key={lang.code} onClick={() => setLanguage(lang.code)} className={`rounded-full px-3 py-1 text-[10px] font-bold ${language === lang.code ? 'bg-[#adc6ff] text-[#002e69]' : 'bg-white/5 text-[#c2c6d6] hover:bg-white/10'}`}>
            {lang.code.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => {
          const feedbackKey = `${index}-${message.content.slice(0, 40)}`;
          return (
            <ChatMessage
              key={`${index}-${message.content.slice(0, 20)}`}
              role={message.role}
              content={message.content}
              speakLabel={ui.speakReply}
              onSpeak={message.role === 'assistant' && speechSupported ? () => speak(speechText(message.content), langConfig.speech) : undefined}
              onFeedback={message.role === 'assistant' ? (rating) => sendFeedback(index, rating) : undefined}
              feedbackValue={feedbackByMessage[feedbackKey] || null}
            />
          );
        })}
        {isLoading && <div className="flex items-center gap-2 text-sm text-[#c2c6d6]"><Loader2 className="h-4 w-4 animate-spin" />{ui.typing}</div>}
        {error && <p className="text-sm text-red-300">{error}</p>}
        {showEscalation && <EscalationForm language={language} transcript={buildTranscript()} />}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center justify-center gap-6 border-t border-white/5 bg-[#030f1e]/45 px-4 py-2">
        {speechSupported && <button type="button" onClick={toggleMic} title={isListening ? ui.listening : ui.micStart} className="text-[#c2c6d6] hover:text-[#77d8ff]">{isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}</button>}
        {speechSupported && <button type="button" onClick={() => messages.at(-1)?.role === 'assistant' && speak(speechText(messages.at(-1)!.content), langConfig.speech)} title={ui.speakReply} className="text-[#c2c6d6] hover:text-[#77d8ff]"><Volume2 className="h-5 w-5" /></button>}
        <button type="button" onClick={stopSpeaking} title="Stop" className="text-red-300 hover:scale-110"><Square className="h-5 w-5" fill="currentColor" /></button>
        <button type="button" onClick={() => setInput(messages.filter((message) => message.role === 'user').at(-1)?.content || '')} title="Edit Query" className="text-[#c2c6d6] hover:text-[#77d8ff]"><Edit3 className="h-5 w-5" /></button>
      </div>

      <footer className="bg-[#101c2c] p-4">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask anything..." disabled={isLoading} className="w-full rounded-xl border border-white/10 bg-[#030f1e] px-4 py-3 pr-12 text-sm text-[#d7e3f9] outline-none placeholder:text-[#c2c6d6]/40 focus:border-[#adc6ff]" />
          <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 p-2 text-[#adc6ff] transition hover:scale-110 disabled:opacity-40" aria-label={ui.send}><Send className="h-5 w-5" /></button>
        </form>
        <p className="mt-2 text-center text-[10px] text-[#c2c6d6]/60">{ui.poweredBy} · <Link to="/contact" className="text-[#adc6ff] hover:underline">{ui.contactLink}</Link></p>
      </footer>
    </div>
  );
};

export default ChatPanel;


