/**
 * Umami Analytics helper
 * Provides a simple wrapper around window.umami.track()
 * for use across React components.
 */
export function trackEvent(eventName, eventData = {}) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }
}
