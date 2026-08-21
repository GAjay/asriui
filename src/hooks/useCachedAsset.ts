import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAsriUIConfigOptional } from "../config/AsriUIContext";
import {
  DEFAULT_ASSET_CACHE_NAME,
  getCachedAsset,
  isAssetCacheAvailable,
  peekCachedAsset,
  revalidateCachedAsset,
  type AssetCacheOptions,
} from "../utils/assetCache";

export type UseCachedAssetOptions = AssetCacheOptions & {
  /** When false, skip Cache Storage and return the original URL. @default true */
  enabled?: boolean;
};

export type UseCachedAssetResult = {
  /** Blob URL when cached; original URL if cache is off, unavailable, or fetch failed. */
  src: string | undefined;
  fromCache: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

function revoke(url: string | undefined) {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
}

function resolveDisplaySrc(
  url: string | undefined,
  objectUrl: string | undefined,
  enabled: boolean,
  error: Error | null,
): string | undefined {
  if (!enabled) return url;
  if (objectUrl) return objectUrl;
  if (error || !isAssetCacheAvailable()) return url;
  return undefined;
}

/**
 * Serve a remote image or asset from Cache Storage. Fresh hits never leave the
 * device; stale hits still render locally while a refetch runs in the background.
 */
export function useCachedAsset(url: string | undefined, options?: UseCachedAssetOptions): UseCachedAssetResult {
  const assetsConfig = useAsriUIConfigOptional()?.assets;
  const enabled = (options?.enabled ?? assetsConfig?.cache ?? true) && Boolean(url);
  const cacheOptions = useMemo<AssetCacheOptions>(
    () => ({
      cacheName: options?.cacheName ?? assetsConfig?.cacheName ?? DEFAULT_ASSET_CACHE_NAME,
      refetchInterval: options?.refetchInterval ?? assetsConfig?.refetchInterval,
      maxEntries: options?.maxEntries ?? assetsConfig?.maxEntries,
    }),
    [
      assetsConfig?.cacheName,
      assetsConfig?.maxEntries,
      assetsConfig?.refetchInterval,
      options?.cacheName,
      options?.maxEntries,
      options?.refetchInterval,
    ],
  );

  const cacheName = cacheOptions.cacheName ?? DEFAULT_ASSET_CACHE_NAME;
  const initialPeek = enabled && url ? peekCachedAsset(url, cacheName) : undefined;
  const [objectUrl, setObjectUrl] = useState<string | undefined>(() =>
    initialPeek ? URL.createObjectURL(initialPeek.blob) : undefined,
  );
  const [fromCache, setFromCache] = useState(Boolean(initialPeek));
  const [isLoading, setIsLoading] = useState(Boolean(enabled && url && !initialPeek && isAssetCacheAvailable()));
  const [error, setError] = useState<Error | null>(null);
  const objectUrlRef = useRef(objectUrl);
  objectUrlRef.current = objectUrl;

  const replaceObjectUrl = useCallback((blob: Blob) => {
    const next = URL.createObjectURL(blob);
    revoke(objectUrlRef.current);
    objectUrlRef.current = next;
    setObjectUrl(next);
  }, []);

  const load = useCallback(
    async (force: boolean) => {
      if (!url || !enabled) return;
      setError(null);
      if (!isAssetCacheAvailable()) {
        setIsLoading(false);
        return;
      }
      try {
        const result = force ? await revalidateCachedAsset(url, cacheOptions) : await getCachedAsset(url, cacheOptions);
        replaceObjectUrl(result.blob);
        setFromCache(result.fromCache);
        setIsLoading(false);
        if (!force && result.stale) {
          try {
            const fresh = await revalidateCachedAsset(url, cacheOptions);
            replaceObjectUrl(fresh.blob);
            setFromCache(false);
          } catch {
            /* keep serving the stale local copy */
          }
        }
      } catch (caught) {
        setError(caught instanceof Error ? caught : new Error("Failed to cache asset"));
        setIsLoading(false);
      }
    },
    [cacheOptions, enabled, replaceObjectUrl, url],
  );

  useEffect(() => {
    if (!enabled || !url) {
      setIsLoading(false);
      return;
    }
    void load(false);
    return () => {
      revoke(objectUrlRef.current);
      objectUrlRef.current = undefined;
    };
  }, [enabled, load, url]);

  const refetch = useCallback(() => load(true), [load]);

  return {
    src: resolveDisplaySrc(url, objectUrl, enabled, error),
    fromCache,
    isLoading,
    error,
    refetch,
  };
}
