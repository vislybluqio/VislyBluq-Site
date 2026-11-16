import { useState } from 'react';
import { Send } from 'lucide-react';
import type { ChatLanguageCode } from '../../config/chat';
import { CHAT_UI } from '../../config/chat';
import ContactFallback from './ContactFallback';
import { useRecaptcha } from '../../hooks/useRecaptcha';

interface EscalationFormProps { language: ChatLanguageCode; transcript: string }

const EscalationForm = ({ language, transcript }: EscalationFormProps) => {
  const ui = CHAT_UI[language];
  const { getRecaptchaToken } = useRecaptcha();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consultationMessage, setConsultationMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setFailed(false);
    try {
      const recaptchaToken = await getRecaptchaToken('chat_escalation');
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          recaptchaToken,
          data: { name, email, phone, message: `${consultationMessage}\n\nChat transcript:\n${transcript}`, source: 'AI chat' },
        }),
      });
      if (response.ok) setSent(true); else throw new Error('Failed');
    } catch { setFailed(true); } finally { setIsSending(false); }
  };

  if (sent) return <p className="rounded-xl bg-paper-tint py-3 text-center text-sm font-medium text-body">{ui.escalateSuccess}</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-2 rounded-2xl border border-paper-line p-3">
      <p className="text-sm font-medium text-body">{ui.escalateTitle}</p>
      <p className="text-xs text-body-muted">{ui.escalateDesc}</p>
      {[['name', name, setName, ui.escalateName, 'text'], ['email', email, setEmail, ui.escalateEmail, 'email'], ['phone', phone, setPhone, ui.escalatePhone, 'text']].map(([key, value, setter, placeholder, type]) => <input key={key as string} required={key !== 'phone'} type={type as string} value={value as string} onChange={(e)=> (setter as React.Dispatch<React.SetStateAction<string>>)(e.target.value)} placeholder={placeholder as string} className="w-full rounded-lg border border-paper-line bg-paper px-3 py-2 text-sm text-body outline-none placeholder:text-body-faint focus:border-body focus-visible:ring-0" />)}
      <textarea required rows={3} value={consultationMessage} onChange={(e) => setConsultationMessage(e.target.value)} placeholder="What do you want to consult about?" className="w-full resize-none rounded-lg border border-paper-line bg-paper px-3 py-2 text-sm text-body outline-none placeholder:text-body-faint focus:border-body focus-visible:ring-0" />
      <button type="submit" disabled={isSending} className="flex w-full items-center justify-center gap-2 rounded-full bg-body py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand disabled:opacity-60"><Send className="h-4 w-4" />{isSending ? '...' : ui.escalateSubmit}</button>
      {failed && <ContactFallback message={ui.error} />}
    </form>
  );
};

export default EscalationForm;
