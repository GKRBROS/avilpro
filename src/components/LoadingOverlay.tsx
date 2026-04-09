import { useEffect, useState } from "react";

// Phase 1 (0–1800ms): Yellow screen, Avilpro logo fully visible
// Phase 2 (1800ms):   Green panel slides in FROM THE TOP sweeping DOWN over the screen, old elements hide
//                     Green panel shows "Since 1985"
// Phase 3 (3000ms+):  Entire overlay fades out
export const LoadingOverlay = () => {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [visible, setVisible] = useState(true);
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    // Logo reveals after 400ms
    const tLogo = setTimeout(() => setLogoReady(true), 400);
    // Green panel sweeps down after 1800ms
    const t2 = setTimeout(() => setPhase(2), 1800);
    // Fade out after 3200ms
    const t3 = setTimeout(() => setPhase(3), 3200);
    // Remove DOM after fade
    const t4 = setTimeout(() => setVisible(false), 4100);
    return () => { clearTimeout(tLogo); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        overflow: "hidden",
        opacity: phase === 3 ? 0 : 1,
        transition: phase === 3 ? "opacity 0.85s cubic-bezier(0.4,0,0.2,1)" : "none",
        pointerEvents: phase === 3 ? "none" : "all",
      }}
    >
      {/* ── YELLOW background (first side) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#FBFF00",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Watermark text */}
        <span
          style={{
            position: "absolute",
            fontSize: "clamp(72px, 18vw, 220px)",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
            color: "rgba(21,128,61,0.08)",
            lineHeight: 1,
            whiteSpace: "nowrap",
            userSelect: "none",
            // Hide when green panel starts descending
            opacity: phase >= 2 ? 0 : (logoReady ? 1 : 0),
            transition: "opacity 0.6s ease",
          }}
        >
          AVILPRO
        </span>

        {/* Logo + branding */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: phase >= 2 ? 0 : (logoReady ? 1 : 0),
            transform: logoReady ? "scale(1) translateY(0)" : "scale(0.85) translateY(20px)",
            transition: "opacity 0.4s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <img
            src="https://www.avilpro.in/wp-content/uploads/2024/12/avil-pro-removebg-preview.png"
            alt="Avilpro"
            style={{
              width: 175,
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.14))",
            }}
          />
          <div style={{ marginTop: 12, fontSize: 14, fontWeight: 800, letterSpacing: "0.38em", textTransform: "uppercase", color: "#15803d" }}>
            AVILPRO
          </div>
          <div style={{ marginTop: 4, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(21,128,61,0.65)" }}>
            Premium Avil Milk Since 1985
          </div>
        </div>

        {/* Spinner */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: 28,
            width: 46,
            height: 46,
            opacity: phase >= 2 ? 0 : (logoReady ? 1 : 0),
            transition: "opacity 0.4s ease",
          }}
        >
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2.5px solid rgba(21,128,61,0.12)" }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2.5px solid transparent",
              borderTopColor: "#15803d",
              borderRightColor: "rgba(21,128,61,0.28)",
              animation: "ap-spin 0.9s linear infinite",
            }}
          />
        </div>
      </div>

      {/* ── GREEN panel — enters FROM TOP, sweeps DOWN (second side) ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          background: "#15803d",
          height: "100%",
          transform: phase >= 2 ? "translateY(0)" : "translateY(-100%)",
          transition: phase >= 2 ? "transform 0.85s cubic-bezier(0.76,0,0.24,1)" : "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Watermark on green side */}
        <span
          style={{
            position: "absolute",
            fontSize: "clamp(72px, 18vw, 220px)",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
            color: "rgba(251,255,0,0.07)",
            lineHeight: 1,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          AVILPRO
        </span>

        {/* Content on green panel */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "#FBFF00",
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(-30px)",
            transition: "opacity 0.5s ease 0.5s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.5s",
          }}
        >
          <div
            style={{
              fontSize: "clamp(44px, 10vw, 104px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            Since 1985
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: "clamp(11px, 1.8vw, 17px)",
              fontWeight: 600,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              opacity: 0.8,
            }}
          >
            Thrissur&apos;s Favourite Avil Milk Brand
          </div>

          {/* Proper colored Avilpro logo on green side */}
          <img
            src="https://www.avilpro.in/wp-content/uploads/2024/12/avil-pro-removebg-preview.png"
            alt="Avilpro"
            style={{
              marginTop: 28,
              width: 120,
              height: "auto",
              display: "block",
              marginInline: "auto",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes ap-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

