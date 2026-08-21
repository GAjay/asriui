import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { resolveServerQueryFn, executeDatabaseQuery } from "./resolveServerQuery";

describe("resolveServerQueryFn", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("runs custom async functions", async () => {
    const fn = vi.fn().mockResolvedValue({ id: 1 });
    const resolved = resolveServerQueryFn(fn);
    await expect(resolved()).resolves.toEqual({ id: 1 });
  });

  it("resolves named query keys from database config", async () => {
    const resolved = resolveServerQueryFn("users", {
      baseUrl: "https://api.example.com",
      queries: {
        users: "/users",
      },
    });

    await resolved();
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/users",
      expect.objectContaining({ credentials: "same-origin" }),
    );
  });

  it("posts SQL to the configured query endpoint", async () => {
    const resolved = resolveServerQueryFn(
      { sql: "SELECT * FROM users", params: { limit: 5 } },
      { baseUrl: "https://api.example.com", queryEndpoint: "/query" },
    );

    await resolved();
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/query",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ sql: "SELECT * FROM users", params: { limit: 5 } }),
      }),
    );
  });

  it("supports sql: prefixed strings", async () => {
    const resolved = resolveServerQueryFn("sql:SELECT 1", {
      baseUrl: "https://api.example.com",
    });

    await resolved();
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/query",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ sql: "SELECT 1" }),
      }),
    );
  });
});

describe("executeDatabaseQuery", () => {
  it("throws when baseUrl is missing", async () => {
    await expect(executeDatabaseQuery({}, { sql: "SELECT 1" })).rejects.toThrow(/baseUrl/);
  });
});
