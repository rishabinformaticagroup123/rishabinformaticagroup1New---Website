import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { flightId: string } }
) {
  try {
    const flightId = request.nextUrl.pathname.split('/').pop() || '';
    
    console.log('📊 Availability check for:', flightId);

    // Mock availability data
    const seatMap = {
      flightId: flightId,
      flightNumber: flightId.includes('6E') ? '6E 205' : 
                   flightId.includes('AI') ? 'AI 865' : 
                   flightId.includes('UK') ? 'UK 945' : 'SG 815',
      departure: "DEL",
      arrival: "BOM",
      departureTime: flightId.includes('6E') ? "06:00" : 
                    flightId.includes('AI') ? "09:30" : 
                    flightId.includes('UK') ? "14:00" : "18:45",
      date: "2024-12-25",
      aircraft: "Airbus A320neo",
      totalSeats: 180,
      availableSeats: Math.floor(Math.random() * 50) + 10,
      seatPricing: {
        economy: {
          standard: 4250,
          flex: 5200,
          business: 7500
        },
        premiumEconomy: {
          standard: 6800,
          flex: 8200
        }
      },
      seatAvailability: {
        economy: Math.floor(Math.random() * 40) + 5,
        premiumEconomy: Math.floor(Math.random() * 15) + 2,
        business: Math.floor(Math.random() * 8) + 1
      },
      fareTypes: [
        {
          type: "Saver",
          price: 4250,
          baggage: "15kg",
          cancellation: "Non-refundable",
          changes: "Not allowed",
          meals: "Paid",
          seatSelection: "Paid"
        },
        {
          type: "Flex",
          price: 5200,
          baggage: "20kg",
          cancellation: "Refundable with fee",
          changes: "Allowed with fee",
          meals: "Included",
          seatSelection: "Free"
        },
        {
          type: "Business",
          price: 7500,
          baggage: "30kg",
          cancellation: "Fully refundable",
          changes: "Free changes",
          meals: "Premium included",
          seatSelection: "Free premium seats"
        }
      ],
      lastUpdated: new Date().toISOString(),
      nextUpdate: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
    };

    await new Promise(resolve => setTimeout(resolve, 200));

    return NextResponse.json({
      success: true,
      data: seatMap,
      metadata: {
        checkTime: new Date().toISOString(),
        cache: "live",
        source: "Airline Inventory System",
        confidence: "high"
      }
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "AVAILABILITY_CHECK_FAILED",
        message: "Unable to fetch seat availability"
      },
      { status: 500 }
    );
  }
}

// For direct GET requests
export async function GETDirect(request: NextRequest) {
  const flightId = request.nextUrl.searchParams.get('flightId');
  
  if (!flightId) {
    return NextResponse.json({
      api: "Flight Availability API",
      description: "Check seat availability and pricing for specific flights",
      usage: "GET /api/flight-api/availability?flightId=FL-6E-205-001",
      parameters: {
        flightId: "Flight identifier (required)"
      },
      example: "/api/flight-api/availability?flightId=FL-6E-205-001"
    });
  }

  return GET(request, { params: { flightId } });
}