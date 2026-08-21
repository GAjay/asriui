const FETCHED_AT_HEADER = "X-Axiom-Fetched-At";

export const DEFAULT_ASSET_CACHE_NAME = "axiom-assets-v1";
/** 24 hours — cached assets stay local until this interval elapses. */
export const DEFAULT_ASSET_REFETCH_INTERVAL = 24 * 60 * 60 * 1000;
export const DEFAULT_ASSET_CACHE_MAX_ENTRIES = 120;

export type AssetCacheOptions = {
  /** Cache Storage bucket. @default "axiom-assets-v1" */
  cacheName?: string;
  /**
   * Milliseconds a cached asset stays fresh. After this, a background refetch
   * updates the cache without blocking the current view.
   * @default 86400000 (24 hours)
   */
  refetchInterval?: number;
  /** Max cached responses before oldest entries are evicted. @default 120 */
  maxEntries?: number;
};

export type CachedAssetResult = {
  blob: Blob;
  fromCache: boolean;
  stale: boolean;
  fetchedAt: number;
};

type MemoryEntry = {
  blob: Blob;
  fetchedAt: number;
};

const memory = new Map<string, MemoryEntry>();

function memoryKey(cacheName: string, url: string) {
  return `${cacheName}::${url}`;
}

export function isAssetCacheAvailable() {
  return typeof window !== "undefined" && typeof caches !== "undefined";
}

export function peekCachedAsset(url: string, cacheName = DEFAULT_ASSET_CACHE_NAME): MemoryEntry | undefined {
  return memory.get(memoryKey(cacheName, url));
}

function remember(cacheName: string, url: string, blob: Blob, fetchedAt: number) {
  memory.set(memoryKey(cacheName, url), { blob, fetchedAt });
}

function isStale(fetchedAt: number, refetchInterval: number) {
  if (!fetchedAt) return true;
  return Date.now() - fetchedAt >= refetchInterval;
}

async function openCache(cacheName: string) {
  return caches.open(cacheName);
}

async function readFromCache(cache: Cache, url: string): Promise<MemoryEntry | null> {
  const response = await cache.match(url);
  if (!response) return null;
  const fetchedAt = Number(response.headers.get(FETCHED_AT_HEADER) ?? 0);
  const blob = await response.blob();
  return { blob, fetchedAt };
}

async function writeToCache(cache: Cache, url: string, blob: Blob, maxEntries: number) {
  const fetchedAt = Date.now();
  const headers = new Headers({
    "Content-Type": blob.type || "application/octet-stream",
    [FETCHED_AT_HEADER]: String(fetchedAt),
  });
  await cache.put(url, new Response(blob, { status: 200, headers }));
  await evictIfNeeded(cache, maxEntries);
  return fetchedAt;
}

async function evictIfNeeded(cache: Cache, maxEntries: number) {
  const keys = await cache.keys();
  const overflow = keys.length - maxEntries;
  if (overflow <= 0) return;
  await Promise.all(keys.slice(0, overflow).map((request) => cache.delete(request)));
}

async function fetchBlob(url: string, revalidate: boolean) {
  const response = await fetch(url, {
    mode: "cors",
    credentials: "same-origin",
    cache: revalidate ? "no-cache" : "force-cache",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch asset (${response.status}): ${url}`);
  }
  return response.blob();
}

function resolveOptions(options?: AssetCacheOptions) {
  return {
    cacheName: options?.cacheName ?? DEFAULT_ASSET_CACHE_NAME,
    refetchInterval: options?.refetchInterval ?? DEFAULT_ASSET_REFETCH_INTERVAL,
    maxEntries: options?.maxEntries ?? DEFAULT_ASSET_CACHE_MAX_ENTRIES,
  };
}

/**
 * Read a cached asset, falling back to the network. Stale hits are returned
 * immediately so the UI can stay local while a refetch runs.
 */
export async function getCachedAsset(url: string, options?: AssetCacheOptions): Promise<CachedAssetResult> {
  const { cacheName, refetchInterval, maxEntries } = resolveOptions(options);
  const peeked = peekCachedAsset(url, cacheName);
  if (peeked) {
    return {
      blob: peeked.blob,
      fromCache: true,
      stale: isStale(peeked.fetchedAt, refetchInterval),
      fetchedAt: peeked.fetchedAt,
    };
  }

  if (isAssetCacheAvailable()) {
    const cache = await openCache(cacheName);
    const stored = await readFromCache(cache, url);
    if (stored) {
      remember(cacheName, url, stored.blob, stored.fetchedAt);
      return {
        blob: stored.blob,
        fromCache: true,
        stale: isStale(stored.fetchedAt, refetchInterval),
        fetchedAt: stored.fetchedAt,
      };
    }
  }

  const blob = await fetchBlob(url, false);
  const fetchedAt = Date.now();
  remember(cacheName, url, blob, fetchedAt);
  if (isAssetCacheAvailable()) {
    const cache = await openCache(cacheName);
    await writeToCache(cache, url, blob, maxEntries);
  }
  return { blob, fromCache: false, stale: false, fetchedAt };
}

/** Fetch from the network and replace the cached copy. */
export async function revalidateCachedAsset(url: string, options?: AssetCacheOptions): Promise<CachedAssetResult> {
  const { cacheName, maxEntries } = resolveOptions(options);
  const blob = await fetchBlob(url, true);
  const fetchedAt = isAssetCacheAvailable()
    ? await writeToCache(await openCache(cacheName), url, blob, maxEntries)
    : Date.now();
  remember(cacheName, url, blob, fetchedAt);
  return { blob, fromCache: false, stale: false, fetchedAt };
}

/** Warm the cache for a list of URLs without waiting for render. */
export async function prefetchAssets(urls: string[], options?: AssetCacheOptions) {
  await Promise.all(
    urls.filter(Boolean).map(async (url) => {
      try {
        await getCachedAsset(url, options);
      } catch {
        /* skip failed prefetch */
      }
    }),
  );
}

export async function clearAssetCache(cacheName = DEFAULT_ASSET_CACHE_NAME) {
  for (const key of [...memory.keys()]) {
    if (key.startsWith(`${cacheName}::`)) memory.delete(key);
  }
  if (isAssetCacheAvailable()) {
    await caches.delete(cacheName);
  }
}
