import { ImageResponse } from "next/og";

export const dynamic = "force-static";
const size = { width: 180, height: 180 };

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#17110f",
      }}
    >
      <svg width="180" height="180" viewBox="0 0 1024 1024">
        {[392, 512, 632].map((y, index) => (
          <path
            key={y}
            d={`M150,${y} C 284,${y - 78} 394,${y - 78} 512,${y} C 630,${y + 78} 740,${y + 78} 874,${y}`}
            fill="none"
            stroke="#c97a63"
            strokeWidth="74"
            strokeLinecap="round"
            opacity={index === 1 ? 1 : 0.5}
          />
        ))}
      </svg>
    </div>,
    size,
  );
}
