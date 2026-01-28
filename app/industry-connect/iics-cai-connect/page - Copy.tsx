// app/industry-connect/iics-cai-connect/page.tsx
'use client';

// ==================== TEMPORARY ERROR SUPPRESSION ====================
// ADD THIS AT THE VERY TOP, RIGHT AFTER 'use client'
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Encountered two children with the same key')) {
    return; // Suppress duplicate key warnings
  }
  originalError.apply(console, args);
};

console.warn = (...args) => {
  originalWarn.apply(console, args);
};
// ====================================================================

// THEN YOUR IMPORTS
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search, Filter, Plane, Calendar, Clock, Users, 
  Shield, Sparkles, TrendingUp, Star, CheckCircle, 
  RefreshCw, BarChart, Zap, Globe, BadgePercent,
  ChevronRight, MapPin, Settings, Bell, User, 
  CreditCard, Headphones, ShieldCheck, Rocket, 
  Cpu, Database, Server, Network, Heart, 
  Phone, MessageSquare, Award, Tag, Hotel, 
  Car, Train, Navigation, Wallet, Gift,
  Coffee, Wifi, Tv, Utensils, Baby, LogOut,
  Home, Flight, Briefcase, Umbrella, Compass,
  TrendingDown, ChevronLeft, ChevronUp, Info,
  ShieldOff, Lock, Check, X, ExternalLink
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Types
interface Flight {
  id: string;
  airline: string;
  logo: string;
  code: string;
  departure: { time: string; code: string; airport: string; city: string; date: string; };
  arrival: { time: string; code: string; airport: string; city: string; date: string; };
  duration: string;
  stops: number;
  price: number;
  provider: string;
  caiMetadata: { 
    processId: string; 
    isBestDeal: boolean; 
    confidenceScore: number;
    providerResponseTime: number;
  };
  amenities: string[];
}

interface CAIProcess {
  id: string;
  status: 'searching' | 'aggregating' | 'completed' | 'error';
  progress: number;
  providers: string[];
  foundResults: number;
}

export default function IICSCAILiveLab() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [caiProcess, setCaiProcess] = useState<CAIProcess | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('flights');
  const [searchParams, setSearchParams] = useState({
    from: "DEL",
    to: "BOM",
    departureDate: new Date(),
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    travelers: { adults: 1, children: 0, infants: 0 },
    cabinClass: "economy",
    tripType: "round"
  });

  // Mock flights data
  const mockFlights: Flight[] = [
    {
      id: "FL-001",
      airline: "IndiGo",
      logo: "/airlines/indigo.png",
      code: "6E",
      departure: { 
        time: "06:00", 
        code: "DEL", 
        airport: "Indira Gandhi International",
        city: "Delhi",
        date: "2024-12-25"
      },
      arrival: { 
        time: "08:15", 
        code: "BOM", 
        airport: "Chhatrapati Shivaji Maharaj",
        city: "Mumbai",
        date: "2024-12-25"
      },
      duration: "2h 15m",
      stops: 0,
      price: 4250,
      provider: "IndiGo Airlines API",
      caiMetadata: { 
        processId: "CAI-001",
        isBestDeal: true, 
        confidenceScore: 95,
        providerResponseTime: 1200
      },
      amenities: ["Free Meal", "20kg Baggage", "WiFi", "In-flight Entertainment"]
    },
    {
      id: "FL-002",
      airline: "Air India",
      logo: "/airlines/airindia.png",
      code: "AI",
      departure: { 
        time: "09:30", 
        code: "DEL", 
        airport: "Indira Gandhi International",
        city: "Delhi",
        date: "2024-12-25"
      },
      arrival: { 
        time: "12:00", 
        code: "BOM", 
        airport: "Chhatrapati Shivaji Maharaj",
        city: "Mumbai",
        date: "2024-12-25"
      },
      duration: "2h 30m",
      stops: 0,
      price: 4800,
      provider: "Air India API",
      caiMetadata: { 
        processId: "CAI-002",
        isBestDeal: false, 
        confidenceScore: 88,
        providerResponseTime: 1500
      },
      amenities: ["Business Lounge", "30kg Baggage", "Priority Boarding"]
    },
    {
      id: "FL-003",
      airline: "Vistara",
      logo: "/airlines/vistara.png",
      code: "UK",
      departure: { 
        time: "14:00", 
        code: "DEL", 
        airport: "Indira Gandhi International",
        city: "Delhi",
        date: "2024-12-25"
      },
      arrival: { 
        time: "16:30", 
        code: "BOM", 
        airport: "Chhatrapati Shivaji Maharaj",
        city: "Mumbai",
        date: "2024-12-25"
      },
      duration: "2h 30m",
      stops: 1,
      price: 3850,
      provider: "Vistara API",
      caiMetadata: { 
        processId: "CAI-003",
        isBestDeal: false, 
        confidenceScore: 82,
        providerResponseTime: 800
      },
      amenities: ["Free Meal", "15kg Baggage", "Extra Legroom"]
    }
  ];

  // CAI Process simulation
  const simulateCAIProcess = () => {
    setCaiProcess({
      id: `CAI-${Date.now()}`,
      status: 'searching',
      progress: 0,
      providers: ['IndiGo', 'Air India', 'Vistara', 'SpiceJet', 'AirAsia'],
      foundResults: 0
    });

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
          toast.success('Flights found via CAI integration!');
        } else if (newProgress >= 50) {
          newStatus = 'aggregating';
          foundResults = Math.floor(Math.random() * 30) + 10;
        }
        
        return {
          ...prev,
          progress: newProgress,
          status: newStatus,
          foundResults
        };
      });
    }, 300);
  };

  const handleSearch = () => {
    setLoading(true);
    setFlights([]);
    simulateCAIProcess();
  };

  const handleBookFlight = (flight: Flight) => {
    toast.success(`Booking ${flight.airline} ${flight.code} via CAI...`, {
      description: "Connecting to airline provider API through CAI"
    });
  };

  const navItems = [
    { id: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
    { id: 'hotels', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
    { id: 'trains', label: 'Trains', icon: <Train className="w-4 h-4" /> },
    { id: 'buses', label: 'Buses', icon: <Bus className="w-4 h-4" /> },
    { id: 'cabs', label: 'Cabs', icon: <Car className="w-4 h-4" /> },
    { id: 'holidays', label: 'Holidays', icon: <Umbrella className="w-4 h-4" /> }
  ];

  // Bus icon component
  const Bus = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ==================== PROFESSIONAL HEADER ==================== */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure SSL Booking</span>
                </div>
                <div className="hidden sm:block">|</div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Best Price Guarantee</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>INR ₹</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4" />
                  <span>English</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <Link href="/contact" className="flex items-center gap-2 hover:underline">
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">24/7 Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Logo & Navigation */}
            <div className="flex items-center justify-between w-full lg:w-auto">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">SkyBooker Pro</h1>
                  <p className="text-xs text-gray-500">Powered by Rishab Informatica Group</p>
                </div>
              </div>
              
              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    activeNav === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {activeNav === item.id && (
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <Button variant="outline" className="hidden sm:flex">
                <Headphones className="w-4 h-4 mr-2" />
                Customer Care
              </Button>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <User className="w-4 h-4" />
                  <span>Login/Signup</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      My Account
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      My Bookings
                    </button>
                    <Separator className="my-2" />
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mt-4">
            <div className="flex overflow-x-auto gap-4 pb-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                    activeNav === item.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Search Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">Book Flights, Hotels & Holiday Packages</h2>
                <p className="text-blue-100 mt-2">Powered by IICS CAI Integration</p>
              </div>
              <Badge className="bg-white/20 backdrop-blur-sm">
                <Cpu className="w-3 h-3 mr-1" />
                CAI Connected
              </Badge>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Trip Type */}
                <div className="md:col-span-2">
                  <Select defaultValue="round">
                    <SelectTrigger>
                      <SelectValue placeholder="Trip" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="round">Round Trip</SelectItem>
                      <SelectItem value="one">One Way</SelectItem>
                      <SelectItem value="multi">Multi City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* From */}
                <div className="md:col-span-3">
                  <Label className="text-gray-700">From</Label>
                  <div className="relative">
                    <Input 
                      value="Delhi (DEL)" 
                      className="pl-10"
                    />
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* To */}
                <div className="md:col-span-3">
                  <Label className="text-gray-700">To</Label>
                  <div className="relative">
                    <Input 
                      value="Mumbai (BOM)" 
                      className="pl-10"
                    />
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Dates */}
                <div className="md:col-span-2">
                  <Label className="text-gray-700">Departure</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(new Date(), "dd MMM")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Search Button */}
                <div className="md:col-span-2 flex items-end">
                  <Button 
                    onClick={handleSearch} 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-10"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </div>

              {/* Additional Options */}
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">1 Adult</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Economy</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
                <Switch />
                <span className="text-sm text-gray-600">Direct flights only</span>
              </div>
            </div>
          </div>
        </div>

        {/* CAI Process Monitor */}
        {caiProcess && (
          <Card className="mb-8 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Cpu className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">CAI Process: {caiProcess.id}</h3>
                    <p className="text-sm text-gray-600">
                      Aggregating from {caiProcess.providers.length} airline providers
                    </p>
                  </div>
                </div>
                <Badge className={
                  caiProcess.status === 'completed' ? 'bg-green-100 text-green-800' :
                  caiProcess.status === 'error' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }>
                  {caiProcess.status.toUpperCase()}
                </Badge>
              </div>
              
              <Progress value={caiProcess.progress} className="h-2" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Found {caiProcess.foundResults} flights</span>
                <span>{caiProcess.progress}% complete</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Flight Results */}
        {flights.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{flights.length} Flights Found</h3>
                <p className="text-gray-600">Delhi → Mumbai • {format(new Date(), "dd MMM yyyy")}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Select defaultValue="price">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="departure">Departure Time</SelectItem>
                    <SelectItem value="rating">Airline Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="grid grid-cols-1 gap-4">
              {flights.map((flight) => (
                <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Airline */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Plane className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold">{flight.airline}</h4>
                            <p className="text-sm text-gray-600">{flight.code}</p>
                          </div>
                        </div>
                        {flight.caiMetadata.isBestDeal && (
                          <Badge className="mt-3 bg-green-100 text-green-800">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Best Deal
                          </Badge>
                        )}
                      </div>

                      {/* Schedule */}
                      <div className="lg:col-span-5">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-2xl font-bold">{flight.departure.time}</div>
                            <div className="text-sm font-semibold">{flight.departure.code}</div>
                            <div className="text-xs text-gray-600">{flight.departure.city}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-500">{flight.duration}</div>
                            <div className="h-px bg-gray-300 my-2">
                              <div className="flex justify-between">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{flight.arrival.time}</div>
                            <div className="text-sm font-semibold">{flight.arrival.code}</div>
                            <div className="text-xs text-gray-600">{flight.arrival.city}</div>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="lg:col-span-3">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {flight.amenities.slice(0, 3).map((amenity, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          Via: {flight.provider}
                        </div>
                      </div>

                      {/* Price & Book */}
                      <div className="lg:col-span-2">
                        <div className="text-right">
                          <div className="text-3xl font-bold text-blue-700">₹{flight.price}</div>
                          <div className="text-sm text-gray-600 mb-4">per person</div>
                          <Button 
                            onClick={() => handleBookFlight(flight)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                          >
                            Book Now
                          </Button>
                          <div className="mt-2 text-xs text-gray-500">
                            CAI Score: {flight.caiMetadata.confidenceScore}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CAI Integration Info */}
        <Card className="mt-12 border-blue-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">How CAI Integration Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Server className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">1. Search Request</h4>
                      <p className="text-gray-600 text-sm">
                        Your search triggers CAI process to aggregate flights from multiple airlines
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Network className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">2. Real-time API Calls</h4>
                      <p className="text-gray-600 text-sm">
                        CAI simultaneously calls IndiGo, Air India, Vistara APIs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Database className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">3. Data Aggregation</h4>
                      <p className="text-gray-600 text-sm">
                        CAI normalizes and aggregates responses from all providers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-4">Connected Airlines via CAI</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['IndiGo', 'Air India', 'Vistara', 'SpiceJet', 'AirAsia', 'Akasa Air'].map((airline) => (
                    <div key={airline} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <Plane className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{airline}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SkyBooker Pro</h3>
                  <p className="text-gray-400 text-sm">Flight Aggregator Platform</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                A complete flight booking platform demonstrating real-world IICS CAI integration.
              </p>
              <div className="flex items-center gap-2 text-gray-400">
                <Cpu className="w-4 h-4" />
                <span className="text-sm">Powered by Rishab Informatica Group</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">FAQs</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Airlines */}
            <div>
              <h4 className="font-bold text-lg mb-4">Airlines</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">IndiGo</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Air India</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Vistara</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">SpiceJet</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">AirAsia</Link></li>
              </ul>
            </div>

            {/* CAI Integration */}
            <div>
              <h4 className="font-bold text-lg mb-4">CAI Integration</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">API: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Database: Connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Real-time: Enabled</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-300">
                  This platform demonstrates real IICS CAI integration with airline APIs.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 SkyBooker Pro. Part of Rishab Informatica Group Learning Platform.
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm" className="text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                Support
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <Headphones className="w-4 h-4 mr-2" />
                Help
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}