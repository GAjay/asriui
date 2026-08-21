import { describe, expect, it } from "vitest";
import {
  detectCardBrand,
  formatCardNumber,
  formatExpiry,
  isExpiryValid,
  luhnCheck,
  validateCardValues,
} from "./validate";

describe("CardValidation validate helpers", () => {
  it("detects brands from BIN prefixes", () => {
    expect(detectCardBrand("4242424242424242")).toBe("visa");
    expect(detectCardBrand("5555555555554444")).toBe("mastercard");
    expect(detectCardBrand("378282246310005")).toBe("amex");
    expect(detectCardBrand("6011111111111117")).toBe("discover");
  });

  it("formats numbers and expiry", () => {
    expect(formatCardNumber("4242424242424242")).toBe("4242 4242 4242 4242");
    expect(formatCardNumber("378282246310005")).toBe("3782 822463 10005");
    expect(formatExpiry("1228")).toBe("12/28");
  });

  it("passes Luhn for known test numbers", () => {
    expect(luhnCheck("4242424242424242")).toBe(true);
    expect(luhnCheck("378282246310005")).toBe(true);
    expect(luhnCheck("4242424242424241")).toBe(false);
  });

  it("rejects expired dates", () => {
    expect(isExpiryValid("0120", new Date("2026-03-01"))).toBe(false);
    expect(isExpiryValid("1228", new Date("2026-03-01"))).toBe(true);
    expect(isExpiryValid("0326", new Date("2026-03-01"))).toBe(true);
    expect(isExpiryValid("0226", new Date("2026-03-01"))).toBe(false);
  });

  it("validates a complete card payload", () => {
    const errors = validateCardValues({
      number: "4242424242424242",
      expiry: "1228",
      cvc: "123",
      name: "Alex Chen",
    });
    expect(errors).toEqual({});
  });

  it("returns field errors for incomplete cards", () => {
    const errors = validateCardValues({ number: "4242", expiry: "13", cvc: "1", name: "" }, { requireName: true });
    expect(errors.number).toBeTruthy();
    expect(errors.expiry).toBeTruthy();
    expect(errors.cvc).toBeTruthy();
    expect(errors.name).toBeTruthy();
  });
});
