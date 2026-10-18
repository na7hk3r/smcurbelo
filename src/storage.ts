/**
 * localStorage, guarded.
 *
 * Merely touching window.localStorage throws a SecurityError when a browser
 * blocks storage — Chrome with cookies blocked, Safari private browsing, an
 * enterprise policy, a cross-origin frame. Unguarded access inside the first
 * render takes the whole app down: the tree never mounts, and because
 * dismissBootLoader() only runs from App's mount effect, the boot overlay from
 * index.html stays on screen over an empty page forever.
 *
 * Writes are wrapped for the same reason: they throw when storage is blocked or
 * full, and they run from an effect, where an uncaught throw unmounts the tree
 * as well.
 *
 * Both helpers degrade to "no stored value", which is the state every caller
 * already handles.
 */

export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    /* storage can be blocked; the caller's fallback applies */
  }
  return null;
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage can be blocked or full; the value still applies for this session */
  }
}
