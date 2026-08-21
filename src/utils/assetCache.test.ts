import { afterEach, describe, expect, it, vi } from "vitest";
import {
  clearAssetCache,
  DEFAULT_ASSET_CACHE_NAME,
  getCachedAsset,
  peekCachedAsset,
  revalidateCachedAsset,
} from "./assetCache";

function installCacheMock() {
  const buckets = new Map<string, Map<string, Response>>();
  const cachesMock: CacheStorage = {
    open: async (name) => {
      if (!buckets.has(name)) buckets.set(name, new Map());
      const store = buckets.get(name)!;
      return {
        match: async (request: RequestInfo) => {
          const key = typeof request === "string" ? request : request.url;
          return store.get(key)?.clone() ?? undefined;
        },
        put: async (request: RequestInfo, response: Response) => {
          const key = typeof request === "string" ? request : request.url;
          store.set(key, response);
        },
        keys: async () => [...store.keys()].map((url) => ({ url }) as Request),
        delete: async (request: RequestInfo) => {
          const key = typeof request === "string" ? request : request.url;
          return store.delete(key);
        },
        add: async () => undefined,
        addAll: async () => undefined,
        matchAll: async () => [],
      } as unknown as Cache;
    },
    delete: async (name) => buckets.delete(name),
    has: async (name) => buckets.has(name),
    keys: async () => [...buckets.keys()],
    match: async () => undefined,
  };
  vi.stubGlobal("caches", cachesMock);
}

afterEach(async () => {
  await clearAssetCache();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("assetCache", () => {
  it("stores a fetched blob and serves later reads from cache", async () => {
    installCacheMock();
    const blob = new Blob(["img"], { type: "image/png" });
    const fetchMock = vi.fn().mockResolvedValue(new Response(blob, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const first = await getCachedAsset("https://cdn.example.com/hero.png");
    const second = await getCachedAsset("https://cdn.example.com/hero.png");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(first.fromCache).toBe(false);
    expect(second.fromCache).toBe(true);
    expect(peekCachedAsset("https://cdn.example.com/hero.png", DEFAULT_ASSET_CACHE_NAME)?.blob).toBeDefined();
  });

  it("refetches when asked to revalidate", async () => {
    installCacheMock();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(new Blob(["a"]), { status: 200 }))
      .mockResolvedValueOnce(new Response(new Blob(["b"]), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await getCachedAsset("https://cdn.example.com/icon.svg");
    const next = await revalidateCachedAsset("https://cdn.example.com/icon.svg");

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(next.fromCache).toBe(false);
    expect(next.stale).toBe(false);
  });

  it("marks entries stale after refetchInterval", async () => {
    installCacheMock();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(new Blob(["x"]), { status: 200 })));

    await getCachedAsset("https://cdn.example.com/stale.png", { refetchInterval: 0 });
    const result = await getCachedAsset("https://cdn.example.com/stale.png", { refetchInterval: 0 });
    expect(result.fromCache).toBe(true);
    expect(result.stale).toBe(true);
  });
});
