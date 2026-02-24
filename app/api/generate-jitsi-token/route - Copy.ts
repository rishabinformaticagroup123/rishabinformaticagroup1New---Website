import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { roomName, userName, isModerator } = await request.json();

    // Get credentials from environment variables
    const appId = process.env.NEXT_PUBLIC_JITSI_APP_ID;
    const apiKeyId = process.env.JITSI_API_KEY_ID;
    const privateKey = process.env.JITSI_PRIVATE_KEY;

    if (!appId || !apiKeyId || !privateKey) {
      return NextResponse.json(
        { error: 'JaaS credentials not configured' },
        { status: 500 }
      );
    }

    // Current time in seconds
    const now = Math.floor(Date.now() / 1000);

    // CORRECT JaaS JWT payload format
    const payload = {
      aud: 'jitsi',                    // Must be 'jitsi' for JaaS
      iss: 'chat',                      // Must be 'chat' for JaaS
      sub: appId,                       // Your app ID as subject
      room: roomName,                    // Meeting room name
      exp: now + 24 * 60 * 60,           // 24 hours
      nbf: now - 10,                     // Not before
      context: {
        user: {
          name: userName,
          email: isModerator ? 'instructor@rishab.com' : 'student@rishab.com',
          avatar: '',                     // Optional
          id: isModerator ? 'instructor-1' : `student-${Date.now()}`, // Optional but good
        },
        group: 'rishab-informatica',       // Optional: your group name
        features: {
          recording: isModerator,          // Only moderators can record
          livestreaming: isModerator,      // Only moderators can livestream
          transcription: isModerator,       // Only moderators can transcribe
          'outbound-call': false,           // Usually false for web
        },
        room: {
          regex: false,                     // Use exact room name match
        },
        metadata: {
          department: 'training',           // Optional metadata
          instructor: isModerator ? 'true' : 'false',
        },
      },
    };

    // Sign the JWT
    const token = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      keyid: apiKeyId,
    });

    // Generate meeting URL (though SDK doesn't need it)
    const meetingUrl = `https://${appId}.8x8.vc/${roomName}?jwt=${token}`;

    return NextResponse.json({ token, meetingUrl });
  } catch (error) {
    console.error('JWT generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate meeting token' },
      { status: 500 }
    );
  }
}