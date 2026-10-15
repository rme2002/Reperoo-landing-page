import { ImageResponse } from "next/og";
import { home, site } from "@/lib/content";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

const WAVES = [392, 512, 632];

function Mark({ size: px }: { size: number }) {
  return (
    <svg width={px} height={px} viewBox="0 0 1024 1024">
      <rect width="1024" height="1024" rx="230" fill="#241815" />
      {WAVES.map((y, index) => (
        <path
          key={y}
          d={`M120,${y} C 264,${y - 78} 384,${y - 78} 512,${y} C 640,${y + 78} 760,${y + 78} 904,${y}`}
          fill="none"
          stroke="#c97a63"
          strokeWidth="74"
          strokeLinecap="round"
          opacity={index === 1 ? 1 : 0.5}
        />
      ))}
    </svg>
  );
}

export function GET() {
  const price = home.hero.stats?.find((stat) => stat.value.includes("€"));
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background:
          "radial-gradient(60% 80% at 85% 20%, rgba(201,122,99,0.28), transparent 70%), #17110f",
        color: "#f6efec",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Mark size={64} />
        <div style={{ fontSize: 36, fontWeight: 700 }}>{site.name}</div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: -2,
          maxWidth: 940,
        }}
      >
        {home.hero.title}
      </div>
      <div style={{ display: "flex", gap: 32, fontSize: 28, color: "#b0a09a" }}>
        {home.hero.eyebrow && <div>{home.hero.eyebrow}</div>}
        {price && (
          <div style={{ color: "#d9917b" }}>{`${price.value} once`}</div>
        )}
      </div>
    </div>,
    size,
  );
}
