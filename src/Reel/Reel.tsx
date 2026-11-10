import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { z } from "zod";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { GROUPS, formatBRL } from "./theme";

const { fontFamily } = loadFont();

export const reelSchema = z.object({
  group: z.enum(["kate", "musculosas"]),
  productName: z.string(),
  priceFrom: z.number(),
  priceTo: z.number(),
  coupon: z.string().optional(),
  videoSrc: z.string(), // nome do arquivo em public/ (ex: "produto-18s.mp4")
  openingEmoji: z.string().optional(),
});

export type ReelProps = z.infer<typeof reelSchema>;

export const Reel: React.FC<ReelProps> = ({
  group,
  productName,
  priceFrom,
  priceTo,
  coupon,
  videoSrc,
  openingEmoji,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const theme = GROUPS[group];

  const discountPct = Math.round((1 - priceTo / priceFrom) * 100);

  // entrada do card de oferta
  const cardIn = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  const cardY = interpolate(cardIn, [0, 1], [500, 0]);

  // selo: já visível no frame 0 (gancho), com um pop sutil
  const badgePop = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const badgePulse = 1 + Math.sin(frame / 8) * 0.025;

  // CTA: dura ~5s no final, com fade in/out
  const ctaDuration = Math.round(fps * 5);
  const ctaStart = durationInFrames - ctaDuration;
  const ctaProgress = (frame - ctaStart) / ctaDuration;
  const ctaFade = interpolate(
    ctaProgress,
    [0, 0.12, 0.85, 1],
    [0, 1, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const ctaScale = spring({
    frame: frame - ctaStart,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", fontFamily }}>
      {/* Fundo: vídeo do produto preenchendo 9:16 */}
      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile(videoSrc)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* Scrims para legibilidade (topo + base) */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Faixa "achadinho de hoje" no topo */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#fff",
          fontSize: 38,
          fontWeight: 600,
          letterSpacing: 2,
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}
      >
        <span
          style={{
            background: theme.accent,
            padding: "12px 32px",
            borderRadius: 999,
            display: "inline-block",
          }}
        >
          ✨ achadinho de hoje ✨
        </span>
      </div>

      {/* Selo de desconto (visível desde o frame 0) */}
      {discountPct > 0 && (
        <div
          style={{
            position: "absolute",
            top: 220,
            right: 56,
            width: 230,
            height: 230,
            transform: `scale(${badgePop * badgePulse}) rotate(-10deg)`,
            background: `radial-gradient(circle at 35% 30%, ${theme.badge}, ${theme.badge})`,
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            color: "#1E1E1E",
            boxShadow: "0 16px 50px rgba(0,0,0,0.45)",
            border: "8px solid rgba(255,255,255,0.95)",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1,
              display: "block",
            }}
          >
            {discountPct}
            <span style={{ fontSize: 48 }}>%</span>
          </span>
          <span
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: 6,
              lineHeight: 1,
              marginLeft: 6,
            }}
          >
            OFF
          </span>
        </div>
      )}

      {/* Card inferior de oferta */}
      <div
        style={{
          position: "absolute",
          left: 44,
          right: 44,
          bottom: 110,
          transform: `translateY(${cardY}px)`,
          opacity: cardIn,
          background: "rgba(255,255,255,0.97)",
          borderRadius: 48,
          padding: "44px 48px 52px",
          boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
          overflow: "hidden",
        }}
      >
        {/* faixa de cor superior */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentDark})`,
          }}
        />

        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: "#1E1E1E",
            lineHeight: 1.15,
            marginBottom: 28,
          }}
        >
          {openingEmoji ?? "🔥"} {productName}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span
            style={{
              fontSize: 38,
              color: "#9a9a9a",
              textDecoration: "line-through",
              fontWeight: 500,
            }}
          >
            {formatBRL(priceFrom)}
          </span>
          <span
            style={{
              fontSize: 70,
              fontWeight: 800,
              color: theme.accent,
              lineHeight: 1,
            }}
          >
            {formatBRL(priceTo)}
          </span>
        </div>

        {coupon && (
          <div
            style={{
              marginTop: 28,
              display: "inline-block",
              background: theme.accent,
              color: "#fff",
              fontSize: 36,
              fontWeight: 700,
              padding: "14px 28px",
              borderRadius: 999,
            }}
          >
            🎟️ Cupom: {coupon}
          </div>
        )}
      </div>

      {/* CTA final */}
      <Sequence from={ctaStart}>
        <AbsoluteFill
          style={{
            background: "rgba(0,0,0,0.55)",
            justifyContent: "center",
            alignItems: "center",
            opacity: ctaFade,
          }}
        >
          <div
            style={{
              transform: `scale(${0.85 + ctaScale * 0.15})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 40,
              textAlign: "center",
            }}
          >
            <Img
              src={staticFile("kate-logo.png")}
              style={{
                width: 320,
                height: 320,
                borderRadius: 999,
                objectFit: "cover",
                border: `10px solid ${theme.accent}`,
                boxShadow: "0 16px 50px rgba(0,0,0,0.5)",
              }}
            />
            <div
              style={{
                color: "#fff",
                fontSize: 56,
                fontWeight: 700,
                lineHeight: 1.2,
                maxWidth: 880,
                textShadow: "0 3px 16px rgba(0,0,0,0.6)",
              }}
            >
              {theme.cta}
            </div>
            <div
              style={{
                background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentDark})`,
                color: "#fff",
                fontSize: 44,
                fontWeight: 700,
                padding: "22px 56px",
                borderRadius: 999,
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              }}
            >
              👉 Link na bio
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
