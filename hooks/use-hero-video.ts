"use client";
import * as React from "react";

type Options = {
	/**
	 * "load": play as soon as the page has loaded (default).
	 * "scroll": buffer after load, but only start playing on the visitor's first scroll.
	 */
	startOn?: "load" | "scroll";
};

/** Loads the right video after the page, skipping reduced-motion / data-saver / 2G visitors. */
export function useHeroVideo(desktopVideo?: string, mobileVideo?: string, { startOn = "load" }: Options = {}) {
	const ref = React.useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = React.useState(false);
	// For the pause control (WCAG 2.2.2): whether playback is paused by the visitor, and whether it has finished
	const [paused, setPaused] = React.useState(false);
	const [ended, setEnded] = React.useState(false);

	React.useEffect(() => {
		const video = ref.current;
		if (!video) return;
		const onPause = () => setPaused(true);
		const onPlay = () => setPaused(false);
		const onEnded = () => setEnded(true);
		video.addEventListener("pause", onPause);
		video.addEventListener("play", onPlay);
		video.addEventListener("ended", onEnded);
		return () => {
			video.removeEventListener("pause", onPause);
			video.removeEventListener("play", onPlay);
			video.removeEventListener("ended", onEnded);
		};
	}, []);

	const toggle = React.useCallback(() => {
		const video = ref.current;
		if (!video) return;
		if (video.paused) video.play().catch(() => {});
		else video.pause();
	}, []);

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

		// The video never competes with the first paint: it starts downloading once the
		// browser is idle after load (or at the first scroll, whichever comes first).
		let idleId: number | undefined;
		const scheduleIdle = () => {
			const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
			idleId = ric(() => {
				attach();
				if (startOn === "load") playWhenVisible();
			}, { timeout: 4000 });
		};

		if (startOn === "scroll") {
			if (window.scrollY > 0) { attach(); playWhenVisible(); } // page restored mid-scroll
			else window.addEventListener("scroll", onFirstScroll, { passive: true });
		}
		if (document.readyState === "complete") scheduleIdle();
		else window.addEventListener("load", scheduleIdle, { once: true });

		return () => {
			window.removeEventListener("load", scheduleIdle);
			if (idleId !== undefined) (window.cancelIdleCallback ?? window.clearTimeout)(idleId);
			window.removeEventListener("scroll", onFirstScroll);
			document.removeEventListener("visibilitychange", onShow);
			video.removeEventListener("playing", onPlaying);
		};
	}, [desktopVideo, mobileVideo, startOn]);

	return { ref, playing, paused, ended, toggle };
}
