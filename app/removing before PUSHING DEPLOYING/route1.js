import { NextRequest, NextResponse } from 'next/server';

const DAILY_API_KEY = process.env.DAILY_API_KEY;
const DAILY_DOMAIN = 'rishab-informatica';

export async function POST(request: NextRequest) {
  try {
    const { roomName } = await request.json();

    if (!roomName) {
      return NextResponse.json({ error: 'Room name is required' }, { status: 400 });
    }

    // Create room via Daily.co API
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        name: roomName,
        privacy: 'public',
        properties: {
          enable_prejoin_ui: false,
          enable_network_ui: true,
          start_audio_off: false,
          start_video_off: true,
          enable_screenshare: true,
          enable_chat: false,
          exp: Math.round(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Daily.co API error:', error);
      return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
    }

    const roomData = await response.json();
    return NextResponse.json({ 
      success: true, 
      room: roomData,
      meetingUrl: `https://${DAILY_DOMAIN}.daily.co/${roomName}`
    });

  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}