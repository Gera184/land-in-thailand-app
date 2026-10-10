"use client";
import * as React from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
	const mq = window.matchMedia(QUERY);
	mq.addEventListener("change", onChange);
	return () => mq.removeEventListener("change", onChange);
}

/**
 * Live `prefers-reduced-motion: reduce`. Hydration-safe, unlike framer-motion's useReducedMotion:
 * it matches the server HTML on the first client render and re-renders right after, so anything
 * derived from it (inert, aria-hidden, inline styles) is actually updated.
 */
export function usePrefersReducedMotion() {
	return React.useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
