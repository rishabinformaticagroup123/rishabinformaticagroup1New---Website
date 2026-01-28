import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination, date } = body;

    console.log('🛩️ Vistara API called:', { origin, destination, date });

    const flights = [
      {
        flightNumber: "UK 945",
        departure: { code: origin, time: "14:00", terminal: "T3" },
        arrival: { code: destination, time: "16:30", terminal: "T2" },
        duration: "2h 30m",
        aircraft: "A320neo",
        classes: [
          { code: "E", name: "Economy", price: 4800, available: 32 },
          { code: "P", name: "Premium Economy", price: 6800, available: 24 },
          { code: "B", name: "Business", price: 12000, available: 8 }
        ],
        amenities: ["Complimentary Meals", "Extra Legroom", "Premium Service"],
        operatingDays: ["Daily"],
        bookingClass: "Economy"
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 200));

    return NextResponse.json({
      airline: "Vistara",
      code: "UK",
      searchId: `UK-${Date.now()}`,
      flights,
      fareRules: {
        cancellation: "Refundable",
        changes: "Free changes within 24 hours",
        baggage: "15kg check-in + 7kg cabin",
        checkin: "Web check-in opens 48 hours before"
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Vistara API error" },
      { status: 500 }
    );
  }
}

// ✅ ADD THIS GET FUNCTION
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: "connected",
    airline: "Vistara",
    message: "API is ready for connections",
    timestamp: new Date().toISOString(),
    version: "1.0"
  });
}