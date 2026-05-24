import { useCallback, useRef, useState } from 'react';

type SpeechRecognitionType = typeof window extends { webkitSpeechRecognition: infer T }
  ? T
  : never;

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === 'undefined') return null;
  const w = window as Window & {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function useSpeech() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(getSpeechRecognition() && window.speechSynthesis);
  });

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const onResultRef = useRef<((text: string) => void) | null>(null);

  const pickVoice = useCallback((speechLang: string) => {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((v) => v.lang === speechLang) ||
      voices.find((v) => v.lang.startsWith(speechLang.split('-')[0])) ||
      voices[0]
    );
  }, []);

  const speak = useCallback(
    (text: string, speechLang: string) => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = pickVoice(speechLang);
      if (voice) utterance.voice = voice;
      utterance.lang = speechLang;
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [pickVoice]
  );

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const startListening = useCallback(
    (speechLang: string, onResult: (text: string) => void) => {
      const SpeechRecognitionCtor = getSpeechRecognition();
      if (!SpeechRecognitionCtor) {
        setSpeechSupported(false);
        return;
      }

      onResultRef.current = onResult;
      recognitionRef.current?.abort();

      const recognition = new SpeechRecognitionCtor();
      recognition.lang = speechLang;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript?.trim();
        if (transcript) onResultRef.current?.(transcript);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      setIsListening(true);
      recognition.start();
    },
    []
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return {
    speechSupported,
    isListening,
    isSpeaking,
    speak,
    stopSpeaking,
    startListening,
    stopListening,
  };
}
