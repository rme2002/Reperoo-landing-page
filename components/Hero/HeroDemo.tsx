"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@mantine/hooks";
import { useMotionPaused } from "@/lib/motion";
import { withBasePath } from "@/lib/paths";
import classes from "./Hero.module.css";

// Geometry of reperoo-hero-scene.svg, which shares this viewBox.
const VIEW = { x: 100, y: 86, w: 1010, h: 790 };
const SCREEN = { x: 412, y: 108, w: 306 };
const CX = SCREEN.x + SCREEN.w / 2;
const THUMB = { x: SCREEN.x + 34, y: SCREEN.y + 116, w: SCREEN.w - 68, h: 196 };
const BAR = { x: SCREEN.x + 34, y: SCREEN.y + 418, w: SCREEN.w - 68 };
const CABLE = "M565 806 C 600 880, 720 880, 760 790 S 860 650, 880 640";
const LED = { x: 1070, y: 590 };
const CHIPS = [
  { x: 790, y: 300, w: 286, label: "SHA-256 verified" },
  { x: 110, y: 520, w: 270, label: "Live Photo kept" },
];

const TOTAL = 1780;
const STEP_MS = 2200;
const FADE_MS = 500;

// One calm step per photo: the screen moves on, then rests.
const STEPS = [
  { percent: 12, speed: 198, timeLeft: "3 min" },
  { percent: 27, speed: 212, timeLeft: "3 min" },
  { percent: 41, speed: 206, timeLeft: "2 min" },
  { percent: 56, speed: 219, timeLeft: "2 min" },
  { percent: 72, speed: 209, timeLeft: "1 min" },
  { percent: 86, speed: 214, timeLeft: "30 sec" },
  { percent: 99, speed: 203, timeLeft: "5 sec" },
];
const STILL_STEP = 4;

const PALETTES = {
  sunset: ["#f2a65a", "#c4553a", "#5b2a3a"],
  sea: ["#9fd3e0", "#3f8fb0", "#1f4e6b"],
  forest: ["#c9dcae", "#6f9a5b", "#2f5238"],
  dusk: ["#e7b7c8", "#9a6fa8", "#3e3466"],
  dune: ["#f3dcb5", "#d9a066", "#8a5a34"],
  snow: ["#eef3f7", "#b9c9d6", "#6c7f93"],
} as const;

type Kind = keyof typeof PALETTES;
type Media = { kind: Kind; video?: string; live?: boolean };

const MEDIA: Media[] = [
  { kind: "sunset" },
  { kind: "sea", video: "0:24" },
  { kind: "forest", live: true },
  { kind: "dusk" },
  { kind: "dune", video: "1:12" },
  { kind: "snow", live: true },
];

function Photo({ kind }: { kind: Kind }) {
  const { x, y, w, h } = THUMB;
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill={`url(#hd-${kind})`} />
      <circle
        cx={x + w * 0.72}
        cy={y + h * 0.32}
        r={w * 0.1}
        fill="#fff"
        opacity={0.55}
      />
      <path
        d={`M${x} ${y + h * 0.78} L${x + w * 0.32} ${y + h * 0.5} L${x + w * 0.55} ${y + h * 0.7} L${x + w * 0.78} ${y + h * 0.48} L${x + w} ${y + h * 0.66} L${x + w} ${y + h} L${x} ${y + h} Z`}
        fill={PALETTES[kind][2]}
        opacity={0.75}
      />
    </>
  );
}

function Badge({ media }: { media: Media }) {
  const { x, y, h } = THUMB;
  if (media.video) {
    return (
      <g>
        <rect
          x={x + 12}
          y={y + h - 44}
          width={84}
          height={32}
          rx={16}
          fill="rgba(0,0,0,0.5)"
        />
        <path d={`M${x + 27} ${y + h - 35} l11 7 l-11 7 Z`} fill="#fff" />
        <text
          x={x + 46}
          y={y + h - 22}
          fontSize={15}
          fontWeight={600}
          fill="#fff"
        >
          {media.video}
        </text>
      </g>
    );
  }
  if (media.live) {
    return (
      <g>
        <rect
          x={x + 12}
          y={y + 12}
          width={74}
          height={30}
          rx={15}
          fill="rgba(0,0,0,0.5)"
        />
        <circle
          cx={x + 29}
          cy={y + 27}
          r={7}
          fill="none"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <circle cx={x + 29} cy={y + 27} r={2.5} fill="#fff" />
        <text
          x={x + 42}
          y={y + 32}
          fontSize={13}
          fontWeight={700}
          fill="#fff"
          letterSpacing={1}
        >
          LIVE
        </text>
      </g>
    );
  }
  return null;
}

function Chip({ x, y, w, label }: (typeof CHIPS)[number]) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={64}
        rx={18}
        fill="#2e2320"
        stroke="rgba(255,255,255,0.08)"
      />
      <circle cx={x + 32} cy={y + 32} r={15} fill="#2f8a5e" />
      <path
        d={`M${x + 25.7} ${y + 32.3} l4.5 4.5 l8.25 -9`}
        fill="none"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x={x + 58} y={y + 40} fontSize={22} fontWeight={600} fill="#f6efec">
        {label}
      </text>
    </g>
  );
}

/** The hero phone running a copy: progress, counts and the current photo or video. */
export function HeroDemo({ alt }: { alt?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const paused = useMotionPaused();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(STILL_STEP);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reduced || paused) return;
    const last = step === STEPS.length - 1;
    const id = window.setTimeout(
      () => (last ? setHidden(true) : setStep(step + 1)),
      STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [step, visible, reduced, paused]);

  useEffect(() => {
    if (!hidden) return;
    const restarted = step === 0;
    const id = window.setTimeout(
      () => (restarted ? setHidden(false) : setStep(0)),
      restarted ? 100 : FADE_MS,
    );
    return () => window.clearTimeout(id);
  }, [hidden, step]);

  const shown = reduced ? STILL_STEP : step;
  const current = STEPS[shown];
  const p = current.percent / 100;
  const done = Math.round(p * TOTAL);
  const media = shown % MEDIA.length;

  return (
    <svg
      ref={ref}
      className={classes.demo}
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <defs>
        {Object.entries(PALETTES).map(([kind, [a, b, c]]) => (
          <linearGradient
            key={kind}
            id={`hd-${kind}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0" stopColor={a} />
            <stop offset="0.6" stopColor={b} />
            <stop offset="1" stopColor={c} />
          </linearGradient>
        ))}
        <linearGradient id="hd-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a85541" />
          <stop offset="0.5" stopColor="#c97a63" />
          <stop offset="1" stopColor="#d9917b" />
        </linearGradient>
        <clipPath id="hd-thumb">
          <rect
            x={THUMB.x}
            y={THUMB.y}
            width={THUMB.w}
            height={THUMB.h}
            rx={18}
          />
        </clipPath>
      </defs>

      <image
        href={withBasePath("/images/reperoo-hero-scene.svg")}
        x={VIEW.x}
        y={VIEW.y}
        width={VIEW.w}
        height={VIEW.h}
      />

      <path
        d={CABLE}
        fill="none"
        stroke="#e2a48f"
        strokeWidth={6}
        strokeLinecap="round"
        className={classes.flow}
      />
      <circle
        cx={LED.x}
        cy={LED.y}
        r={6}
        fill="#6fd79a"
        className={classes.led}
      />
      {CHIPS.map((chip, index) => (
        <g
          key={chip.label}
          className={classes.float}
          style={{ animationDelay: `${index * -3}s` }}
        >
          <Chip {...chip} />
        </g>
      ))}

      <g className={classes.demoContent} style={{ opacity: hidden ? 0 : 1 }}>
        <g clipPath="url(#hd-thumb)">
          {MEDIA.map((item, index) => (
            <g
              key={item.kind}
              className={classes.demoMedia}
              style={{ opacity: index === media ? 1 : 0 }}
            >
              <Photo kind={item.kind} />
              <Badge media={item} />
            </g>
          ))}
        </g>

        <text
          key={`p${current.percent}`}
          x={CX}
          y={SCREEN.y + 392}
          textAnchor="middle"
          fontSize={64}
          fontWeight={700}
          letterSpacing={-2}
          fill="#f6efec"
          className={`${classes.demoDigits} ${classes.demoTick}`}
        >
          {current.percent}%
        </text>
        <rect
          x={BAR.x}
          y={BAR.y}
          width={BAR.w}
          height={10}
          rx={5}
          fill="url(#hd-bar)"
          className={classes.demoBar}
          style={{
            transform: `scaleX(${p})`,
            transition: hidden ? "none" : undefined,
          }}
        />
        <text
          key={`d${done}`}
          x={CX}
          y={SCREEN.y + 458}
          textAnchor="middle"
          fontSize={17}
          fontWeight={500}
          fill="#b0a09a"
          className={`${classes.demoDigits} ${classes.demoTick}`}
        >
          {done.toLocaleString("en-GB")} of {TOTAL.toLocaleString("en-GB")}{" "}
          items
        </text>
        <text
          key={`s${current.speed}`}
          x={SCREEN.x + 50}
          y={SCREEN.y + 530}
          fontSize={18}
          fontWeight={700}
          fill="#f6efec"
          className={`${classes.demoDigits} ${classes.demoTick}`}
        >
          {current.speed} MB/s
        </text>
        <text
          key={`t${current.timeLeft}`}
          x={SCREEN.x + 62 + (SCREEN.w - 80) / 2}
          y={SCREEN.y + 530}
          fontSize={18}
          fontWeight={700}
          fill="#f6efec"
          className={classes.demoTick}
        >
          {current.timeLeft}
        </text>
      </g>
    </svg>
  );
}
