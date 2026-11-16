import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Edit3, Loader2, Mic, MicOff, Send, Square, Volume2, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import EscalationForm from './EscalationForm';
import ContactFallback from './ContactFallback';
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
    messagesEndRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
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
    <div className="flex h-[min(600px,calc(100dvh-7rem))] w-[calc(100vw-2.5rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-paper-line bg-paper text-body shadow-[0_24px_60px_rgba(15,19,27,0.18)]" role="dialog" aria-label={ui.title}>
      <header className="flex items-center justify-between bg-ink px-5 py-4 text-ink-text">
        <div>
          <h2 className="text-sm font-medium">{ui.title}</h2>
          <p className="mt-0.5 text-xs text-ink-muted">{ui.subtitle}</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-full p-1.5 text-ink-muted hover:bg-white/10 hover:text-ink-text" aria-label={ui.closeChat}>
          <X className="h-5 w-5" />
        </button>
      </header>

      <div className="flex gap-1 overflow-x-auto border-b border-paper-line px-4 py-2">
        {CHAT_LANGUAGES.map((lang) => (
          <button key={lang.code} onClick={() => setLanguage(lang.code)} className={`rounded-full px-2.5 py-1 font-mono text-[10px] ${language === lang.code ? 'bg-body text-white' : 'text-body-muted hover:bg-paper-tint'}`}>
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
        {isLoading && <div className="flex items-center gap-2 text-sm text-body-muted"><Loader2 className="h-4 w-4 animate-spin" />{ui.typing}</div>}
        {error && <ContactFallback message={error} />}
        {showEscalation && <EscalationForm language={language} transcript={buildTranscript()} />}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center justify-center gap-6 border-t border-paper-line px-4 py-2">
        {speechSupported && <button type="button" onClick={toggleMic} title={isListening ? ui.listening : ui.micStart} className="text-body-faint hover:text-body">{isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}</button>}
        {speechSupported && <button type="button" onClick={() => messages.at(-1)?.role === 'assistant' && speak(speechText(messages.at(-1)!.content), langConfig.speech)} title={ui.speakReply} className="text-body-faint hover:text-body"><Volume2 className="h-5 w-5" /></button>}
        <button type="button" onClick={stopSpeaking} title="Stop" className="text-body-faint hover:text-body"><Square className="h-4 w-4" fill="currentColor" /></button>
        <button type="button" onClick={() => setInput(messages.filter((message) => message.role === 'user').at(-1)?.content || '')} title="Edit Query" className="text-body-faint hover:text-body"><Edit3 className="h-5 w-5" /></button>
      </div>

      <footer className="border-t border-paper-line p-4">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={ui.placeholder} disabled={isLoading} className="w-full rounded-full border border-paper-line bg-paper px-4 py-3 pr-12 text-sm text-body outline-none placeholder:text-body-faint focus:border-body focus-visible:ring-0" />
          <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-1.5 rounded-full bg-body p-2 text-white transition-colors hover:bg-brand disabled:opacity-30" aria-label={ui.send}><Send className="h-4 w-4" /></button>
        </form>
        <p className="mt-2 text-center text-[10px] text-body-faint">{ui.poweredBy} · <Link to="/contact" className="underline underline-offset-2 hover:text-body">{ui.contactLink}</Link></p>
      </footer>
    </div>
  );
};

export default ChatPanel;


