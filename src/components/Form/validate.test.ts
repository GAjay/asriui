import { describe, expect, it } from "vitest";
import { buildInitialValues, resolveFieldRules, validateField, validateForm } from "./validate";

describe("validateForm", () => {
  it("validates required fields", () => {
    const errors = validateForm(
      [{ name: "email", type: "email", label: "Email", required: true }],
      { email: "" },
    );
    expect(errors.email).toBe("Email is required");
  });

  it("validates regex pattern with custom message", () => {
    const errors = validateForm(
      [
        {
          name: "code",
          type: "text",
          label: "Invite code",
          pattern: "^[A-Z]{3}-\\d{4}$",
          patternMessage: "Use format ABC-1234",
        },
      ],
      { code: "abc-1234" },
    );
    expect(errors.code).toBe("Use format ABC-1234");
  });

  it("validates explicit rules array", () => {
    const errors = validateForm(
      [
        {
          name: "username",
          type: "text",
          label: "Username",
          rules: [
            { type: "required" },
            { type: "minLength", value: 3 },
            { type: "pattern", value: "^[a-z0-9_]+$", message: "Use lowercase letters, numbers, or underscores" },
            { type: "notOneOf", values: ["admin", "root"], message: "That username is reserved" },
          ],
        },
      ],
      { username: "admin" },
    );
    expect(errors.username).toBe("That username is reserved");
  });

  it("validates cross-field matches", () => {
    const fields = [
      { name: "password", type: "password" as const, label: "Password", required: true },
      { name: "confirm", type: "password" as const, label: "Confirm password", matches: "password" },
    ];
    const errors = validateForm(fields, { password: "secret123", confirm: "different" });
    expect(errors.confirm).toBe("Confirm password must match Password");
  });

  it("validates notEqual across fields", () => {
    const fields = [
      { name: "currentEmail", type: "email" as const, label: "Current email" },
      { name: "newEmail", type: "email" as const, label: "New email", notEqual: "currentEmail" },
    ];
    const errors = validateForm(fields, {
      currentEmail: "you@company.com",
      newEmail: "you@company.com",
    });
    expect(errors.newEmail).toBe("New email must be different from Current email");
  });

  it("validates uniqueAmong fields", () => {
    const fields = [
      { name: "primary", type: "text" as const, label: "Primary tag" },
      {
        name: "secondary",
        type: "text" as const,
        label: "Secondary tag",
        uniqueAmong: ["primary", "secondary"],
      },
    ];
    const errors = validateForm(fields, { primary: "docs", secondary: "docs" });
    expect(errors.secondary).toBe("Secondary tag must be unique");
  });

  it("merges shorthand props into rules", () => {
    const rules = resolveFieldRules({
      name: "age",
      type: "text",
      label: "Age",
      required: true,
      min: 18,
      max: 120,
      maxLength: 3,
    });
    expect(rules.map((rule) => rule.type)).toEqual(["required", "maxLength", "min", "max"]);
  });
});

describe("validateField custom validator", () => {
  it("runs programmatic validate function", () => {
    const error = validateField(
      {
        name: "slug",
        type: "text",
        label: "Slug",
        validate: (value) => (String(value).includes(" ") ? "Slug cannot contain spaces" : undefined),
      },
      { slug: "bad slug" },
      [],
    );
    expect(error).toBe("Slug cannot contain spaces");
  });
});

describe("buildInitialValues", () => {
  it("builds defaults for mixed field types", () => {
    expect(
      buildInitialValues(
        [
          { name: "name", type: "text", label: "Name", defaultValue: "Ada" },
          { name: "terms", type: "switch", label: "Terms" },
        ],
        { terms: true },
      ),
    ).toEqual({ name: "Ada", terms: true });
  });
});
