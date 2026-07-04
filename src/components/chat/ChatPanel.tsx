import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Loader2, Mic, MicOff, Send, Square, Volume2, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import EscalationForm from './EscalationForm';
import { useSpeech } from '../../hooks/useSpeech';
import { CHAT_API, CHAT_LANGUAGES, CHAT_UI, MAX_CLIENT_MESSAGES, type ChatLanguageCode } from '../../config/chat';

export interface Message { role: 'user' | 'assistant'; content: string }
interface ChatPanelProps { onClose: () => void }
const STORAGE_LANG = 'vislybluq-chat-lang';
const agentAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5zGYFRLZiS9CGukcB2ceA_Le6ecX0pFHNsBnGrum3MtVGmQzCdIWnUYXd_ApQqzJFWTmy6dk0NxnHWC0GGd6VSSuuft3cTaI1iHMt0tNvpgY5R555km4X4H3AmkbydJXByJC07V3Bdi92ti7mAENgJXdTPnf0OlVEiffCssDKvM3d0F0GjTQfIUO7kYm_9wWuvQFMJ_P56HLOL3BxNtENTdcvWdRSk8Pwbfb8vRLYJUtodVjIbps_ZF-kIuAhAKp--iKYlXfyggk';

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
  const { speechSupported, isListening, speak, stopSpeaking, startListening, stopListening } = useSpeech();

  useEffect(() => { sessionStorage.setItem(STORAGE_LANG, language); }, [language]);
  useEffect(() => {
    setMessages((current) =>
      current.length === 0 ? [{ role: 'assistant', content: ui.welcome }] : current
    );
  }, [ui.welcome]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading, showEscalation]);

  const buildTranscript = () => messages.map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n\n');

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    if (userMessageCount >= MAX_CLIENT_MESSAGES) { setShowEscalation(true); return; }
    setError(null);
    const userMsg: Message = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);
    const apiMessages = nextMessages.filter((m, i) => !(i === 0 && m.role === 'assistant' && m.content === CHAT_UI[language].welcome));
    try {
      const res = await fetch(CHAT_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: apiMessages.length > 0 ? apiMessages : [userMsg], language }) });
      const data = (await res.json()) as { reply?: string; shouldEscalate?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error || ui.error);
      const reply = data.reply || ui.error;
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      if (data.shouldEscalate) setShowEscalation(true);
      if (speechSupported) speak(reply, langConfig.speech);
    } catch { setError(ui.error); } finally { setIsLoading(false); }
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };
  const toggleMic = () => isListening ? stopListening() : startListening(langConfig.speech, (transcript) => setInput(transcript));

  return (
    <div className="flex h-[min(600px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#142030]/80 shadow-2xl backdrop-blur-2xl" role="dialog" aria-label={ui.title}>
      <header className="flex items-center justify-between border-b border-white/10 bg-[#101c2c] p-4">
        <div className="flex items-center gap-3"><div className="h-10 w-10 overflow-hidden rounded-full border border-[#adc6ff]/30"><img alt="AI Avatar" className="h-full w-full object-cover" src={agentAvatar}/></div><div><h2 className="text-sm font-bold text-[#d7e3f9]">Visly Intelligence</h2><div className="flex items-center gap-1.5"><span className="h-2 w-2 animate-pulse rounded-full bg-[#77d8ff]"/><span className="text-[10px] uppercase tracking-wider text-[#c2c6d6]">Online</span></div></div></div>
        <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-[#c2c6d6] hover:bg-white/5 hover:text-[#adc6ff]" aria-label={ui.closeChat}><X className="h-5 w-5"/></button>
      </header>
      <div className="flex gap-2 overflow-x-auto border-b border-white/5 px-4 py-2">
        {CHAT_LANGUAGES.map((l) => <button key={l.code} onClick={() => setLanguage(l.code)} className={`rounded-full px-3 py-1 text-[10px] font-bold ${language===l.code?'bg-[#adc6ff] text-[#002e69]':'bg-white/5 text-[#c2c6d6] hover:bg-white/10'}`}>{l.code.toUpperCase()}</button>)}
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg, i) => <ChatMessage key={`${i}-${msg.content.slice(0, 20)}`} role={msg.role} content={msg.content} speakLabel={ui.speakReply} onSpeak={msg.role === 'assistant' && speechSupported ? () => speak(msg.content, langConfig.speech) : undefined}/>) }
        {isLoading && <div className="flex items-center gap-2 text-sm text-[#c2c6d6]"><Loader2 className="h-4 w-4 animate-spin" />{ui.typing}</div>}
        {error && <p className="text-sm text-red-300">{error}</p>}
        {showEscalation && <EscalationForm language={language} transcript={buildTranscript()} />}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center justify-center gap-6 border-t border-white/5 bg-[#030f1e]/45 px-4 py-2">
        {speechSupported && <button type="button" onClick={toggleMic} title={isListening ? ui.listening : ui.micStart} className="text-[#c2c6d6] hover:text-[#77d8ff]">{isListening ? <MicOff className="h-5 w-5"/> : <Mic className="h-5 w-5"/>}</button>}
        {speechSupported && <button type="button" onClick={() => messages.at(-1)?.role === 'assistant' && speak(messages.at(-1)!.content, langConfig.speech)} title={ui.speakReply} className="text-[#c2c6d6] hover:text-[#77d8ff]"><Volume2 className="h-5 w-5"/></button>}
        <button type="button" onClick={stopSpeaking} title="Stop" className="text-red-300 hover:scale-110"><Square className="h-5 w-5" fill="currentColor"/></button>
        <button type="button" onClick={() => setInput(messages.filter((m)=>m.role==='user').at(-1)?.content || '')} title="Edit Query" className="text-[#c2c6d6] hover:text-[#77d8ff]"><Edit3 className="h-5 w-5"/></button>
      </div>
      <footer className="bg-[#101c2c] p-4">
        <form onSubmit={handleSubmit} className="relative flex items-center"><input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask anything..." disabled={isLoading} className="w-full rounded-xl border border-white/10 bg-[#030f1e] px-4 py-3 pr-12 text-sm text-[#d7e3f9] outline-none placeholder:text-[#c2c6d6]/40 focus:border-[#adc6ff]"/><button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 p-2 text-[#adc6ff] transition hover:scale-110 disabled:opacity-40" aria-label={ui.send}><Send className="h-5 w-5"/></button></form>
        <p className="mt-2 text-center text-[10px] text-[#c2c6d6]/60">{ui.poweredBy} · <Link to="/contact" className="text-[#adc6ff] hover:underline">{ui.contactLink}</Link></p>
      </footer>
    </div>
  );
};
export default ChatPanel;


