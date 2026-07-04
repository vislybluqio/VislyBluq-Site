import { useState } from 'react';
import { Send } from 'lucide-react';
import { ESCALATION_EMAIL } from '../../config/chat';
import type { ChatLanguageCode } from '../../config/chat';
import { CHAT_UI } from '../../config/chat';

interface EscalationFormProps { language: ChatLanguageCode; transcript: string }

const EscalationForm = ({ language, transcript }: EscalationFormProps) => {
  const ui = CHAT_UI[language];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${ESCALATION_EMAIL}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name, email, phone, message: transcript, _subject: `VislyBluq AI Escalation: ${name}`, _template: 'table' }) });
      if (response.ok) setSent(true); else throw new Error('Failed');
    } catch { alert(`Please email ${ESCALATION_EMAIL} directly.`); } finally { setIsSending(false); }
  };

  if (sent) return <p className="rounded-xl bg-emerald-400/10 py-3 text-center text-sm font-medium text-emerald-200">{ui.escalateSuccess}</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-sm font-semibold text-[#d7e3f9]">{ui.escalateTitle}</p>
      <p className="text-xs text-[#c2c6d6]">{ui.escalateDesc}</p>
      {[['name', name, setName, ui.escalateName, 'text'], ['email', email, setEmail, ui.escalateEmail, 'email'], ['phone', phone, setPhone, ui.escalatePhone, 'text']].map(([key, value, setter, placeholder, type]) => <input key={key as string} required={key !== 'phone'} type={type as string} value={value as string} onChange={(e)=> (setter as React.Dispatch<React.SetStateAction<string>>)(e.target.value)} placeholder={placeholder as string} className="w-full rounded-lg border border-white/10 bg-[#030f1e] px-3 py-2 text-sm text-[#d7e3f9] outline-none placeholder:text-[#c2c6d6]/40 focus:border-[#adc6ff]" />)}
      <button type="submit" disabled={isSending} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#adc6ff] py-2.5 text-sm font-semibold text-[#002e69] disabled:opacity-60"><Send className="h-4 w-4" />{isSending ? '...' : ui.escalateSubmit}</button>
    </form>
  );
};

export default EscalationForm;
