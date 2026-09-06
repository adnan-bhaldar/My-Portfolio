import { useEffect } from 'react';

/**
 * Requests fullscreen automatically as soon as the visitor interacts
 * with the page (click, tap, or keydown).
 *
 * Browsers do NOT allow JavaScript to call requestFullscreen()
 * on page load without a user gesture — this is a security rule
 * enforced by every modern browser and cannot be bypassed. Listening
 * for the very first interaction is the closest real equivalent to
 * "go fullscreen automatically", since it fires the moment the user
 * does anything at all, without needing a visible button.
 */
export const useAutoFullscreen = () => {
    useEffect(() => {
        const events = ['click', 'touchend', 'keydown'];

        const removeListeners = () => {
            events.forEach((evt) =>
                document.removeEventListener(evt, goFullscreen)
            );
        };

        const goFullscreen = () => {
            // Remove all listeners immediately so a touchend followed by a
            // compatibility click (common on mobile) can't fire this twice
            // while the first request is still pending.
            removeListeners();

            const el = document.documentElement;

            const isFullscreen =
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement;

            if (isFullscreen) return;

            const request =
                el.requestFullscreen ||
                el.webkitRequestFullscreen ||
                el.msRequestFullscreen;

            if (request) {
                try {
                    // Modern requestFullscreen() returns a Promise; legacy
                    // vendor-prefixed versions (webkit/ms) return undefined,
                    // so only call .catch() when the result actually supports it.
                    const result = request.call(el);
                    if (result && typeof result.catch === 'function') {
                        result.catch(() => {
                            // Ignore rejections (e.g. user dismissed, iframe restrictions, etc.)
                        });
                    }
                } catch {
                    // Ignore synchronous fullscreen failures from legacy APIs.
                }
            }
        };

        events.forEach((evt) =>
            document.addEventListener(evt, goFullscreen)
        );

        return removeListeners;
    }, []);
};