'use client';

import * as React from 'react';
import { m, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useHeroVideo } from '@/hooks/use-hero-video';

/*
 * Based on the 21st.dev "zoom-parallax" component. Original API and layout are
 * unchanged; additions for this site:
 *   - an image may carry a video (desktop + portrait), played once over its poster,
 *     either on load or on the visitor's first scroll
 *   - overlay children, optionally a render function receiving scroll progress 0→1
 *   - `className` for the sticky stage (background colour)
 *   - reduced motion: renders the final, fully-zoomed frame with no scroll choreography
 *   - a separate tile arrangement for portrait screens (see LAYOUT)
 */

interface Image {
	src: string;
	alt?: string;
	/** Optional: poster for portrait screens (used with `video`) */
	mobileSrc?: string;
	/** Optional: video played over the image (desktop = landscape, mobile = portrait) */
	video?: { desktop: string; mobile?: string; startOn?: "load" | "scroll" };
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
	/** Classes for the sticky stage */
	className?: string;
	/** Content layered over the images; a function receives scroll progress (0→1) */
	children?: React.ReactNode | ((progress: MotionValue<number>) => React.ReactNode);
}

/*
 * Tile placement relative to the centred position: x/y offsets and w/h sizes.
 * `wide` reproduces the original component's layout; `tall` is a separate
 * arrangement for portrait screens (phones), framing the centre tile on all sides.
 * The centre tile (index 0) zooms 4×, so its size × 4 must cover the viewport.
 */
type Box = { x: string; y: string; w: string; h: string };
const LAYOUT: { wide: Box; tall: Box }[] = [
	{ wide: { x: '0', y: '0', w: '25vw', h: '25vh' }, tall: { x: '0', y: '0', w: '40vw', h: '30vh' } },
	{ wide: { x: '5vw', y: '-30vh', w: '35vw', h: '30vh' }, tall: { x: '-23vw', y: '-30vh', w: '46vw', h: '22vh' } },
	{ wide: { x: '-25vw', y: '-10vh', w: '20vw', h: '45vh' }, tall: { x: '25vw', y: '-32vh', w: '42vw', h: '26vh' } },
	{ wide: { x: '27.5vw', y: '0', w: '25vw', h: '25vh' }, tall: { x: '35vw', y: '0', w: '22vw', h: '18vh' } },
	{ wide: { x: '5vw', y: '27.5vh', w: '20vw', h: '25vh' }, tall: { x: '23vw', y: '29vh', w: '46vw', h: '20vh' } },
	{ wide: { x: '-22.5vw', y: '27.5vh', w: '30vw', h: '25vh' }, tall: { x: '-26vw', y: '31vh', w: '40vw', h: '24vh' } },
	{ wide: { x: '25vw', y: '22.5vh', w: '15vw', h: '15vh' }, tall: { x: '-35vw', y: '0', w: '22vw', h: '18vh' } },
];

const boxVars = (i: number) => {
	const { wide, tall } = LAYOUT[i] ?? LAYOUT[0];
	return {
		'--x': wide.x, '--y': wide.y, '--w': wide.w, '--h': wide.h,
		'--tx': tall.x, '--ty': tall.y, '--tw': tall.w, '--th': tall.h,
	} as React.CSSProperties;
};

function VideoTile({ image, index }: { image: Image; index: number }) {
	const { ref, playing } = useHeroVideo(image.video?.desktop, image.video?.mobile, {
		startOn: image.video?.startOn,
	});
	return (
		<>
			<picture>
				{image.mobileSrc && <source media="(max-aspect-ratio: 1/1)" srcSet={image.mobileSrc} />}
				{ }
				<img
					src={image.src}
					alt={image.alt || `Parallax image ${index + 1}`}
					fetchPriority="high"
					className="absolute inset-0 h-full w-full object-cover"
				/>
			</picture>
			<video
				ref={ref}
				muted
				playsInline
				preload="none"
				disablePictureInPicture
				tabIndex={-1}
				aria-hidden="true"
				className={cn(
					'absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 ease-out',
					playing && 'opacity-100',
				)}
			/>
		</>
	);
}

/**
 * Collage photos start downloading only after the page's load event, so they never
 * compete with the centre tile (the LCP image) for bandwidth. Each fades in as it arrives.
 */
function useAfterLoad() {
	const [ready, setReady] = React.useState(false);
	React.useEffect(() => {
		const go = () => setReady(true);
		if (document.readyState === 'complete') {
			// setTimeout, not requestAnimationFrame: rAF never fires in background tabs
			const id = window.setTimeout(go, 0);
			return () => window.clearTimeout(id);
		}
		window.addEventListener('load', go, { once: true });
		return () => window.removeEventListener('load', go);
	}, []);
	return ready;
}

function PhotoTile({ image, index, load }: { image: Image; index: number; load: boolean }) {
	const [shown, setShown] = React.useState(false);
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={load ? image.src || '/placeholder.svg' : undefined}
			alt={image.alt || `Parallax image ${index + 1}`}
			decoding="async"
			onLoad={() => setShown(true)}
			className={cn(
				'zp-photo h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-out',
				shown && 'opacity-100',
			)}
		/>
	);
}

export function ZoomParallax({ images, className, children }: ZoomParallaxProps) {
	const photosReady = useAfterLoad();
	const container = React.useRef(null);
	const reduced = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});
	const finalFrame = useMotionValue(1);
	const progress = reduced ? finalFrame : scrollYProgress;

	const scale4 = useTransform(progress, [0, 1], [1, 4]);
	const scale5 = useTransform(progress, [0, 1], [1, 5]);
	const scale6 = useTransform(progress, [0, 1], [1, 6]);
	const scale8 = useTransform(progress, [0, 1], [1, 8]);
	const scale9 = useTransform(progress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];
	// The collage starts nudged down so its top row clears the fixed header, and settles back to
	// centre as the zoom begins (the final, fully zoomed frame is unchanged)
	const headerClear = useTransform(progress, [0, 0.25], [40, 0]);

	return (
		<div ref={container} className="zp-track relative h-[300vh]">
			<div className={cn('sticky top-0 h-screen overflow-hidden', className)}>
				<m.div className="absolute inset-0" style={{ y: headerClear }}>
				{images.map((image, index) => {
					const scale = scales[index % scales.length];

					return (
						<m.div
							key={index}
							style={{ scale, willChange: 'transform' }}
							className="absolute top-0 flex h-full w-full items-center justify-center"
						>
							<div
								style={boxVars(index)}
								className="relative top-(--y) left-(--x) h-(--h) w-(--w) overflow-hidden bg-white/5 portrait:top-(--ty) portrait:left-(--tx) portrait:h-(--th) portrait:w-(--tw)"
							>
								{image.video ? (
									<VideoTile image={image} index={index} />
								) : (
									<PhotoTile image={image} index={index} load={photosReady} />
								)}
							</div>
						</m.div>
					);
				})}
				</m.div>
				{typeof children === 'function' ? children(progress) : children}
			</div>
		</div>
	);
}
