import { NextResponse } from 'next/server';
import sign from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { roomId, userName, isHost } = await req.json();

    const appId = process.env.NEXT_PUBLIC_JITSI_APP_ID;
    const apiKey = process.env.JITSI_API_KEY;
    const privateKey = process.env.JITSI_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!appId || !apiKey || !privateKey) {
      return NextResponse.json({ error: 'Env variables missing' }, { status: 500 });
    }

    const payload = {
      iss: 'chat',
      aud: 'jitsi',
      sub: appId,
      room: roomId,
      context: {
        user: {
          name: userName,
          affiliation: isHost ? 'owner' : 'member',
        },
        features: {
          recording: true,
          livestreaming: true,
          screenSharing: true,
        }
      },
      exp: Math.floor(Date.now() / 1000) + 7200,
    };

    const token = sign(payload, privateKey, { algorithm: 'RS256', keyid: apiKey });
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Token generation failed' }, { status: 500 });
  }
}