import { useEffect } from 'react';

/**
 * Requests fullscreen automatically as soon as the visitor interacts
 * with the page in any way (click, tap, keypress, scroll).
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
        const goFullscreen = () => {
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
                request.call(el).catch(() => {
                    // Ignore rejections (e.g. user dismissed, iframe restrictions, etc.)
                });
            }
        };

        const events = ['click', 'touchend', 'keydown'];
        events.forEach((evt) =>
            document.addEventListener(evt, goFullscreen, { once: true })
        );

        return () => {
            events.forEach((evt) =>
                document.removeEventListener(evt, goFullscreen)
            );
        };
    }, []);
};