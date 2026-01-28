import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination, date, passengers = 1 } = body;

    console.log('🛩️ IndiGo API called:', { origin, destination, date });

    // Mock IndiGo flights
    const flights = [
      {
        flightNumber: "6E 205",
        departure: { code: origin, time: "06:00", terminal: "T3" },
        arrival: { code: destination, time: "08:15", terminal: "T2" },
        duration: "2h 15m",
        aircraft: "A320neo",
        classes: [
          { code: "S", name: "Saver", price: 4250, available: 24 },
          { code: "F", name: "Flex", price: 5200, available: 18 },
          { code: "B", name: "Business", price: 7500, available: 8 }
        ],
        amenities: ["20kg Baggage", "Free Meal", "In-flight Entertainment"],
        operatingDays: ["Daily"],
        bookingClass: "Saver"
      },
      {
        flightNumber: "6E 507",
        departure: { code: origin, time: "13:45", terminal: "T3" },
        arrival: { code: destination, time: "16:00", terminal: "T2" },
        duration: "2h 15m",
        aircraft: "A321neo",
        classes: [
          { code: "S", name: "Saver", price: 4550, available: 32 },
          { code: "F", name: "Flex", price: 5500, available: 24 },
          { code: "B", name: "Business", price: 7800, available: 12 }
        ],
        amenities: ["20kg Baggage", "Extra Legroom", "Priority Boarding"],
        operatingDays: ["Daily"],
        bookingClass: "Saver"
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 250));

    return NextResponse.json({
      airline: "IndiGo",
      code: "6E",
      searchId: `IG-${Date.now()}`,
      flights,
      fareRules: {
        cancellation: "Non-refundable for Saver fares",
        changes: "Allowed with fee for Flex fares",
        baggage: "15kg check-in + 7kg cabin",
        checkin: "Web check-in opens 24 hours before departure"
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      { error: "IndiGo API error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    airline: "IndiGo",
    code: "6E",
    apiVersion: "2.1",
    endpoints: {
      search: "POST /api/flight-api/airlines/indigo",
      status: "GET /api/flight-api/airlines/indigo/status/{flightNumber}",
      book: "POST /api/flight-api/airlines/indigo/book"
    },
    status: "active"
  });
}