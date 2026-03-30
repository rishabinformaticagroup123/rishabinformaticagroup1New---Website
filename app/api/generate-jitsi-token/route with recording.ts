// ─────────────────────────────────────────────────────────────
//  FILE: /app/api/generate-jitsi-token/route.ts
//
//  .env.local required:
//    NEXT_PUBLIC_JITSI_APP_ID=vpaas-magic-cookie-xxxx
//    JITSI_API_KEY_ID=your-api-key-id
//    JITSI_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
//
//  INSTALL:
//    npm install jose
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { SignJWT, importPKCS8 } from "jose";

export async function POST(req: NextRequest) {
  try {
    const { roomId, displayName, isHost } = await req.json();

    if (!roomId || !displayName) {
      return NextResponse.json({ error: "roomId and displayName are required" }, { status: 400 });
    }

    const appId      = process.env.NEXT_PUBLIC_JITSI_APP_ID!;
    const apiKeyId   = process.env.JITSI_API_KEY_ID!;
    const privateKey = process.env.JITSI_PRIVATE_KEY!.replace(/\\n/g, "\n");

    if (!appId || !apiKeyId || !privateKey) {
      return NextResponse.json({ error: "Missing JAAS environment variables" }, { status: 500 });
    }

    const key = await importPKCS8(privateKey, "RS256");

    const now        = Math.floor(Date.now() / 1000);
    const expSeconds = 60 * 60 * 6; // 6 hours — enough for a full class

    const token = await new SignJWT({
      // ── JAAS required claims ──────────────────────────────
      iss: "chat",
      aud: "jitsi",
      sub: appId,
      room: "*",                    // allow any room under this app
      context: {
        user: {
          id:           `user-${Date.now()}`,
          name:         displayName,
          email:        isHost ? "hari@rishabinformaticagroup.com" : `${displayName.toLowerCase().replace(/\s/g, "")}@student.rig`,
          avatar:       "",
          moderator:    isHost ? "true" : "false",
        },
        features: {
          livestreaming:  "false",
          "outbound-call": "false",
          "sip-outbound-call": "false",
          transcription:  "false",
          recording:      "false",   // disable JAAS cloud recording — we use local recorder
        },
      },
    })
      .setProtectedHeader({ alg: "RS256", kid: `${appId}/${apiKeyId}`, typ: "JWT" })
      .setIssuedAt(now)
      .setExpirationTime(now + expSeconds)
      .setNotBefore(now - 10)
      .sign(key);

    return NextResponse.json({ token });
  } catch (err: any) {
    console.error("Token generation error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
