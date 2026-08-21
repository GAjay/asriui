import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../src/components/Icon";
import { getFlatComponents } from "./landingNavData";
import styles from "./LandingPage.module.css";

const MAX_SUGGESTIONS = 8;

export function LandingHeaderSearch() {
  const navigate = useNavigate();
  const listId = useId();
  const rootRef = useRef<HTMLFormElement | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const flatComponents = useMemo(() => getFlatComponents(), []);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return flatComponents
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.slug.includes(q),
      )
      .slice(0, MAX_SUGGESTIONS);
  }, [flatComponents, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function goTo(slug: string) {
    setQuery("");
    setOpen(false);
    navigate(`/docs/components/${slug}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const match = suggestions[activeIndex] ?? suggestions[0];
    if (match) {
      goTo(match.slug);
      return;
    }
    if (query.trim()) navigate(`/docs?q=${encodeURIComponent(query.trim())}`);
    else navigate("/docs");
  }

  return (
    <form
      ref={rootRef}
      className={styles.search}
      onSubmit={handleSubmit}
      role="search"
      autoComplete="off"
    >
      <label className={styles.srOnly} htmlFor="component-search">
        Search components
      </label>
      <Icon name="grid" size="sm" className={styles.searchIcon} />
      <input
        id="component-search"
        className={styles.searchInput}
        type="search"
        placeholder="Search components..."
        value={query}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open && suggestions.length > 0}
        aria-controls={listId}
        aria-activedescendant={
          open && suggestions[activeIndex] ? `${listId}-${suggestions[activeIndex]!.slug}` : undefined
        }
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (!suggestions.length) return;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            setActiveIndex((index) => (index + 1) % suggestions.length);
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length);
          } else if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
          }
        }}
      />

      {open && suggestions.length > 0 ? (
        <ul id={listId} className={styles.searchSuggestions} role="listbox" aria-label="Component suggestions">
          {suggestions.map((item, index) => {
            const active = index === activeIndex;
            return (
              <li key={item.slug} role="presentation">
                <button
                  id={`${listId}-${item.slug}`}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={active ? `${styles.searchSuggestion} ${styles.searchSuggestionActive}` : styles.searchSuggestion}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => goTo(item.slug)}
                >
                  <span className={styles.searchSuggestionName}>{item.name}</span>
                  <span className={styles.searchSuggestionMeta}>{item.category}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
