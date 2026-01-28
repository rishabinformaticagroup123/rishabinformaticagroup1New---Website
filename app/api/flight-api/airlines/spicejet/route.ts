import { NextRequest, NextResponse } from 'next/server';

// Individual airline data
const AIRLINES_DATA = [
  {
    id: "indigo",
    code: "6E",
    name: "IndiGo",
    logo: "/airlines/indigo.png",
    iata: "6E",
    icao: "IGO",
    hub: "Indira Gandhi International Airport (DEL)",
    bases: ["DEL", "BOM", "BLR", "MAA", "HYD"],
    fleetSize: 350,
    destinations: 101,
    website: "https://www.goindigo.in",
    contact: {
      phone: "+91 124 661 3838",
      email: "customer.relations@indigo.in",
      support: "https://www.goindigo.in/contact-us.html"
    },
    api: {
      endpoint: "/api/flight-api/airlines/indigo/search",
      authType: "API Key",
      documentation: "https://developer.goindigo.in",
      rateLimit: "100 requests/minute",
      features: ["Flight Search", "Booking", "Availability", "Pricing"]
    },
    baggagePolicy: {
      cabin: "7kg",
      checkin: "15kg (Domestic), 20kg (International)",
      dimensions: "55x35x25 cm (cabin), 158 cm linear (check-in)"
    },
    amenities: ["In-flight Entertainment", "Meals for purchase", "Extra Legroom Seats", "Priority Boarding"],
    status: "active"
  },
  {
    id: "airindia",
    code: "AI",
    name: "Air India",
    logo: "/airlines/airindia.png",
    iata: "AI",
    icao: "AIC",
    hub: "Indira Gandhi International Airport (DEL)",
    bases: ["DEL", "BOM", "BLR", "MAA", "CCU"],
    fleetSize: 120,
    destinations: 85,
    website: "https://www.airindia.in",
    contact: {
      phone: "+91 124 264 1407",
      email: "customer.relations@airindia.in",
      support: "https://www.airindia.in/contact-us.htm"
    },
    api: {
      endpoint: "/api/flight-api/airlines/airindia/search",
      authType: "OAuth 2.0",
      documentation: "https://developer.airindia.in",
      rateLimit: "50 requests/minute",
      features: ["Flight Search", "Booking", "Loyalty Integration", "Ancillary Services"]
    },
    baggagePolicy: {
      cabin: "8kg",
      checkin: "25kg (Domestic), 30kg (International)",
      dimensions: "55x40x23 cm (cabin), 158 cm linear (check-in)"
    },
    amenities: ["Complimentary Meals", "Business Lounge Access", "In-flight Entertainment", "Extra Baggage"],
    status: "active"
  },
  {
    id: "vistara",
    code: "UK",
    name: "Vistara",
    logo: "/airlines/vistara.png",
    iata: "UK",
    icao: "VTI",
    hub: "Indira Gandhi International Airport (DEL)",
    bases: ["DEL", "BOM", "BLR", "CCU"],
    fleetSize: 70,
    destinations: 43,
    website: "https://www.airvistara.com",
    contact: {
      phone: "+91 92892 88888",
      email: "feedback@airvistara.com",
      support: "https://www.airvistara.com/contact-us"
    },
    api: {
      endpoint: "/api/flight-api/airlines/vistara/search",
      authType: "API Key + Secret",
      documentation: "https://developer.airvistara.com",
      rateLimit: "75 requests/minute",
      features: ["Flight Search", "Booking", "Seat Selection", "Meal Booking"]
    },
    baggagePolicy: {
      cabin: "7kg",
      checkin: "15kg (Economy), 25kg (Premium), 35kg (Business)",
      dimensions: "55x40x20 cm (cabin), 158 cm linear (check-in)"
    },
    amenities: ["Premium Economy", "Complimentary Meals & Drinks", "Extra Legroom", "Priority Services"],
    status: "active"
  },
  {
    id: "spicejet",
    code: "SG",
    name: "SpiceJet",
    logo: "/airlines/spicejet.png",
    iata: "SG",
    icao: "SEJ",
    hub: "Indira Gandhi International Airport (DEL)",
    bases: ["DEL", "BOM", "BLR", "AMD", "GOI"],
    fleetSize: 90,
    destinations: 64,
    website: "https://www.spicejet.com",
    contact: {
      phone: "+91 987 180 3333",
      email: "customer.relations@spicejet.com",
      support: "https://www.spicejet.com/contactus"
    },
    api: {
      endpoint: "/api/flight-api/airlines/spicejet/search",
      authType: "Basic Auth",
      documentation: "https://developer.spicejet.com",
      rateLimit: "60 requests/minute",
      features: ["Flight Search", "Booking", "Dynamic Pricing", "Ancillary Services"]
    },
    baggagePolicy: {
      cabin: "7kg",
      checkin: "15kg (paid extra)",
      dimensions: "55x40x20 cm (cabin), 158 cm linear (check-in)"
    },
    amenities: ["Hot Meals", "Extra Legroom", "SpiceMax", "Web Check-in"],
    status: "active"
  },
  {
    id: "airasia",
    code: "I5",
    name: "AirAsia India",
    logo: "/airlines/airasia.png",
    iata: "I5",
    icao: "IAD",
    hub: "Kempegowda International Airport (BLR)",
    bases: ["BLR", "DEL", "BOM", "CCU"],
    fleetSize: 40,
    destinations: 32,
    website: "https://www.airasia.com",
    contact: {
      phone: "+91 80 4565 4321",
      email: "customercare@airasia.com",
      support: "https://support.airasia.com"
    },
    api: {
      endpoint: "/api/flight-api/airlines/airasia/search",
      authType: "API Key",
      documentation: "https://developer.airasia.com",
      rateLimit: "80 requests/minute",
      features: ["Flight Search", "Booking", "Promotions", "Loyalty"]
    },
    baggagePolicy: {
      cabin: "7kg",
      checkin: "15kg (add-on purchase)",
      dimensions: "56x36x23 cm (cabin), 158 cm linear (check-in)"
    },
    amenities: ["Hot Seats", "In-flight Meals", "Priority Boarding", "Self Check-in"],
    status: "active"
  },
  {
    id: "akasa",
    code: "QP",
    name: "Akasa Air",
    logo: "/airlines/akasa.png",
    iata: "QP",
    icao: "AKJ",
    hub: "Kempegowda International Airport (BLR)",
    bases: ["BLR", "BOM", "DEL", "CCU"],
    fleetSize: 25,
    destinations: 18,
    website: "https://www.akasaair.com",
    contact: {
      phone: "+91 80 6190 6767",
      email: "care@akasaair.com",
      support: "https://www.akasaair.com/contact-us"
    },
    api: {
      endpoint: "/api/flight-api/airlines/akasa/search",
      authType: "API Token",
      documentation: "https://developer.akasaair.com",
      rateLimit: "40 requests/minute",
      features: ["Flight Search", "Booking", "Schedule", "Fare Rules"]
    },
    baggagePolicy: {
      cabin: "7kg",
      checkin: "15kg",
      dimensions: "55x40x20 cm (cabin), 158 cm linear (check-in)"
    },
    amenities: ["Complimentary Snack", "Extra Legroom", "In-flight Magazine", "Web Check-in"],
    status: "active"
  }
];

// Main airlines endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const airlineCode = searchParams.get('code');
  const airlineId = searchParams.get('id');
  const detailed = searchParams.get('detailed') === 'true';

  console.log('🛩️ Airlines API called:', { airlineCode, airlineId, detailed });

  // If specific airline requested
  if (airlineCode || airlineId) {
    const airline = AIRLINES_DATA.find(a => 
      a.code === airlineCode || a.id === airlineId
    );
    
    if (!airline) {
      return NextResponse.json(
        {
          success: false,
          error: "AIRLINE_NOT_FOUND",
          message: `Airline with ${airlineCode ? 'code ' + airlineCode : 'ID ' + airlineId} not found`
        },
        { status: 404 }
      );
    }

    const response = detailed ? airline : {
      id: airline.id,
      code: airline.code,
      name: airline.name,
      website: airline.website,
      status: airline.status
    };

    return NextResponse.json({
      success: true,
      data: response,
      metadata: {
        retrievedAt: new Date().toISOString(),
        source: "Airline Registry",
        version: "1.0"
      }
    });
  }

  // Return all airlines
  const airlinesList = detailed ? AIRLINES_DATA : AIRLINES_DATA.map(airline => ({
    id: airline.id,
    code: airline.code,
    name: airline.name,
    logo: airline.logo,
    website: airline.website,
    status: airline.status,
    apiEndpoint: airline.api.endpoint
  }));

  await new Promise(resolve => setTimeout(resolve, 100));

  return NextResponse.json({
    success: true,
    data: {
      airlines: airlinesList,
      total: AIRLINES_DATA.length,
      active: AIRLINES_DATA.filter(a => a.status === "active").length
    },
    metadata: {
      retrievedAt: new Date().toISOString(),
      count: airlinesList.length,
      pagination: {
        page: 1,
        limit: 50,
        totalPages: 1
      }
    }
  });
}

// POST method for airline API testing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { airlineCode, testType = "connection", apiKey } = body;

    console.log('🔧 Airline API test requested:', { airlineCode, testType });

    const airline = AIRLINES_DATA.find(a => a.code === airlineCode);
    
    if (!airline) {
      return NextResponse.json({
        success: false,
        error: "AIRLINE_NOT_SUPPORTED",
        message: `Airline ${airlineCode} is not supported or invalid`
      });
    }

    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 300));

    const testResults = {
      airline: airline.name,
      code: airline.code,
      apiEndpoint: airline.api.endpoint,
      testType,
      timestamp: new Date().toISOString(),
      results: {
        connection: {
          status: "success",
          responseTime: "285ms",
          message: "Successfully connected to airline API"
        },
        authentication: apiKey ? {
          status: "success",
          message: "API key validated successfully"
        } : {
          status: "skipped",
          message: "No API key provided for authentication test"
        },
        endpoints: {
          search: "available",
          availability: "available",
          booking: "available",
          status: "available"
        },
        rateLimit: {
          remaining: Math.floor(Math.random() * 90) + 10,
          reset: new Date(Date.now() + 60 * 1000).toISOString()
        }
      },
      recommendations: [
        "Keep API key secure",
        "Implement retry logic for failed requests",
        "Cache responses for better performance",
        "Monitor rate limit usage"
      ]
    };

    return NextResponse.json({
      success: true,
      message: `API test completed for ${airline.name}`,
      data: testResults,
      caiIntegration: {
        compatible: true,
        connectorType: "REST",
        configuration: {
          baseUrl: `http://localhost:3000${airline.api.endpoint}`,
          auth: {
            type: airline.api.authType,
            key: apiKey ? "***" + apiKey.slice(-4) : "not_provided"
          },
          timeout: 30000,
          retry: {
            attempts: 3,
            backoff: 1000
          }
        }
      }
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "TEST_FAILED",
        message: "API test failed. Please check your request."
      },
      { status: 400 }
    );
  }
}