import { useState } from 'react';
import { Send } from 'lucide-react';
import { ESCALATION_EMAIL } from '../../config/chat';
import type { ChatLanguageCode } from '../../config/chat';
import { CHAT_UI } from '../../config/chat';

interface EscalationFormProps {
  language: ChatLanguageCode;
  transcript: string;
}

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
      const response = await fetch(`https://formsubmit.co/ajax/${ESCALATION_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: transcript,
          _subject: `VislyBluq AI Escalation: ${name}`,
          _template: 'table',
        }),
      });
      if (response.ok) setSent(true);
      else throw new Error('Failed');
    } catch {
      alert(`Please email ${ESCALATION_EMAIL} directly.`);
    } finally {
      setIsSending(false);
    }
  };

  if (sent) {
    return (
      <p className="text-sm text-emerald-600 font-medium text-center py-2">{ui.escalateSuccess}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-3 bg-visly-gray/80 rounded-xl border border-gray-200">
      <p className="text-sm font-semibold text-visly-dark">{ui.escalateTitle}</p>
      <p className="text-xs text-gray-500">{ui.escalateDesc}</p>
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={ui.escalateName}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-visly-blue"
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={ui.escalateEmail}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-visly-blue"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={ui.escalatePhone}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-visly-blue"
      />
      <button
        type="submit"
        disabled={isSending}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-visly-navy text-white text-sm font-semibold hover:bg-visly-blue disabled:opacity-60 transition-colors"
      >
        <Send className="h-4 w-4" />
        {isSending ? '…' : ui.escalateSubmit}
      </button>
    </form>
  );
};

export default EscalationForm;
