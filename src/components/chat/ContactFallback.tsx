import { Mail, MessageCircle } from 'lucide-react';
import { CONTACT_EMAIL, whatsappLink } from '../../config/contact';

/** Shown when the assistant or the team form can't send: points people to email or WhatsApp instead. */
const ContactFallback = ({ message }: { message: string }) => (
  <div role="alert" className="rounded-xl border border-paper-line bg-paper-tint p-3">
    <p className="text-sm text-body">{message}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 rounded-full border border-paper-line bg-paper px-3 py-2 text-xs font-medium text-body hover:border-body">
        <Mail className="h-4 w-4" aria-hidden /> {CONTACT_EMAIL}
      </a>
      <a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-body px-3 py-2 text-xs font-medium text-white hover:bg-brand">
        <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
      </a>
    </div>
  </div>
);

export default ContactFallback;
