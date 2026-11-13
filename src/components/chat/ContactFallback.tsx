import { Mail, MessageCircle } from 'lucide-react';
import { CONTACT_EMAIL, whatsappLink } from '../../config/contact';

/** Shown when the assistant or the team form can't send: points people to email or WhatsApp instead. */
const ContactFallback = ({ message }: { message: string }) => (
  <div role="alert" className="rounded-xl border border-white/10 bg-white/5 p-3">
    <p className="text-sm text-[#d7e3f9]">{message}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white hover:border-[#adc6ff]/50">
        <Mail className="h-4 w-4" aria-hidden /> {CONTACT_EMAIL}
      </a>
      <a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-xs font-bold text-[#071423] hover:bg-[#46e57f]">
        <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
      </a>
    </div>
  </div>
);

export default ContactFallback;
