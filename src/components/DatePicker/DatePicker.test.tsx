import { describe, expect, it } from "vitest";
import {
  formatDateValue,
  formatRangeValue,
  isDateDisabled,
  parseDateInput,
  parseRangeInput,
  startOfDay,
} from "./datePicker.utils";

describe("datePicker.utils", () => {
  it("parses and formats US dates", () => {
    const parsed = parseDateInput("08/11/2026", "us", "date");
    expect(parsed).not.toBeNull();
    expect(formatDateValue(parsed!, "us", "date")).toBe("08/11/2026");
  });

  it("parses ISO datetime values", () => {
    const parsed = parseDateInput("2026-08-11 14:30", "iso", "datetime");
    expect(parsed?.getHours()).toBe(14);
    expect(parsed?.getMinutes()).toBe(30);
  });

  it("parses range input", () => {
    const parsed = parseRangeInput("08/01/2026 - 08/15/2026", "us", "date");
    expect(parsed?.from).not.toBeNull();
    expect(parsed?.to).not.toBeNull();
    expect(formatRangeValue(parsed!, "us", "date")).toBe("08/01/2026 - 08/15/2026");
  });

  it("blocks past dates when disablePast is true", () => {
    const yesterday = startOfDay(new Date());
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isDateDisabled(yesterday, { disablePast: true })).toBe(true);
  });
});
