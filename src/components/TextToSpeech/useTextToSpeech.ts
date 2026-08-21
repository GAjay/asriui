import { useCallback, useEffect, useRef, useState } from "react";
import {
  pickVoiceForLang,
  resolveSpeechLang,
  waitForSpeechVoices,
} from "./speechVoices";

type Options = {
  text: string;
  lang?: string;
  voiceURI?: string;
  rate?: number;
  pitch?: number;
};

export function useTextToSpeech({
  text,
  lang = "en-US",
  voiceURI,
  rate = 1,
  pitch = 1,
}: Options) {
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  useEffect(() => {
    if (!supported) return;
    void waitForSpeechVoices();
  }, [supported]);

  const speak = useCallback(() => {
    if (!supported || !text.trim()) return;

    const run = async () => {
      const voices = await waitForSpeechVoices();
      const resolvedLang = resolveSpeechLang(lang);
      const voice = pickVoiceForLang(voices, resolvedLang, voiceURI);

      window.speechSynthesis.cancel();

      // Chromium can drop utterances spoken immediately after cancel().
      await new Promise<void>((resolve) => window.setTimeout(resolve, 50));

      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = voice?.lang ?? resolvedLang;
      if (voice) utterance.voice = voice;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      utteranceRef.current = utterance;
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    };

    void run();
  }, [lang, pitch, rate, supported, text, voiceURI]);

  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported]);

  return { speak, stop, speaking, supported };
}
