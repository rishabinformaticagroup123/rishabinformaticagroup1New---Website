import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const flightNumber = request.nextUrl.searchParams.get('flightNumber') || 
                      request.nextUrl.pathname.split('/').pop() || '6E205';

  console.log('🛫 Flight status check:', flightNumber);

  // Clean flight number
  const cleanFlightNumber = flightNumber.replace(/\s/g, '').toUpperCase();
  
  // Mock flight status data
  const statuses = [
    {
      flightNumber: cleanFlightNumber,
      airline: cleanFlightNumber.startsWith('6E') ? 'IndiGo' : 
               cleanFlightNumber.startsWith('AI') ? 'Air India' : 
               cleanFlightNumber.startsWith('UK') ? 'Vistara' : 'SpiceJet',
      route: 'DEL → BOM',
      scheduledDeparture: '06:00',
      scheduledArrival: '08:15',
      estimatedDeparture: '06:15',
      estimatedArrival: '08:30',
      departureTerminal: 'T3',
      arrivalTerminal: 'T2',
      status: 'On Time',
      statusCode: 'ON_TIME',
      delay: '15 minutes',
      aircraft: 'Airbus A320neo',
      registration: 'VT-IND',
      gate: '23A',
      baggageCarousel: '5',
      lastUpdated: new Date().toISOString(),
      weather: {
        departure: 'Clear, 18°C',
        arrival: 'Partly Cloudy, 25°C'
      },
      timeline: [
        { time: '04:00', event: 'Check-in opens', status: 'completed' },
        { time: '05:30', event: 'Boarding starts', status: 'in-progress' },
        { time: '05:55', event: 'Boarding closes', status: 'pending' },
        { time: '06:00', event: 'Scheduled departure', status: 'pending' },
        { time: '08:15', event: 'Scheduled arrival', status: 'pending' }
      ]
    },
    {
      flightNumber: 'AI865',
      airline: 'Air India',
      route: 'DEL → BOM',
      scheduledDeparture: '09:30',
      scheduledArrival: '11:45',
      estimatedDeparture: '09:30',
      estimatedArrival: '11:45',
      status: 'On Time',
      statusCode: 'ON_TIME',
      delay: '0 minutes'
    },
    {
      flightNumber: 'UK945',
      airline: 'Vistara',
      route: 'DEL → BOM',
      scheduledDeparture: '14:00',
      scheduledArrival: '16:30',
      estimatedDeparture: '14:20',
      estimatedArrival: '16:50',
      status: 'Delayed',
      statusCode: 'DELAYED',
      delay: '20 minutes',
      reason: 'Late arrival of incoming aircraft'
    }
  ];

  const flightStatus = statuses.find(s => 
    s.flightNumber.includes(cleanFlightNumber) || 
    cleanFlightNumber.includes(s.flightNumber)
  ) || statuses[0];

  await new Promise(resolve => setTimeout(resolve, 150));

  return NextResponse.json({
    success: true,
    data: flightStatus,
    metadata: {
      retrievedAt: new Date().toISOString(),
      source: 'Airline Operations System',
      accuracy: 'high',
      nextUpdate: new Date(Date.now() + 2 * 60 * 1000).toISOString() // 2 minutes
    }
  });
}