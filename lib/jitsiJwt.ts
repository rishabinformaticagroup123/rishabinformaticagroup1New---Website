import jwt from 'jsonwebtoken';

interface JitsiJwtPayload {
  aud: string;
  iss: string;
  sub: string;
  room: string;
  context: {
    user: {
      name: string;
      email?: string;
      avatar?: string;
      id?: string;
    };
    group?: string;
    features?: {
      recording?: boolean;
      livestreaming?: boolean;
      transcription?: boolean;
      'outbound-call'?: boolean;
    };
    room?: {
      regex?: boolean;
    };
    metadata?: Record<string, string>;
  };
  exp: number;
  nbf: number;
}

export function generateJitsiJwt(
  roomName: string,
  userName: string,
  isModerator: boolean = false
): string {
  const appId = process.env.NEXT_PUBLIC_JITSI_APP_ID;
  const apiKeyId = process.env.JITSI_API_KEY_ID;
  const privateKey = process.env.JITSI_PRIVATE_KEY;

  if (!appId || !apiKeyId || !privateKey) {
    throw new Error('JaaS credentials not configured');
  }

  const now = Math.floor(Date.now() / 1000);

  const payload: JitsiJwtPayload = {
    aud: 'jitsi',
    iss: 'chat',
    sub: appId,
    room: roomName,
    exp: now + 24 * 60 * 60,
    nbf: now - 10,
    context: {
      user: {
        name: userName,
        email: isModerator ? 'instructor@rishab.com' : 'student@rishab.com',
        id: isModerator ? 'instructor-1' : `student-${Date.now()}`,
      },
      group: 'rishab-informatica',
      features: {
        recording: isModerator,
        livestreaming: isModerator,
        transcription: isModerator,
        'outbound-call': false,
      },
      room: {
        regex: false,
      },
      metadata: {
        department: 'training',
        instructor: isModerator ? 'true' : 'false',
      },
    },
  };

  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    keyid: apiKeyId,
  });

  return token;
}