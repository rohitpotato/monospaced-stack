import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Monospaced";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1a1a1a",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)",
            backgroundSize: "100px 100px",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "40px 80px",
              width: "auto",
              textAlign: "center",
              backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: "16px",
              border: "2px solid #333",
            }}
          >
            <h1
              style={{
                fontSize: "80px",
                fontFamily: "JetBrains Mono",
                color: "#fff",
                textShadow: "0 0 20px rgba(255,255,255,0.3)",
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
