import { NextRequest, NextResponse } from 'next/server';

interface Passenger {
  title: 'Mr' | 'Mrs' | 'Ms';
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
  seatPreference?: 'Aisle' | 'Window' | 'Middle';
  mealPreference?: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Jain';
}

interface ContactInfo {
  email: string;
  phone: string;
  countryCode: string;
  address?: string;
  city?: string;
  pincode?: string;
}

interface PaymentInfo {
  method: 'Credit Card' | 'Debit Card' | 'Net Banking' | 'UPI' | 'Wallet';
  cardNumber?: string;
  cardHolder?: string;
  expiry?: string;
  cvv?: string;
  upiId?: string;
  walletType?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      flightId, 
      passengers, 
      contactInfo, 
      paymentInfo,
      insurance = false,
      extras = {}
    }: {
      flightId: string;
      passengers: Passenger[];
      contactInfo: ContactInfo;
      paymentInfo: PaymentInfo;
      insurance: boolean;
      extras: any;
    } = body;

    console.log('🎫 Booking Request Received:', { 
      flightId, 
      passengerCount: passengers.length,
      contactEmail: contactInfo.email 
    });

    // Validate input
    if (!flightId || !passengers || passengers.length === 0 || !contactInfo || !paymentInfo) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_REQUEST",
          message: "Missing required booking information"
        },
        { status: 400 }
      );
    }

    // Generate booking references
    const bookingRef = `BK${Date.now().toString().slice(-8)}`;
    const pnr = Math.random().toString(36).substring(2, 8).toUpperCase();
    const eTicketNumber = `ETKT${Date.now().toString().slice(-10)}`;

    // Calculate pricing
    const basePrice = 4250; // Mock price per passenger
    const taxPercentage = 0.18;
    const convenienceFee = 199;
    const insuranceAmount = insurance ? 299 : 0;
    
    const subtotal = basePrice * passengers.length;
    const taxAmount = subtotal * taxPercentage;
    const totalAmount = subtotal + taxAmount + convenienceFee + insuranceAmount;

    // Generate seat numbers
    const seatNumbers = passengers.map((_, index) => {
      const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
      const row = Math.floor(Math.random() * 30) + 10;
      const seat = rows[Math.floor(Math.random() * rows.length)];
      return `${row}${seat}`;
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const bookingTime = new Date();
    const departureTime = new Date(bookingTime.getTime() + 24 * 60 * 60 * 1000); // Tomorrow

    return NextResponse.json({
      success: true,
      booking: {
        bookingId: bookingRef,
        pnr: pnr,
        eTicketNumber: eTicketNumber,
        status: "CONFIRMED",
        statusCode: "HK", // Held Confirmed
        flightId: flightId,
        flightDetails: {
          airline: "IndiGo",
          flightNumber: "6E 205",
          departure: {
            airport: "Delhi (DEL)",
            terminal: "T3",
            date: departureTime.toISOString().split('T')[0],
            time: "06:00",
            gate: "23A"
          },
          arrival: {
            airport: "Mumbai (BOM)",
            terminal: "T2",
            date: departureTime.toISOString().split('T')[0],
            time: "08:15",
            gate: "15B"
          },
          duration: "2h 15m"
        },
        passengers: passengers.map((passenger, index) => ({
          ...passenger,
          seatNumber: seatNumbers[index],
          ticketNumber: `${eTicketNumber}-${index + 1}`,
          baggageAllowance: "20kg (1 piece)",
          status: "Confirmed"
        })),
        contactInfo,
        fareBreakdown: {
          baseFare: subtotal,
          taxesAndFees: {
            gst: taxAmount,
            convenienceFee: convenienceFee,
            insurance: insuranceAmount,
            totalTaxes: taxAmount + convenienceFee + insuranceAmount
          },
          totalAmount: totalAmount,
          currency: "INR",
          paymentMethod: paymentInfo.method,
          paymentStatus: "COMPLETED",
          transactionId: `TXN${Date.now().toString().slice(-10)}`
        },
        extras: {
          insurance: insurance,
          mealBooked: extras.meal || false,
          seatSelection: extras.seatSelection || false,
          priorityBoarding: extras.priorityBoarding || false,
          extraBaggage: extras.extraBaggage || "0kg"
        },
        timeline: {
          bookingTime: bookingTime.toISOString(),
          checkinOpens: new Date(departureTime.getTime() - 24 * 60 * 60 * 1000).toISOString(), // 24h before
          checkinCloses: new Date(departureTime.getTime() - 1 * 60 * 60 * 1000).toISOString(), // 1h before
          boardingTime: new Date(departureTime.getTime() - 45 * 60 * 1000).toISOString(), // 45m before
          departureTime: departureTime.toISOString()
        },
        importantNotes: [
          "Web check-in opens 24 hours before departure",
          "Carry a printed copy of e-ticket and valid photo ID",
          "Report at airport 2 hours before domestic flights",
          "Baggage allowance: 20kg check-in + 7kg cabin",
          "No refund for no-show or missed flights"
        ],
        support: {
          airlineHelpline: "+91 124 661 3838",
          email: "customer.relations@indigo.com",
          airportContact: "+91 22 6685 1010 (Mumbai)",
          emergency: "+91 922 322 1111"
        }
      },
      caiIntegration: {
        enabled: true,
        provider: "IndiGo Airlines API",
        processId: `CAI-BOOK-${Date.now()}`,
        status: "SYNCED",
        message: "Booking confirmed and synchronized with airline system"
      },
      nextSteps: [
        {
          action: "Check Email",
          description: "E-ticket sent to " + contactInfo.email,
          priority: "high"
        },
        {
          action: "Download Ticket",
          description: "Download e-ticket from booking confirmation page",
          priority: "high"
        },
        {
          action: "Web Check-in",
          description: "Available 24 hours before departure",
          priority: "medium",
          availableAt: new Date(departureTime.getTime() - 24 * 60 * 60 * 1000).toISOString()
        },
        {
          action: "Baggage Tag",
          description: "Print baggage tags during web check-in",
          priority: "medium"
        }
      ]
    });

  } catch (error) {
    console.error('❌ Booking error:', error);
    return NextResponse.json(
      {
        success: false,
        error: "BOOKING_FAILED",
        message: "Unable to process booking. Please try again.",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    api: "Flight Booking API v1.0",
    description: "Handle flight bookings, payments, and ticketing",
    method: "POST",
    requiredFields: {
      flightId: "string",
      passengers: "array of passenger objects",
      contactInfo: "object with email and phone",
      paymentInfo: "object with payment details"
    },
    exampleRequest: {
      flightId: "FL-6E-205-001",
      passengers: [{
        title: "Mr",
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        dateOfBirth: "1990-01-01",
        nationality: "Indian"
      }],
      contactInfo: {
        email: "john@example.com",
        phone: "9876543210",
        countryCode: "+91"
      },
      paymentInfo: {
        method: "Credit Card",
        cardNumber: "**** **** **** 1234",
        cardHolder: "John Doe",
        expiry: "12/25",
        cvv: "***"
      }
    },
    status: "operational",
    timestamp: new Date().toISOString()
  });
}