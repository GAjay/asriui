/** Default speech language — US English. */
export const DEFAULT_SPEECH_LANG = "en-US";

/** Normalize a BCP 47 tag for comparisons (e.g. en-us → en-US). */
export function normalizeSpeechLang(lang: string): string {
  const parts = lang.trim().split("-");
  if (!parts[0]) return DEFAULT_SPEECH_LANG;
  const language = parts[0].toLowerCase();
  const region = parts[1]?.toUpperCase();
  return region ? `${language}-${region}` : language;
}

/** Resolve language for synthesis. Defaults to US English unless `lang` is set. */
export function resolveSpeechLang(lang?: string): string {
  const explicit = lang?.trim();
  if (explicit) return normalizeSpeechLang(explicit);
  return DEFAULT_SPEECH_LANG;
}

function langPrefix(lang: string): string {
  return lang.split("-")[0]?.toLowerCase() ?? lang.toLowerCase();
}

const US_ENGLISH_HINTS = [
  "en-us",
  "us english",
  "english (united states)",
  "english (us)",
  "samantha",
  "aaron",
  "nicky",
  "google us english",
];

function scoreVoiceForLang(voice: SpeechSynthesisVoice, targetLang: string): number {
  const voiceLang = voice.lang.toLowerCase();
  const target = normalizeSpeechLang(targetLang).toLowerCase();
  const targetPrefix = langPrefix(target);

  let score = 0;

  if (voiceLang === target) score += 100;
  else if (langPrefix(voice.lang) === targetPrefix) score += 40;

  if (target === "en-us") {
    if (voiceLang === "en-us") score += 30;
    const label = `${voice.name} ${voice.voiceURI}`.toLowerCase();
    if (US_ENGLISH_HINTS.some((hint) => label.includes(hint))) score += 20;
    if (voiceLang === "en-gb" || voiceLang === "en-au") score -= 15;
  }

  if (voice.localService) score += 5;
  if (!voice.default) score += 2;

  return score;
}

function preferBestVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice {
  return voices.reduce((best, voice) => {
    const bestScore = scoreVoiceForLang(best, lang);
    const voiceScore = scoreVoiceForLang(voice, lang);
    return voiceScore > bestScore ? voice : best;
  });
}

/**
 * Pick the best installed voice for a language. Browsers often ignore `utterance.lang`
 * unless `utterance.voice` is set explicitly.
 */
export function pickVoiceForLang(
  voices: SpeechSynthesisVoice[],
  lang: string,
  voiceURI?: string,
): SpeechSynthesisVoice | undefined {
  if (!voices.length) return undefined;

  if (voiceURI) {
    const byUri = voices.find((voice) => voice.voiceURI === voiceURI);
    if (byUri) return byUri;
  }

  const normalized = normalizeSpeechLang(lang);
  const lower = normalized.toLowerCase();

  const exact = voices.filter((voice) => voice.lang.toLowerCase() === lower);
  if (exact.length) return preferBestVoice(exact, normalized);

  const prefix = langPrefix(normalized);
  const prefixMatches = voices.filter((voice) => langPrefix(voice.lang) === prefix);
  if (prefixMatches.length) return preferBestVoice(prefixMatches, normalized);

  const defaultVoice = voices.find((voice) => voice.default);
  return defaultVoice ?? voices[0];
}

export function getSpeechVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  return window.speechSynthesis.getVoices();
}

/** Voices load asynchronously in Chromium — wait for the catalog before speaking. */
export function waitForSpeechVoices(timeoutMs = 3000): Promise<SpeechSynthesisVoice[]> {
  const initial = getSpeechVoices();
  if (initial.length) return Promise.resolve(initial);

  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return Promise.resolve([]);
  }

  return new Promise((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      window.speechSynthesis.removeEventListener("voiceschanged", onChange);
      window.clearTimeout(timer);
      resolve(getSpeechVoices());
    };

    const onChange = () => finish();
    const timer = window.setTimeout(finish, timeoutMs);

    window.speechSynthesis.addEventListener("voiceschanged", onChange);
    // Chromium may only populate after an explicit getVoices() call.
    window.speechSynthesis.getVoices();
  });
}
