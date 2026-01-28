import { NextRequest, NextResponse } from 'next/server';

// Flight data interface
interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departure: {
    airport: string;
    code: string;
    time: string;
    terminal: string;
    date: string;
    city: string;
  };
  arrival: {
    airport: string;
    code: string;
    time: string;
    terminal: string;
    date: string;
    city: string;
  };
  duration: string;
  stops: number;
  stopDetails?: Array<{
    airport: string;
    code: string;
    duration: string;
  }>;
  price: {
    amount: number;
    currency: string;
    baseFare: number;
    taxes: number;
    discount?: number;
    finalAmount: number;
  };
  cabinClass: string;
  amenities: string[];
  seatsAvailable: number;
  provider: string;
  bookingClass: string;
  caiMetadata?: {
    processId: string;
    confidenceScore: number;
    responseTime: number;
    isBestDeal: boolean;
  };
}

// Mock flight database
const MOCK_FLIGHTS: Flight[] = [
  {
    id: "FL-6E-205-001",
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E 205",
    departure: {
      airport: "Indira Gandhi International Airport",
      code: "DEL",
      time: "06:00",
      terminal: "T3",
      date: "2024-12-25",
      city: "Delhi"
    },
    arrival: {
      airport: "Chhatrapati Shivaji Maharaj International Airport",
      code: "BOM",
      time: "08:15",
      terminal: "T2",
      date: "2024-12-25",
      city: "Mumbai"
    },
    duration: "2h 15m",
    stops: 0,
    price: {
      amount: 4250,
      currency: "INR",
      baseFare: 3500,
      taxes: 750,
      discount: 200,
      finalAmount: 4050
    },
    cabinClass: "Economy",
    amenities: ["20kg Baggage", "Free Meal", "In-flight Entertainment", "Priority Boarding"],
    seatsAvailable: 24,
    provider: "IndiGo Airlines API",
    bookingClass: "Saver",
    caiMetadata: {
      processId: "CAI-001",
      confidenceScore: 95,
      responseTime: 1200,
      isBestDeal: true
    }
  },
  {
    id: "FL-AI-865-002",
    airline: "Air India",
    airlineCode: "AI",
    flightNumber: "AI 865",
    departure: {
      airport: "Indira Gandhi International Airport",
      code: "DEL",
      time: "09:30",
      terminal: "T3",
      date: "2024-12-25",
      city: "Delhi"
    },
    arrival: {
      airport: "Chhatrapati Shivaji Maharaj International Airport",
      code: "BOM",
      time: "11:45",
      terminal: "T2",
      date: "2024-12-25",
      city: "Mumbai"
    },
    duration: "2h 15m",
    stops: 0,
    price: {
      amount: 5100,
      currency: "INR",
      baseFare: 4200,
      taxes: 900,
      finalAmount: 5100
    },
    cabinClass: "Economy",
    amenities: ["25kg Baggage", "Business Lounge Access", "Priority Check-in", "Extra Legroom"],
    seatsAvailable: 18,
    provider: "Air India API",
    bookingClass: "Standard",
    caiMetadata: {
      processId: "CAI-002",
      confidenceScore: 88,
      responseTime: 1500,
      isBestDeal: false
    }
  },
  {
    id: "FL-UK-945-003",
    airline: "Vistara",
    airlineCode: "UK",
    flightNumber: "UK 945",
    departure: {
      airport: "Indira Gandhi International Airport",
      code: "DEL",
      time: "14:00",
      terminal: "T3",
      date: "2024-12-25",
      city: "Delhi"
    },
    arrival: {
      airport: "Chhatrapati Shivaji Maharaj International Airport",
      code: "BOM",
      time: "16:30",
      terminal: "T2",
      date: "2024-12-25",
      city: "Mumbai"
    },
    duration: "2h 30m",
    stops: 0,
    price: {
      amount: 4800,
      currency: "INR",
      baseFare: 3900,
      taxes: 900,
      discount: 300,
      finalAmount: 4500
    },
    cabinClass: "Premium Economy",
    amenities: ["Free Meal & Drinks", "Extra Legroom", "WiFi", "Priority Boarding", "Extra Baggage"],
    seatsAvailable: 32,
    provider: "Vistara API",
    bookingClass: "Premium",
    caiMetadata: {
      processId: "CAI-003",
      confidenceScore: 92,
      responseTime: 800,
      isBestDeal: true
    }
  },
  {
    id: "FL-SG-815-004",
    airline: "SpiceJet",
    airlineCode: "SG",
    flightNumber: "SG 815",
    departure: {
      airport: "Indira Gandhi International Airport",
      code: "DEL",
      time: "18:45",
      terminal: "T1D",
      date: "2024-12-25",
      city: "Delhi"
    },
    arrival: {
      airport: "Chhatrapati Shivaji Maharaj International Airport",
      code: "BOM",
      time: "21:00",
      terminal: "T1",
      date: "2024-12-25",
      city: "Mumbai"
    },
    duration: "2h 15m",
    stops: 0,
    price: {
      amount: 3800,
      currency: "INR",
      baseFare: 3000,
      taxes: 800,
      finalAmount: 3800
    },
    cabinClass: "Economy",
    amenities: ["15kg Baggage", "Snack", "Web Check-in"],
    seatsAvailable: 45,
    provider: "SpiceJet API",
    bookingClass: "Basic",
    caiMetadata: {
      processId: "CAI-004",
      confidenceScore: 85,
      responseTime: 1000,
      isBestDeal: false
    }
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      origin, 
      destination, 
      departureDate, 
      returnDate, 
      passengers = 1, 
      cabinClass = 'economy',
      sortBy = 'price',
      maxPrice,
      airlines = []
    } = body;

    console.log('✈️ Flight Search API Called:', {
      origin, destination, departureDate, passengers, cabinClass,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent')
    });

    // Filter flights based on search criteria
    let filteredFlights = MOCK_FLIGHTS.filter(flight => 
      flight.departure.code === origin && 
      flight.arrival.code === destination
    );

    // Filter by cabin class
    if (cabinClass !== 'all') {
      filteredFlights = filteredFlights.filter(flight => 
        flight.cabinClass.toLowerCase().includes(cabinClass.toLowerCase())
      );
    }

    // Filter by max price
    if (maxPrice) {
      filteredFlights = filteredFlights.filter(flight => 
        flight.price.finalAmount <= maxPrice
      );
    }

    // Filter by airlines
    if (airlines.length > 0) {
      filteredFlights = filteredFlights.filter(flight => 
        airlines.includes(flight.airlineCode)
      );
    }

    // Sort flights
    switch(sortBy) {
      case 'price':
        filteredFlights.sort((a, b) => a.price.finalAmount - b.price.finalAmount);
        break;
      case 'duration':
        filteredFlights.sort((a, b) => {
          const aDuration = parseInt(a.duration);
          const bDuration = parseInt(b.duration);
          return aDuration - bDuration;
        });
        break;
      case 'departure':
        filteredFlights.sort((a, b) => a.departure.time.localeCompare(b.departure.time));
        break;
      case 'airline':
        filteredFlights.sort((a, b) => a.airline.localeCompare(b.airline));
        break;
    }

    // Simulate API delay (50-300ms)
    const delay = Math.floor(Math.random() * 250) + 50;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Generate search metadata
    const searchId = `SRCH-${Date.now().toString(36).toUpperCase()}`;
    const airlinesList = [...new Set(filteredFlights.map(f => f.airline))];
    const priceRange = filteredFlights.length > 0 ? {
      min: Math.min(...filteredFlights.map(f => f.price.finalAmount)),
      max: Math.max(...filteredFlights.map(f => f.price.finalAmount)),
      average: Math.round(filteredFlights.reduce((sum, f) => sum + f.price.finalAmount, 0) / filteredFlights.length)
    } : { min: 0, max: 0, average: 0 };

    return NextResponse.json({
      success: true,
      metadata: {
        searchId,
        query: { origin, destination, departureDate, passengers, cabinClass },
        results: {
          total: filteredFlights.length,
          airlines: airlinesList,
          priceRange,
          durationRange: filteredFlights.length > 0 ? {
            min: Math.min(...filteredFlights.map(f => parseInt(f.duration))),
            max: Math.max(...filteredFlights.map(f => parseInt(f.duration)))
          } : { min: 0, max: 0 },
          timestamp: new Date().toISOString(),
          responseTime: `${delay}ms`
        },
        pagination: {
          page: 1,
          limit: 50,
          totalPages: 1,
          hasMore: false
        }
      },
      data: {
        flights: filteredFlights,
        filters: {
          airlines: airlinesList.map(airline => ({
            name: airline,
            code: filteredFlights.find(f => f.airline === airline)?.airlineCode || '',
            count: filteredFlights.filter(f => f.airline === airline).length
          })),
          priceRange,
          durations: [...new Set(filteredFlights.map(f => f.duration))],
          cabinClasses: [...new Set(filteredFlights.map(f => f.cabinClass))],
          stopOptions: [
            { type: "non-stop", count: filteredFlights.filter(f => f.stops === 0).length },
            { type: "1-stop", count: filteredFlights.filter(f => f.stops === 1).length },
            { type: "2+ stops", count: filteredFlights.filter(f => f.stops >= 2).length }
          ]
        },
        bestDeals: filteredFlights.filter(f => f.caiMetadata?.isBestDeal).slice(0, 3),
        cheapestFlight: filteredFlights.length > 0 ? 
          filteredFlights.reduce((cheapest, current) => 
            current.price.finalAmount < cheapest.price.finalAmount ? current : cheapest
          ) : null,
        fastestFlight: filteredFlights.length > 0 ? 
          filteredFlights.reduce((fastest, current) => 
            parseInt(current.duration) < parseInt(fastest.duration) ? current : fastest
          ) : null
      },
      caiIntegration: {
        enabled: true,
        processId: `CAI-${searchId}`,
        aggregatedProviders: ["IndiGo", "Air India", "Vistara", "SpiceJet", "AirAsia"],
        confidenceScore: filteredFlights.length > 0 ? 95 : 70,
        message: filteredFlights.length > 0 ? 
          `Successfully aggregated ${filteredFlights.length} flights from ${airlinesList.length} airlines` :
          'No flights found for your search criteria'
      }
    });

  } catch (error) {
    console.error('❌ Flight search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: "SEARCH_FAILED",
        message: error instanceof Error ? error.message : "Failed to process search request",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const origin = searchParams.get('origin') || 'DEL';
  const destination = searchParams.get('destination') || 'BOM';
  const departureDate = searchParams.get('date') || '2024-12-25';

  return NextResponse.json({
    api: "Flight Search API v2.0",
    description: "Search and compare flights from multiple airlines",
    endpoints: {
      search: "POST /api/flight-api/search",
      quickSearch: `GET /api/flight-api/search?origin=${origin}&destination=${destination}&date=${departureDate}`,
      book: "POST /api/flight-api/book",
      availability: "GET /api/flight-api/availability/:flightId",
      status: "GET /api/flight-api/status/:flightNumber"
    },
    features: [
      "Real-time flight search",
      "Multi-airline aggregation",
      "Price comparison",
      "Filtering & sorting",
      "CAI (Cloud Application Integration) support",
      "Mock airline APIs integration"
    ],
    supportedAirlines: ["IndiGo (6E)", "Air India (AI)", "Vistara (UK)", "SpiceJet (SG)", "AirAsia (I5)", "Akasa Air (QP)"],
    status: "operational",
    timestamp: new Date().toISOString(),
    version: "2.0.1",
    documentation: "/api/flight-api/docs"
  });
}