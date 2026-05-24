export type ChatLanguageCode = 'en' | 'fr' | 'es' | 'de' | 'zh';

export interface ChatLanguage {
  code: ChatLanguageCode;
  label: string;
  speech: string;
  gemini: string;
}

export const CHAT_LANGUAGES: ChatLanguage[] = [
  { code: 'en', label: 'English', speech: 'en-US', gemini: 'English' },
  { code: 'fr', label: 'Français', speech: 'fr-FR', gemini: 'French' },
  { code: 'es', label: 'Español', speech: 'es-ES', gemini: 'Spanish' },
  { code: 'de', label: 'Deutsch', speech: 'de-DE', gemini: 'German' },
  { code: 'zh', label: '中文', speech: 'zh-CN', gemini: 'Chinese (Mandarin)' },
];

export const CHAT_API = '/api/chat';
export const ESCALATION_EMAIL = 'vislybluq5@gmail.com';
export const MAX_CLIENT_MESSAGES = 20;

export const CHAT_UI: Record<
  ChatLanguageCode,
  {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    micStart: string;
    micStop: string;
    listening: string;
    welcome: string;
    typing: string;
    error: string;
    escalateTitle: string;
    escalateDesc: string;
    escalateName: string;
    escalateEmail: string;
    escalatePhone: string;
    escalateSubmit: string;
    escalateSuccess: string;
    contactLink: string;
    speakReply: string;
    openChat: string;
    closeChat: string;
    poweredBy: string;
  }
> = {
  en: {
    title: 'VislyBluq Assistant',
    subtitle: 'Ask about our services, tech, or reach our team',
    placeholder: 'Type your message…',
    send: 'Send',
    micStart: 'Voice input',
    micStop: 'Stop listening',
    listening: 'Listening…',
    welcome:
      "Hello! I'm the VislyBluq AI assistant. Ask about our consulting, development, data, or AI services — or say if you'd like to reach our team.",
    typing: 'Thinking…',
    error: 'Something went wrong. Please try again or contact us directly.',
    escalateTitle: 'Connect with our team',
    escalateDesc: "We'll follow up within 24 hours.",
    escalateName: 'Your name',
    escalateEmail: 'Email',
    escalatePhone: 'Phone (optional)',
    escalateSubmit: 'Send to team',
    escalateSuccess: 'Sent! Our team will contact you soon.',
    contactLink: 'Contact page',
    speakReply: 'Listen',
    openChat: 'Chat with VislyBluq',
    closeChat: 'Close chat',
    poweredBy: 'AI assistant • VislyBluq',
  },
  fr: {
    title: 'Assistant VislyBluq',
    subtitle: 'Services, technique ou contact équipe',
    placeholder: 'Écrivez votre message…',
    send: 'Envoyer',
    micStart: 'Entrée vocale',
    micStop: 'Arrêter',
    listening: 'Écoute…',
    welcome:
      "Bonjour ! Je suis l'assistant IA VislyBluq. Posez vos questions sur nos services ou demandez à parler à l'équipe.",
    typing: 'Réflexion…',
    error: 'Erreur. Réessayez ou contactez-nous.',
    escalateTitle: 'Contacter notre équipe',
    escalateDesc: 'Réponse sous 24 h.',
    escalateName: 'Nom',
    escalateEmail: 'E-mail',
    escalatePhone: 'Téléphone (optionnel)',
    escalateSubmit: 'Envoyer',
    escalateSuccess: 'Envoyé ! Nous vous recontacterons.',
    contactLink: 'Page contact',
    speakReply: 'Écouter',
    openChat: 'Discuter avec VislyBluq',
    closeChat: 'Fermer',
    poweredBy: 'Assistant IA • VislyBluq',
  },
  es: {
    title: 'Asistente VislyBluq',
    subtitle: 'Servicios, tecnología o contacto',
    placeholder: 'Escribe tu mensaje…',
    send: 'Enviar',
    micStart: 'Voz',
    micStop: 'Detener',
    listening: 'Escuchando…',
    welcome:
      '¡Hola! Soy el asistente de IA de VislyBluq. Pregunta sobre nuestros servicios o pide hablar con el equipo.',
    typing: 'Pensando…',
    error: 'Error. Inténtalo de nuevo o contáctanos.',
    escalateTitle: 'Hablar con el equipo',
    escalateDesc: 'Respondemos en 24 horas.',
    escalateName: 'Nombre',
    escalateEmail: 'Correo',
    escalatePhone: 'Teléfono (opcional)',
    escalateSubmit: 'Enviar',
    escalateSuccess: '¡Enviado! Te contactaremos pronto.',
    contactLink: 'Contacto',
    speakReply: 'Escuchar',
    openChat: 'Chat con VislyBluq',
    closeChat: 'Cerrar',
    poweredBy: 'Asistente IA • VislyBluq',
  },
  de: {
    title: 'VislyBluq Assistent',
    subtitle: 'Services, Technik oder Teamkontakt',
    placeholder: 'Nachricht eingeben…',
    send: 'Senden',
    micStart: 'Spracheingabe',
    micStop: 'Stopp',
    listening: 'Hört zu…',
    welcome:
      'Hallo! Ich bin der VislyBluq KI-Assistent. Fragen Sie zu unseren Services oder zum Teamkontakt.',
    typing: 'Denke nach…',
    error: 'Fehler. Bitte erneut versuchen oder kontaktieren Sie uns.',
    escalateTitle: 'Team kontaktieren',
    escalateDesc: 'Antwort innerhalb von 24 Stunden.',
    escalateName: 'Name',
    escalateEmail: 'E-Mail',
    escalatePhone: 'Telefon (optional)',
    escalateSubmit: 'Senden',
    escalateSuccess: 'Gesendet! Wir melden uns bald.',
    contactLink: 'Kontaktseite',
    speakReply: 'Anhören',
    openChat: 'Chat mit VislyBluq',
    closeChat: 'Schließen',
    poweredBy: 'KI-Assistent • VislyBluq',
  },
  zh: {
    title: 'VislyBluq 助手',
    subtitle: '服务、技术或联系团队',
    placeholder: '输入消息…',
    send: '发送',
    micStart: '语音输入',
    micStop: '停止',
    listening: '正在听…',
    welcome: '您好！我是 VislyBluq AI 助手。可咨询我们的服务或联系团队。',
    typing: '思考中…',
    error: '出错了，请重试或直接联系我们。',
    escalateTitle: '联系团队',
    escalateDesc: '24 小时内回复。',
    escalateName: '姓名',
    escalateEmail: '邮箱',
    escalatePhone: '电话（选填）',
    escalateSubmit: '发送',
    escalateSuccess: '已发送！我们会尽快联系您。',
    contactLink: '联系页面',
    speakReply: '播放',
    openChat: '与 VislyBluq 聊天',
    closeChat: '关闭',
    poweredBy: 'AI 助手 • VislyBluq',
  },
};
