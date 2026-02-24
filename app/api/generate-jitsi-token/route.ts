import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { roomName, userName, isModerator } = await request.json();

    const appId = process.env.NEXT_PUBLIC_JITSI_APP_ID;
    const apiKeyId = process.env.JITSI_API_KEY_ID;
    const privateKey = process.env.JITSI_PRIVATE_KEY;

    if (!appId || !apiKeyId || !privateKey) {
      return NextResponse.json(
        { error: 'JaaS credentials not configured' },
        { status: 500 }
      );
    }

    const now = Math.floor(Date.now() / 1000);

    // CRITICAL: JaaS expects moderator flag in this exact format
    const payload = {
      aud: 'jitsi',                    // Must be 'jitsi' for JaaS
      iss: 'chat',                      // Must be 'chat' for JaaS
      sub: appId,
      room: roomName,
      exp: now + 24 * 60 * 60,
      nbf: now - 10,
      context: {
        user: {
          name: userName,
          id: `user-${Date.now()}`,
          // THIS IS THE KEY - must be string "true" not boolean true
          moderator: isModerator ? "true" : "false",
          email: isModerator ? 'instructor@rishab.com' : 'student@rishab.com'
        },
        // Add group for additional permissions
        group: isModerator ? 'instructors' : 'students',
        features: {
          recording: isModerator,
          livestreaming: isModerator,
          transcription: isModerator
        }
      }
    };

    console.log('JWT Payload for instructor:', JSON.stringify(payload, null, 2));

    const token = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      keyid: apiKeyId,
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error('JWT generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate meeting token' },
      { status: 500 }
    );
  }
}