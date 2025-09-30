import React, { useEffect, useState } from "react";
import List from "./components/List";
import "./App.css";

/**
 * Parent component
 * - Fetches data on mount
 * - Handles loading and error states
 * - Demonstrates default rendering and custom render function usage
 */

export default function App() {
  const [items, setItems] = useState(null); // null = not fetched yet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example public API (free)
  const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=10";

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        if (!cancelled) setItems(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="app">
      <header>
        <h1>Items from API</h1>
        <p className="subtitle">Fetching example data from JSONPlaceholder</p>
      </header>

      {loading && <div className="status" role="status">Loading items...</div>}
      {error && <div className="status error" role="alert">Failed to load: {error}</div>}

      {/* Only render the list if items is an array */}
      {Array.isArray(items) && (
        <>
          <section aria-labelledby="default-list-heading">
            <h2 id="default-list-heading">Default List Rendering</h2>
            <List items={items} itemKey={(it) => it.id} />
          </section>

          <section aria-labelledby="custom-list-heading">
            <h2 id="custom-list-heading">Custom Render (compact)</h2>
            <List
              items={items}
              itemKey={(it) => it.id}
              renderItem={(it) => (
                <article className="compact">
                  <h3 className="compact-title">{it.title}</h3>
                  <p className="compact-meta">ID: {it.id} • user: {it.userId}</p>
                </article>
              )}
            />
          </section>
        </>
      )}

      {/* If items never loaded and no error (e.g., initial state), show neutral message */}
      {!loading && items === null && !error && (
        <div className="status">No request started yet.</div>
      )}
    </main>
  );
}
