import { describe, expect, it } from "vitest";
import {
  normalizeSpeechLang,
  pickVoiceForLang,
  resolveSpeechLang,
} from "./speechVoices";

function mockVoice(
  partial: Pick<SpeechSynthesisVoice, "lang" | "voiceURI"> &
    Partial<Pick<SpeechSynthesisVoice, "localService" | "default" | "name">>,
): SpeechSynthesisVoice {
  return {
    default: partial.default ?? false,
    lang: partial.lang,
    localService: partial.localService ?? false,
    name: partial.name ?? partial.voiceURI,
    voiceURI: partial.voiceURI,
  } as SpeechSynthesisVoice;
}

describe("speechVoices", () => {
  it("normalizes BCP 47 tags", () => {
    expect(normalizeSpeechLang("en-us")).toBe("en-US");
    expect(normalizeSpeechLang("EN-in")).toBe("en-IN");
  });

  it("resolves explicit lang over document defaults", () => {
    expect(resolveSpeechLang("fr-FR")).toBe("fr-FR");
  });

  it("picks an exact language voice", () => {
    const voices = [
      mockVoice({ lang: "en-US", voiceURI: "en-us", localService: true }),
      mockVoice({ lang: "en-GB", voiceURI: "en-gb" }),
      mockVoice({ lang: "hi-IN", voiceURI: "hi-in" }),
    ];

    const picked = pickVoiceForLang(voices, "en-US");
    expect(picked?.voiceURI).toBe("en-us");
  });

  it("falls back to language prefix when region is missing", () => {
    const voices = [
      mockVoice({ lang: "en-GB", voiceURI: "en-gb", localService: true }),
      mockVoice({ lang: "hi-IN", voiceURI: "hi-in" }),
    ];

    const picked = pickVoiceForLang(voices, "en");
    expect(picked?.voiceURI).toBe("en-gb");
  });

  it("prefers en-US over en-GB when targeting US English", () => {
    const voices = [
      mockVoice({ lang: "en-GB", voiceURI: "en-gb", localService: true, name: "Daniel" }),
      mockVoice({ lang: "en-US", voiceURI: "en-us", name: "Samantha" }),
    ];

    const picked = pickVoiceForLang(voices, "en-US");
    expect(picked?.voiceURI).toBe("en-us");
  });

  it("defaults resolveSpeechLang to en-US", () => {
    expect(resolveSpeechLang()).toBe("en-US");
    expect(resolveSpeechLang(undefined)).toBe("en-US");
  });

  it("uses voiceURI when provided", () => {
    const voices = [
      mockVoice({ lang: "en-US", voiceURI: "voice-a" }),
      mockVoice({ lang: "en-US", voiceURI: "voice-b" }),
    ];

    const picked = pickVoiceForLang(voices, "en-US", "voice-b");
    expect(picked?.voiceURI).toBe("voice-b");
  });
});
