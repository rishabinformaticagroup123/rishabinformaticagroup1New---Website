'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Plane, 
  Calendar,
  Clock,
  Users,
  ChevronRight,
  Shield,
  Sparkles,
  TrendingUp,
  Star,
  CheckCircle,
  X,
  RefreshCw,
  BarChart3,
  Zap,
  Globe,
  BadgePercent
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CompanySlider from "@/components/company-slider";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// CAI Integration Types
interface CAIFlightResult {
  id: string;
  airline: {
    name: string;
    code: string;
    logo: string;
  };
  departure: {
    time: string;
    airport: string;
    code: string;
  };
  arrival: {
    time: string;
    airport: string;
    code: string;
  };
  duration: string;
  stops: number;
  price: number;
  provider: string;
  caiMetadata: {
    processId: string;
    providerResponseTime: number;
    isBestDeal: boolean;
    confidenceScore: number;
  };
  amenities: string[];
}

interface CAIProcessStatus {
  id: string;
  status: 'searching' | 'aggregating' | 'completed' | 'error';
  progress: number;
  providers: string[];
  foundResults: number;
  estimatedTime: number;
}

// Flight Search Form Data
interface FlightSearchData {
  from: string;
  to: string;
  departureDate: Date;
  returnDate?: Date;
  travelers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: string;
  caiConfig: {
    providers: string[];
    timeout: number;
    aggregationStrategy: string;
  };
}

// Sample Airlines Data
const airlines = [
  { name: "Air India", code: "AI", logo: "/airlines/air-india.png" },
  { name: "IndiGo", code: "6E", logo: "/airlines/indigo.png" },
  { name: "Vistara", code: "UK", logo: "/airlines/vistara.png" },
  { name: "SpiceJet", code: "SG", logo: "/airlines/spicejet.png" },
  { name: "AirAsia", code: "I5", logo: "/airlines/airasia.png" },
  { name: "Akasa Air", code: "QP", logo: "/airlines/akasa.png" },
];

// Popular Routes
const popularRoutes = [
  { from: "Delhi", to: "Mumbai", code: "DEL-BOM" },
  { from: "Bangalore", to: "Delhi", code: "BLR-DEL" },
  { from: "Mumbai", to: "Chennai", code: "BOM-MAA" },
  { from: "Hyderabad", to: "Bangalore", code: "HYD-BLR" },
  { from: "Kolkata", to: "Delhi", code: "CCU-DEL" },
  { from: "Chennai", to: "Dubai", code: "MAA-DXB" },
];

// Cabin Classes
const cabinClasses = [
  { value: "economy", label: "Economy", icon: "💺" },
  { value: "premium", label: "Premium Economy", icon: "✨" },
  { value: "business", label: "Business", icon: "🎩" },
  { value: "first", label: "First Class", icon: "👑" },
];

// CAI Integrated Airlines
const caiIntegratedAirlines = [
  "Air India", "IndiGo", "Vistara", "SpiceJet", "AirAsia", 
  "Akasa Air", "Emirates", "Qatar Airways", "Singapore Airlines"
];

export default function FlightBookingPage() {
  // State Management for CAI Integration
  const [searchData, setSearchData] = useState<FlightSearchData>({
    from: "",
    to: "",
    departureDate: new Date(),
    travelers: { adults: 1, children: 0, infants: 0 },
    cabinClass: "economy",
    caiConfig: {
      providers: caiIntegratedAirlines,
      timeout: 30000,
      aggregationStrategy: "bestPrice"
    }
  });

  const [flights, setFlights] = useState<CAIFlightResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [caiProcess, setCaiProcess] = useState<CAIProcessStatus | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<CAIFlightResult | null>(null);
  const [sortBy, setSortBy] = useState<string>("best");

  // Filter States
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 50000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [stopsFilter, setStopsFilter] = useState<string>("all");
  const [departureTime, setDepartureTime] = useState<string>("all");

  // Mock flight data (in production, this comes from CAI)
  const mockFlights: CAIFlightResult[] = [
    {
      id: "flight-001",
      airline: { name: "IndiGo", code: "6E", logo: "/airlines/indigo.png" },
      departure: { time: "06:00", airport: "Kempegowda International", code: "BLR" },
      arrival: { time: "08:15", airport: "Indira Gandhi International", code: "DEL" },
      duration: "2h 15m",
      stops: 0,
      price: 4250,
      provider: "IndiGo Direct",
      caiMetadata: {
        processId: "cai-123",
        providerResponseTime: 1200,
        isBestDeal: true,
        confidenceScore: 95
      },
      amenities: ["Free Meal", "20kg Baggage", "In-flight Entertainment"]
    },
    {
      id: "flight-002",
      airline: { name: "Air India", code: "AI", logo: "/airlines/air-india.png" },
      departure: { time: "09:30", airport: "Kempegowda International", code: "BLR" },
      arrival: { time: "12:00", airport: "Indira Gandhi International", code: "DEL" },
      duration: "2h 30m",
      stops: 0,
      price: 4800,
      provider: "Air India Portal",
      caiMetadata: {
        processId: "cai-124",
        providerResponseTime: 1500,
        isBestDeal: false,
        confidenceScore: 90
      },
      amenities: ["Business Lounge", "30kg Baggage", "Priority Boarding"]
    },
    {
      id: "flight-003",
      airline: { name: "Vistara", code: "UK", logo: "/airlines/vistara.png" },
      departure: { time: "14:00", airport: "Kempegowda International", code: "BLR" },
      arrival: { time: "16:30", airport: "Indira Gandhi International", code: "DEL" },
      duration: "2h 30m",
      stops: 1,
      price: 3850,
      provider: "Vistara API",
      caiMetadata: {
        processId: "cai-125",
        providerResponseTime: 800,
        isBestDeal: false,
        confidenceScore: 88
      },
      amenities: ["Free Meal", "15kg Baggage"]
    }
  ];

  // CAI Process Simulation
  const simulateCAIProcess = () => {
    setLoading(true);
    setCaiProcess({
      id: `cai-${Date.now()}`,
      status: 'searching',
      progress: 0,
      providers: caiIntegratedAirlines,
      foundResults: 0,
      estimatedTime: 30
    });

    // Simulate CAI process steps
    const interval = setInterval(() => {
      setCaiProcess(prev => {
        if (!prev) return null;
        
        let newProgress = prev.progress + 10;
        let newStatus = prev.status;
        let foundResults = prev.foundResults;
        
        if (newProgress >= 100) {
          newStatus = 'completed';
          foundResults = mockFlights.length;
          clearInterval(interval);
          setLoading(false);
          setFlights(mockFlights);
        } else if (newProgress >= 50) {
          newStatus = 'aggregating';
          foundResults = Math.floor(Math.random() * 50) + 20;
        }
        
        return {
          ...prev,
          progress: newProgress,
          status: newStatus,
          foundResults
        };
      });
    }, 500);
  };

  // Handle Flight Search (CAI Integration)
  const handleFlightSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, this would call your backend → CAI → Flight providers
    console.log("Search Data for CAI:", searchData);
    
    // Simulate CAI process
    simulateCAIProcess();
    
    // Production API call would be:
    /*
    const response = await fetch('/api/cai/flights/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CAI-Process': 'FlightSearchAggregation'
      },
      body: JSON.stringify({
        ...searchData,
        caiConfig: {
          providers: searchData.caiConfig.providers,
          timeout: searchData.caiConfig.timeout,
          aggregation: searchData.caiConfig.aggregationStrategy
        }
      })
    });
    
    const data = await response.json();
    setCaiProcess(data.processStatus);
    setFlights(data.results);
    */
  };

  // Handle Booking (CAI Integration)
  const handleBookFlight = async (flight: CAIFlightResult) => {
    setSelectedFlight(flight);
    
    // In production, this triggers CAI booking workflow
    console.log("Booking flight via CAI:", flight);
    
    // Production API call would be:
    /*
    const response = await fetch('/api/cai/flights/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        flightId: flight.id,
        provider: flight.provider,
        price: flight.price,
        passengerDetails: {}, // From form
        caiWorkflow: {
          processName: 'FlightBooking',
          compensationEnabled: true,
          asyncConfirmation: true
        }
      })
    });
    */
  };

  // Filter flights based on selections
  const filteredFlights = flights.filter(flight => {
    // Price filter
    if (flight.price < priceRange[0] || flight.price > priceRange[1]) return false;
    
    // Airline filter
    if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline.name)) return false;
    
    // Stops filter
    if (stopsFilter === "nonstop" && flight.stops > 0) return false;
    if (stopsFilter === "1stop" && flight.stops !== 1) return false;
    
    // Departure time filter
    if (departureTime === "morning") {
      const hour = parseInt(flight.departure.time.split(':')[0]);
      if (hour < 6 || hour >= 12) return false;
    } else if (departureTime === "afternoon") {
      const hour = parseInt(flight.departure.time.split(':')[0]);
      if (hour < 12 || hour >= 18) return false;
    }
    
    return true;
  });

  // Sort flights
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (sortBy) {
      case "price": return a.price - b.price;
      case "duration": 
        const aDur = parseInt(a.duration.replace('h', '').replace('m', ''));
        const bDur = parseInt(b.duration.replace('h', '').replace('m', ''));
        return aDur - bDur;
      case "departure":
        return a.departure.time.localeCompare(b.departure.time);
      default: return a.price - b.price; // Best is by price
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Search Section - MakeMyTrip Style */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold">✈️ SkyBooker Pro</h1>
                <p className="text-blue-100 mt-2">Powered by Informatica CAI Integration</p>
              </div>
              <Badge className="bg-green-600 hover:bg-green-700">
                <Shield className="w-4 h-4 mr-2" />
                Secure Booking
              </Badge>
            </div>

            {/* Search Form */}
            <form onSubmit={handleFlightSearch} className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Trip Type */}
                <div className="md:col-span-2">
                  <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                    {["Round Trip", "One Way", "Multi City"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        className="flex-1 py-2 text-sm font-medium rounded-md hover:bg-white"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* From */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="City or airport"
                      value={searchData.from}
                      onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                      className="pl-10"
                    />
                    <Plane className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* To */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="City or airport"
                      value={searchData.to}
                      onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                      className="pl-10"
                    />
                    <Plane className="absolute left-3 top-3 h-4 w-4 text-gray-400 rotate-45" />
                  </div>
                </div>

                {/* Dates */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !searchData.departureDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {searchData.departureDate ? (
                          format(searchData.departureDate, "dd MMM")
                        ) : (
                          <span>Pick date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={searchData.departureDate}
                        onSelect={(date) => date && setSearchData({...searchData, departureDate: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Travelers & Class */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travelers & Class
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        {searchData.travelers.adults + searchData.travelers.children} • {searchData.cabinClass}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Adults</span>
                          <div className="flex items-center gap-3">
                            <Button size="sm" variant="outline">-</Button>
                            <span>{searchData.travelers.adults}</span>
                            <Button size="sm" variant="outline">+</Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span>Cabin Class</span>
                          <div className="grid grid-cols-2 gap-2">
                            {cabinClasses.map((cls) => (
                              <button
                                key={cls.value}
                                type="button"
                                className={`p-2 rounded-lg border ${
                                  searchData.cabinClass === cls.value 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200'
                                }`}
                                onClick={() => setSearchData({...searchData, cabinClass: cls.value})}
                              >
                                <div className="flex items-center gap-2">
                                  <span>{cls.icon}</span>
                                  <span className="text-sm">{cls.label}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="border-blue-200">
                    <Sparkles className="w-3 h-3 mr-1" />
                    CAI Integrated
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Searching across {caiIntegratedAirlines.length} airlines
                  </span>
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                  disabled={loading}
                >
                  <Search className="mr-2 h-4 w-4" />
                  {loading ? 'Searching...' : 'Search Flights'}
                </Button>
              </div>
            </form>

            {/* Popular Routes */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
              <div className="flex flex-wrap gap-3">
                {popularRoutes.map((route) => (
                  <button
                    key={route.code}
                    type="button"
                    onClick={() => {
                      setSearchData({
                        ...searchData,
                        from: route.from,
                        to: route.to
                      });
                    }}
                    className="bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 text-sm backdrop-blur-sm transition-colors"
                  >
                    {route.from} → {route.to}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAI Process Monitor */}
      {caiProcess && (
        <div className="container mx-auto px-4 mt-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    CAI Process: {caiProcess.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Status: <span className="font-medium">{caiProcess.status.toUpperCase()}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  {caiProcess.foundResults} flights found
                </div>
                <div className="text-xs text-gray-500">
                  Searching {caiProcess.providers.length} providers
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{caiProcess.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${caiProcess.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Price Filter */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Airlines Filter */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Airlines</h3>
                  <div className="space-y-2">
                    {airlines.map((airline) => (
                      <label key={airline.code} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAirlines.includes(airline.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAirlines([...selectedAirlines, airline.name]);
                            } else {
                              setSelectedAirlines(selectedAirlines.filter(a => a !== airline.name));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{airline.name}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stops Filter */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Stops</h3>
                  <div className="space-y-2">
                    {["all", "nonstop", "1stop"].map((stop) => (
                      <button
                        key={stop}
                        onClick={() => setStopsFilter(stop)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                          stopsFilter === stop
                            ? 'bg-blue-50 border border-blue-200 text-blue-700'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {stop === "all" ? "All Stops" : 
                         stop === "nonstop" ? "Non-stop" : "1 Stop"}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CAI Info Panel */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">CAI Integration</h3>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Real-time price aggregation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Multi-provider search</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Best deal detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Secure booking workflow</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Flight Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {sortedFlights.length} Flights Found
                </h2>
                <p className="text-gray-600">
                  {searchData.from || "Delhi"} → {searchData.to || "Mumbai"} • {format(searchData.departureDate, "dd MMM yyyy")}
                </p>
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="flex space-x-2">
                  {["best", "price", "duration", "departure"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`px-3 py-1.5 text-sm rounded-full capitalize ${
                        sortBy === option
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option === "best" ? "Best" : option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
              {sortedFlights.map((flight) => (
                <Card key={flight.id} className="hover:shadow-lg transition-shadow border-blue-100">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Airline Info */}
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Plane className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{flight.airline.name}</h3>
                            <p className="text-sm text-gray-600">{flight.airline.code} • {flight.provider}</p>
                          </div>
                        </div>
                        {flight.caiMetadata.isBestDeal && (
                          <Badge className="mt-3 bg-green-100 text-green-800 border-green-200">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Best Deal via CAI
                          </Badge>
                        )}
                      </div>

                      {/* Flight Schedule */}
                      <div className="md:col-span-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-2xl font-bold">{flight.departure.time}</div>
                            <div className="text-sm text-gray-600">{flight.departure.code}</div>
                            <div className="text-xs text-gray-500">{flight.departure.airport}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-500">{flight.duration}</div>
                            <div className="h-px bg-gray-300 my-2 relative">
                              <div className="absolute left-0 top-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full bg-gray-400"></div>
                              <div className="absolute right-0 top-1/2 w-2 h-2 -mt-1 -mr-1 rounded-full bg-gray-400"></div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{flight.arrival.time}</div>
                            <div className="text-sm text-gray-600">{flight.arrival.code}</div>
                            <div className="text-xs text-gray-500">{flight.arrival.airport}</div>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="md:col-span-3">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {flight.amenities.map((amenity, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">
                          CAI Score: {flight.caiMetadata.confidenceScore}%
                        </div>
                      </div>

                      {/* Price & Book */}
                      <div className="md:col-span-2">
                        <div className="text-right">
                          <div className="text-3xl font-bold text-blue-700">
                            ₹{flight.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600 mb-4">per person</div>
                          <Button
                            onClick={() => handleBookFlight(flight)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            Book Now
                          </Button>
                          <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 w-full text-center">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results State */}
            {sortedFlights.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Plane className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No flights found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  onClick={() => {
                    setSelectedAirlines([]);
                    setPriceRange([1000, 50000]);
                    setStopsFilter("all");
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Secure Booking</h4>
              <p className="text-sm text-gray-600">SSL encrypted transactions</p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Global Coverage</h4>
              <p className="text-sm text-gray-600">Flights to 100+ countries</p>
            </div>
            <div className="text-center">
              <BadgePercent className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Best Price Guarantee</h4>
              <p className="text-sm text-gray-600">Powered by CAI aggregation</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Instant Confirmation</h4>
              <p className="text-sm text-gray-600">Real-time booking via CAI</p>
            </div>
          </div>
        </div>
      </div>

      {/* CAI Integration Demo */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Powered by Informatica CAI
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Our platform uses CAI to aggregate flight data from multiple providers, 
              ensuring you get the best deals with real-time availability checks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">9+</div>
                <div className="text-sm">Airline Providers</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-sm">Booking Success Rate</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm">Real-time Updates</div>
              </div>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-700 hover:bg-gray-100"
              onClick={() => window.open('/cai-demo', '_blank')}
            >
              View CAI Integration Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}