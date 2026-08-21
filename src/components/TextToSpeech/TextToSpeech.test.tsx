import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TextToSpeech } from "./TextToSpeech";

describe("TextToSpeech", () => {
  it("renders wrapped text with a speak button", () => {
    render(<TextToSpeech>Hello world</TextToSpeech>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Listen to this text" })).toBeInTheDocument();
  });

  it("speaks derived text when clicked", async () => {
    const user = userEvent.setup();
    const speak = vi.fn();
    const cancel = vi.fn();

    class SpeechSynthesisUtteranceMock {
      text = "";
      lang?: string;
      voice?: SpeechSynthesisVoice;
      rate = 1;
      pitch = 1;
      onend?: () => void;
      onerror?: () => void;
      constructor(text: string) {
        this.text = text;
      }
    }

    const mockVoice = {
      default: true,
      lang: "en-US",
      localService: true,
      name: "English",
      voiceURI: "en-us",
    } as SpeechSynthesisVoice;

    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      configurable: true,
      value: SpeechSynthesisUtteranceMock,
    });
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        speak,
        cancel,
        getVoices: () => [mockVoice],
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
    });

    render(<TextToSpeech lang="en-US">Read this aloud</TextToSpeech>);
    await user.click(screen.getByRole("button", { name: "Listen to this text" }));

    await vi.waitFor(() => expect(speak).toHaveBeenCalled());

    expect(cancel).toHaveBeenCalled();
    const utterance = speak.mock.calls[0]?.[0] as SpeechSynthesisUtteranceMock;
    expect(utterance.text).toBe("Read this aloud");
    expect(utterance.lang).toBe("en-US");
    expect(utterance.voice?.voiceURI).toBe("en-us");
  });
});
