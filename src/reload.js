// After a deploy, a tab that was already open still points at the previous build's code files,
// which no longer exist — loading a page then fails. Reloading once picks up the new build.
const KEY = 'gg-reloaded-at'

export const isChunkLoadError = (err) =>
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading chunk .* failed/i
    .test(String(err?.message || err))

// returns true if a reload was started; guarded so a genuinely broken file can't cause a reload loop
export function reloadOnce() {
  let last = 0
  try { last = Number(sessionStorage.getItem(KEY)) || 0 } catch { /* storage blocked */ }
  if (Date.now() - last < 15000) return false
  try { sessionStorage.setItem(KEY, String(Date.now())) } catch { /* storage blocked */ }
  window.location.reload()
  return true
}
