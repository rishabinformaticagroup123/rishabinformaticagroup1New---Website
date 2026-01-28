import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination, date } = body;

    console.log('🛩️ Air India API called:', { origin, destination, date });

    const flights = [
      {
        flightNumber: "AI 865",
        departure: { code: origin, time: "09:30", terminal: "T3" },
        arrival: { code: destination, time: "11:45", terminal: "T2" },
        duration: "2h 15m",
        aircraft: "B787-8",
        classes: [
          { code: "Y", name: "Economy", price: 5100, available: 45 },
          { code: "W", name: "Premium Economy", price: 8500, available: 24 },
          { code: "J", name: "Business", price: 15000, available: 12 }
        ],
        amenities: ["Lounge Access", "Complimentary Meals", "Extra Baggage"],
        operatingDays: ["Daily"],
        bookingClass: "Economy"
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      airline: "Air India",
      code: "AI",
      searchId: `AI-${Date.now()}`,
      flights,
      fareRules: {
        cancellation: "Refundable with fee",
        changes: "Free changes for Business class",
        baggage: "25kg check-in + 8kg cabin",
        checkin: "Airport check-in opens 3 hours before"
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Air India API error" },
      { status: 500 }
    );
  }
}

// ✅ ADD THIS GET FUNCTION
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: "connected",
    airline: "Air India",
    message: "API is ready for connections",
    timestamp: new Date().toISOString(),
    version: "1.0"
  });
}