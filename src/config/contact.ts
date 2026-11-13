/** Public contact details, shared by the Contact page and the chat assistant's fallback. */
export const CONTACT_EMAIL = 'hello@vislybluq.com';
export const PHONE_DISPLAY = '+234 814 269 5808';
export const PHONE_HREF = 'tel:+2348142695808';
/** wa.me needs the number in international format without "+" or spaces. */
export const WHATSAPP_NUMBER = '2348142695808';
export const WHATSAPP_DISPLAY = '+234 814 269 5808';

export const whatsappLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
