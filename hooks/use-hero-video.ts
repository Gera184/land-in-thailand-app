"use client";
import * as React from "react";

type Options = {
	/**
	 * "load": play as soon as the page has loaded (default).
	 * "scroll": download and play only on the visitor's first scroll (visitors who never
	 *  scroll never download it; the poster shows meanwhile).
	 */
	startOn?: "load" | "scroll";
};

/** Loads the right video after the page, skipping reduced-motion / data-saver / 2G visitors. */
export function useHeroVideo(desktopVideo?: string, mobileVideo?: string, { startOn = "load" }: Options = {}) {
	const ref = React.useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = React.useState(false);

	React.useEffect(() => {
		const video = ref.current;
		if (!video || (!desktopVideo && !mobileVideo)) return;

		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
		const slowNet = !!conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType ?? ""));
		if (reduce || slowNet) return;

		const portrait = window.matchMedia("(max-aspect-ratio: 1/1)").matches;
		const src = (portrait ? mobileVideo : desktopVideo) ?? desktopVideo ?? mobileVideo;
		if (!src) return;

		const onPlaying = () => setPlaying(true);
		const tryPlay = () => video.play().catch(() => {/* autoplay blocked: poster remains */});
		const onShow = () => {
			if (document.hidden) return;
			document.removeEventListener("visibilitychange", onShow);
			tryPlay();
		};
		const playWhenVisible = () => {
			// Background tabs can't autoplay; start when the tab is first shown
			if (document.hidden) document.addEventListener("visibilitychange", onShow);
			else tryPlay();
		};
		let attached = false;
		const attach = () => {
			if (attached) return;
			attached = true;
			video.addEventListener("playing", onPlaying, { once: true });
			video.src = src;
			video.preload = "auto";
			video.load();
		};
		const onFirstScroll = () => {
			if (window.scrollY <= 0) return;
			window.removeEventListener("scroll", onFirstScroll);
			attach(); // no-op if already buffering
			playWhenVisible();
		};

		// The video never competes with the first paint: "load" videos start downloading once
		// the browser is idle after load; "scroll" videos only at the first scroll.
		let idleId: number | undefined;
		const scheduleIdle = () => {
			const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
			idleId = ric(() => {
				attach();
				playWhenVisible();
			}, { timeout: 4000 });
		};

		if (startOn === "scroll") {
			if (window.scrollY > 0) { attach(); playWhenVisible(); } // page restored mid-scroll
			else window.addEventListener("scroll", onFirstScroll, { passive: true });
		}
		if (startOn === "load") {
			if (document.readyState === "complete") scheduleIdle();
			else window.addEventListener("load", scheduleIdle, { once: true });
		}

		return () => {
			window.removeEventListener("load", scheduleIdle);
			if (idleId !== undefined) (window.cancelIdleCallback ?? window.clearTimeout)(idleId);
			window.removeEventListener("scroll", onFirstScroll);
			document.removeEventListener("visibilitychange", onShow);
			video.removeEventListener("playing", onPlaying);
		};
	}, [desktopVideo, mobileVideo, startOn]);

	return { ref, playing };
}
