// app/industry-connect/iics-cai-connect/page.tsx
'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  Home, Briefcase, Umbrella, Compass, Bed,
  TrendingDown, ChevronLeft, ChevronUp, Info,
  ShieldOff, Lock, Check, X, ExternalLink,
  ChevronDown, Globe2, Menu, Map,
  Building, Ticket, Luggage, Sunset,
  Thermometer, Wind, Cloud, Moon,
  ShieldAlert, AlertCircle, CreditCard as CardIcon,
  Edit2, Eye, EyeOff
} from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Custom Bus Icon Component
const BusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

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

interface Hotel {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  amenities: string[];
  provider: string;
  caiMetadata: {
    processId: string;
    isBestDeal: boolean;
    confidenceScore: number;
  };
}

interface Train {
  id: string;
  name: string;
  number: string;
  departure: { time: string; station: string; city: string; };
  arrival: { time: string; station: string; city: string; };
  duration: string;
  class: string;
  price: number;
  provider: string;
  caiMetadata: {
    processId: string;
    isBestDeal: boolean;
    confidenceScore: number;
  };
}

interface CAIProcess {
  id: string;
  status: 'searching' | 'aggregating' | 'completed' | 'error';
  progress: number;
  providers: string[];
  foundResults: number;
}

interface SearchParams {
  from: string;
  to: string;
  departureDate: Date;
  returnDate: Date;
  travelers: { adults: number; children: number; infants: number };
  cabinClass: string;
  tripType: string;
  checkIn?: Date;
  checkOut?: Date;
  rooms?: number;
  trainClass?: string;
  hotelLocation?: string;
  busFrom?: string;
  busTo?: string;
}

// Airport Data
const AIRPORTS = [
  { code: "DEL", name: "Delhi", city: "Delhi", airport: "Indira Gandhi International" },
  { code: "BOM", name: "Mumbai", city: "Mumbai", airport: "Chhatrapati Shivaji Maharaj" },
  { code: "BLR", name: "Bangalore", city: "Bangalore", airport: "Kempegowda International" },
  { code: "MAA", name: "Chennai", city: "Chennai", airport: "Chennai International" },
  { code: "HYD", name: "Hyderabad", city: "Hyderabad", airport: "Rajiv Gandhi International" },
  { code: "CCU", name: "Kolkata", city: "Kolkata", airport: "Netaji Subhash Chandra Bose" },
  { code: "GOI", name: "Goa", city: "Goa", airport: "Goa International" },
  { code: "JAI", name: "Jaipur", city: "Jaipur", airport: "Jaipur International" },
  { code: "AMD", name: "Ahmedabad", city: "Ahmedabad", airport: "Sardar Vallabhbhai Patel" },
  { code: "PNQ", name: "Pune", city: "Pune", airport: "Pune Airport" },
];

// Hotel Data
const HOTELS = [
  {
    id: "H-001",
    name: "Taj Mahal Palace",
    image: "/hotels/taj.jpg",
    location: "Mumbai, Colaba",
    rating: 4.8,
    price: 18500,
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "24/7 Room Service"],
    provider: "Taj Hotels API",
    caiMetadata: {
      processId: "CAI-H001",
      isBestDeal: true,
      confidenceScore: 92
    }
  },
  {
    id: "H-002",
    name: "The Oberoi",
    image: "/hotels/oberoi.jpg",
    location: "Delhi, Connaught Place",
    rating: 4.7,
    price: 16500,
    amenities: ["Free WiFi", "Gym", "Business Center", "Restaurant", "Bar"],
    provider: "Oberoi Hotels API",
    caiMetadata: {
      processId: "CAI-H002",
      isBestDeal: false,
      confidenceScore: 88
    }
  },
  {
    id: "H-003",
    name: "ITC Grand Chola",
    image: "/hotels/itc.jpg",
    location: "Chennai, Guindy",
    rating: 4.6,
    price: 12500,
    amenities: ["Free WiFi", "Swimming Pool", "Multiple Restaurants", "Spa", "Gym"],
    provider: "ITC Hotels API",
    caiMetadata: {
      processId: "CAI-H003",
      isBestDeal: false,
      confidenceScore: 85
    }
  }
];

// Train Data
const TRAINS = [
  {
    id: "T-001",
    name: "Rajdhani Express",
    number: "12951",
    departure: { time: "16:00", station: "NDLS", city: "Delhi" },
    arrival: { time: "08:30", station: "BCT", city: "Mumbai" },
    duration: "16h 30m",
    class: "AC First Class",
    price: 4250,
    provider: "IRCTC API",
    caiMetadata: {
      processId: "CAI-T001",
      isBestDeal: true,
      confidenceScore: 94
    }
  },
  {
    id: "T-002",
    name: "Duronto Express",
    number: "12213",
    departure: { time: "23:00", station: "NDLS", city: "Delhi" },
    arrival: { time: "15:30", station: "BCT", city: "Mumbai" },
    duration: "16h 30m",
    class: "AC 2 Tier",
    price: 2850,
    provider: "IRCTC API",
    caiMetadata: {
      processId: "CAI-T002",
      isBestDeal: false,
      confidenceScore: 89
    }
  },
  {
    id: "T-003",
    name: "Shatabdi Express",
    number: "12009",
    departure: { time: "07:00", station: "NDLS", city: "Delhi" },
    arrival: { time: "15:00", station: "JP", city: "Jaipur" },
    duration: "8h 00m",
    class: "AC Chair Car",
    price: 1850,
    provider: "IRCTC API",
    caiMetadata: {
      processId: "CAI-T003",
      isBestDeal: false,
      confidenceScore: 86
    }
  }
];

// Mock flights data
const MOCK_FLIGHTS: Flight[] = [
  {
    id: "FL-001",
    airline: "IndiGo",
    logo: "/airlines/indigo.png",
    code: "6E-202",
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
    code: "AI-865",
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
    code: "UK-995",
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

// Header Component
function Header({ activeNav, setActiveNav }: { 
  activeNav: string; 
  setActiveNav: (nav: string) => void;
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-b from-gray-900 to-gray-800 border-b border-gray-700 shadow-xl">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure SSL Booking • 100% Protected</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Best Price Guarantee</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="font-medium">INR ₹</span>
                <ChevronDown className="w-3 h-3" />
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Globe2 className="w-4 h-4" />
                <span>English</span>
                <ChevronDown className="w-3 h-3" />
              </div>
              <a href="tel:+911234567890" className="flex items-center gap-2 hover:underline">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">24/7 Support: +91 123 456 7890</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SkyBooker Pro</h1>
              <p className="text-xs text-gray-300 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-amber-400" />
                Powered by IICS CAI Integration
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
              { id: 'hotels', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
              { id: 'trains', label: 'Trains', icon: <Train className="w-4 h-4" /> },
              { id: 'buses', label: 'Buses', icon: <BusIcon className="w-4 h-4" /> },
              { id: 'cabs', label: 'Cabs', icon: <Car className="w-4 h-4" /> },
              { id: 'holidays', label: 'Holidays', icon: <Umbrella className="w-4 h-4" /> }
            ].map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeNav === item.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span className={`transition-transform ${activeNav === item.id ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
                {activeNav === item.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </Button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-700 text-gray-300 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
            
            <Button variant="outline" className="hidden sm:flex items-center gap-2 border-gray-600 hover:border-amber-500 hover:text-amber-400 text--300">
              <Headphones className="w-4 h-4" />
              <span>Support</span>
            </Button>
            
            <div className="relative">
              <Button 
                variant="default"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <User className="w-4 h-4" />
                <span>Login</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="font-semibold text-white">Welcome back!</p>
                    <p className="text-sm text-gray-400">Sign in to access your bookings</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center gap-3 transition-colors text-gray-300 hover:text-white">
                      <User className="w-4 h-4" />
                      <div>
                        <p className="font-medium">My Account</p>
                        <p className="text-xs text-gray-400">View profile & settings</p>
                      </div>
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center gap-3 transition-colors text-gray-300 hover:text-white">
                      <Briefcase className="w-4 h-4" />
                      <div>
                        <p className="font-medium">My Bookings</p>
                        <p className="text-xs text-gray-400">Manage trips & flights</p>
                      </div>
                    </button>
                    <Separator className="my-2 bg-gray-700" />
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center gap-3 transition-colors text-red-400">
                      <LogOut className="w-4 h-4" />
                      <div>
                        <p className="font-medium">Logout</p>
                        <p className="text-xs text-red-400">Sign out from account</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 animate-in slide-in-from-top">
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
                { id: 'hotels', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
                { id: 'trains', label: 'Trains', icon: <Train className="w-4 h-4" /> },
                { id: 'buses', label: 'Buses', icon: <BusIcon className="w-4 h-4" /> },
                { id: 'cabs', label: 'Cabs', icon: <Car className="w-4 h-4" /> },
                { id: 'holidays', label: 'Holidays', icon: <Umbrella className="w-4 h-4" /> }
              ].map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg ${
                    activeNav === item.id
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border border-amber-500'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Airport Selector Component
function AirportSelector({
  label,
  value,
  onChange,
  placeholder,
  type = "from"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "from" | "to";
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredAirports = useMemo(() => {
    if (!search.trim()) return AIRPORTS;
    return AIRPORTS.filter(airport =>
      airport.city.toLowerCase().includes(search.toLowerCase()) ||
      airport.code.toLowerCase().includes(search.toLowerCase()) ||
      airport.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const selectedAirport = useMemo(() => {
    return AIRPORTS.find(airport => airport.code === value);
  }, [value]);

  const handleSelect = (airportCode: string) => {
    onChange(airportCode);
    setOpen(false);
    setSearch("");
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="relative">
      <Label className="text-gray-700 mb-2 block font-semibold">{label}</Label>
      {!editMode ? (
        <div className="relative">
          <div 
            onClick={handleEditClick}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white hover:border-blue-400 cursor-pointer flex items-center gap-3 group"
          >
            <div className={`p-2 rounded-lg ${
              type === "from" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
            }`}>
              {type === "from" ? (
                <ChevronRight className="w-4 h-4 rotate-180" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
            <div className="text-left flex-1">
              {selectedAirport ? (
                <>
                  <div className="font-medium text-gray-900">{selectedAirport.city} ({selectedAirport.code})</div>
                  <div className="text-sm text-gray-600">{selectedAirport.airport}</div>
                </>
              ) : (
                <span className="text-gray-400">{placeholder}</span>
              )}
            </div>
            <Edit2 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  placeholder="Search city or airport..."
                  className="pl-10 border-2 border-blue-500 focus:border-blue-600 focus:ring-blue-500 h-12"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setOpen(true)}
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditMode(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] p-0 z-[100]" align="start">
            <div className="p-3 border-b bg-gray-50">
              <div className="text-sm font-medium text-gray-700">Select Airport</div>
              <div className="text-xs text-gray-500 mt-1">Type to search or select from list</div>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {filteredAirports.length > 0 ? (
                filteredAirports.map((airport) => (
                  <button
                    key={airport.code}
                    className="w-full p-3 text-left hover:bg-blue-50 border-b last:border-0 flex items-center gap-3 transition-colors"
                    onClick={() => handleSelect(airport.code)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      type === "from" ? "bg-blue-100" : "bg-purple-100"
                    }`}>
                      <Plane className={`w-5 h-5 ${
                        type === "from" ? "text-blue-600" : "text-purple-600"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {airport.city}
                        <Badge variant="outline" className="text-xs bg-gray-100">{airport.code}</Badge>
                      </div>
                      <div className="text-xs text-gray-600">{airport.airport}</div>
                    </div>
                    {value === airport.code && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <Map className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>No airports found for "{search}"</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

// Search Form Component
function SearchForm({ 
  onSearch, 
  loading,
  searchParams,
  setSearchParams,
  activeNav
}: {
  onSearch: () => void;
  loading: boolean;
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  activeNav: string;
}) {
  const [editFrom, setEditFrom] = useState(false);
  const [editTo, setEditTo] = useState(false);
  const [editHotel, setEditHotel] = useState(false);

  const handleSwap = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const handleInputChange = (field: keyof SearchParams, value: string | number | Date) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const renderFlightSearch = () => (
    <>
   <div className="md:col-span-2">
  <Label className="text-gray-700 mb-2 block font-semibold">Trip Type</Label>
  <Select 
    value={searchParams.tripType}
    onValueChange={(value) => handleInputChange('tripType', value)}
  >
    <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 bg-white text-gray-900">
      <SelectValue placeholder="Select trip type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="round" className="text-gray-900">Round Trip</SelectItem>
      <SelectItem value="one" className="text-gray-900">One Way</SelectItem>
      <SelectItem value="multi" className="text-gray-900">Multi City</SelectItem>
    </SelectContent>
  </Select>
</div>

      <div className="md:col-span-3">
        <AirportSelector
          label="From"
          value={searchParams.from}
          onChange={(value) => handleInputChange('from', value)}
          placeholder="Select departure airport"
          type="from"
        />
      </div>

<div className="md:col-span-1 flex items-end justify-center">
  <Button
    type="button"
    variant="outline"
    size="icon"
    className="rounded-full border-2 border-gray-300 text-gray-600 hover:border-blue-500 hover:bg-green-50 hover:text-blue-600 h-10 w-10"
    onClick={handleSwap}
  >
    <RefreshCw className="w-4 h-4" />
  </Button>
</div>

      <div className="md:col-span-3">
        <AirportSelector
          label="To"
          value={searchParams.to}
          onChange={(value) => handleInputChange('to', value)}
          placeholder="Select destination airport"
          type="to"
        />
      </div>

      <div className="md:col-span-2">
        <Label className="text-gray-700 mb-2 block font-semibold">Departure</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-start border-2 border-gray-300 hover:border-blue-500 h-12 bg-white text-gray-900 hover:text-gray-900"
            >
              <Calendar className="mr-2 h-4 w-4 text-gray-600" />
              <span className="text-gray-900">{format(searchParams.departureDate, "dd MMM, yyyy")}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent 
              mode="single"
              selected={searchParams.departureDate}
              onSelect={(date) => date && handleInputChange('departureDate', date)}
              initialFocus
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="md:col-span-2">
        <Label className="text-gray-700 mb-2 block font-semibold">Return</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-start border-2 border-gray-300 hover:border-blue-500 h-12 bg-white text-gray-900 hover:text-gray-900"
            >
              <Calendar className="mr-2 h-4 w-4 text-gray-600" />
              <span className="text-gray-900">{format(searchParams.returnDate, "dd MMM, yyyy")}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent 
              mode="single"
              selected={searchParams.returnDate}
              onSelect={(date) => date && handleInputChange('returnDate', date)}
              initialFocus
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );

  const renderHotelSearch = () => (
    <>
      <div className="md:col-span-6">
        <Label className="text-gray-700 mb-2 block font-semibold">Destination</Label>
        <div className="relative">
          <Input 
            placeholder="Enter city, hotel, or area"
            className="pl-10 border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-gray-900"
            value={searchParams.hotelLocation || ''}
            onChange={(e) => handleInputChange('hotelLocation', e.target.value)}
          />
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="md:col-span-3">
        <Label className="text-gray-700 mb-2 block font-semibold">Check-in</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-start border-2 border-gray-300 hover:border-blue-500 h-12 bg-white text-gray-900 hover:text-gray-900"
            >
              <Calendar className="mr-2 h-4 w-4 text-gray-600" />
              <span className="text-gray-900">{format(searchParams.checkIn || new Date(), "dd MMM")}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent 
              mode="single"
              selected={searchParams.checkIn}
              onSelect={(date) => date && handleInputChange('checkIn', date)}
              initialFocus
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="md:col-span-3">
        <Label className="text-gray-700 mb-2 block font-semibold">Check-out</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-start border-2 border-gray-300 hover:border-blue-500 h-12 bg-white text-gray-900 hover:text-gray-900"
            >
              <Calendar className="mr-2 h-4 w-4 text-gray-600" />
              <span className="text-gray-900">{format(searchParams.checkOut || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), "dd MMM")}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent 
              mode="single"
              selected={searchParams.checkOut}
              onSelect={(date) => date && handleInputChange('checkOut', date)}
              initialFocus
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );

  const renderTrainSearch = () => (
    <>
      <div className="md:col-span-3">
        <Label className="text-gray-700 mb-2 block font-semibold">From Station</Label>
        <div className="relative">
          <Input 
            placeholder="Enter departure station"
            className="pl-10 border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-gray-900"
            value={searchParams.from}
            onChange={(e) => handleInputChange('from', e.target.value)}
          />
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="md:col-span-1 flex items-end justify-center">
<Button
  type="button"
  variant="default"
  size="icon"
  className="rounded-full bg-blue-500 hover:bg-blue-600 text-white h-10 w-10"
  onClick={handleSwap}
>
  <RefreshCw className="w-4 h-4" />
</Button>
      </div>

      <div className="md:col-span-3">
        <Label className="text-gray-700 mb-2 block font-semibold">To Station</Label>
        <div className="relative">
          <Input 
            placeholder="Enter destination station"
            className="pl-10 border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-gray-900"
            value={searchParams.to}
            onChange={(e) => handleInputChange('to', e.target.value)}
          />
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="md:col-span-2">
        <Label className="text-gray-700 mb-2 block font-semibold">Journey Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-start border-2 border-gray-300 hover:border-blue-500 h-12 bg-white text-gray-900 hover:text-gray-900"
            >
              <Calendar className="mr-2 h-4 w-4 text-gray-600" />
              <span className="text-gray-900">{format(searchParams.departureDate, "dd MMM, yyyy")}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent 
              mode="single"
              selected={searchParams.departureDate}
              onSelect={(date) => date && handleInputChange('departureDate', date)}
              initialFocus
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="md:col-span-2">
        <Label className="text-gray-700 mb-2 block font-semibold">Class</Label>
        <Select 
          value={searchParams.trainClass || "all"}
          onValueChange={(value) => handleInputChange('trainClass', value)}
        >
          <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 bg-white text-gray-900">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-gray-700">All Classes</SelectItem>
            <SelectItem value="first" className="text-gray-700">AC First Class</SelectItem>
            <SelectItem value="second" className="text-gray-700">AC 2 Tier</SelectItem>
            <SelectItem value="third" className="text-gray-700">AC 3 Tier</SelectItem>
            <SelectItem value="sleeper" className="text-gray-700">Sleeper</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-2xl p-6 md:p-8 text-white shadow-xl mb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
              {activeNav === 'flights' ? 'Find Your Perfect Flight' : 
               activeNav === 'hotels' ? 'Discover Amazing Hotels' :
               activeNav === 'trains' ? 'Book Train Tickets' :
               'Book Your Travel'}
            </h2>
            <p className="text-blue-100 text-sm md:text-base">
              Powered by real-time IICS CAI integration with multiple providers
            </p>
          </div>
          <Badge className="bg-white/20 backdrop-blur-sm border-0 px-4 py-2 text-white">
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3" />
              <span>CAI Live Integration Active</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </Badge>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-2xl">
          {/* Search Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {activeNav === 'flights' && renderFlightSearch()}
            {activeNav === 'hotels' && renderHotelSearch()}
            {activeNav === 'trains' && renderTrainSearch()}
            
            {activeNav === 'buses' && (
              <>
                <div className="md:col-span-3">
                  <Label className="text-gray-700 mb-2 block font-semibold">From City</Label>
                  <div className="relative">
                    <Input 
                      placeholder="Enter departure city"
                      className="pl-10 border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-gray-900"
                      value={searchParams.busFrom || ''}
                      onChange={(e) => handleInputChange('busFrom', e.target.value)}
                    />
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  </div>
                </div>

                <div className="md:col-span-3">
                  <Label className="text-gray-700 mb-2 block font-semibold">To City</Label>
                  <div className="relative">
                    <Input 
                      placeholder="Enter destination city"
                      className="pl-10 border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 text-gray-900"
                      value={searchParams.busTo || ''}
                      onChange={(e) => handleInputChange('busTo', e.target.value)}
                    />
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label className="text-gray-700 mb-2 block font-semibold">Travel Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-2 border-gray-300 hover:border-blue-500 h-12 bg-white text-gray-900 hover:text-gray-900"
                      >
                        <Calendar className="mr-2 h-4 w-4 text-gray-600" />
                        <span className="text-gray-900">{format(searchParams.departureDate, "dd MMM")}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent 
                        mode="single"
                        selected={searchParams.departureDate}
                        onSelect={(date) => date && handleInputChange('departureDate', date)}
                        initialFocus
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="md:col-span-2">
                  <Label className="text-gray-700 mb-2 block font-semibold">Passengers</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-2 border-gray-300 hover:border-blue-500 h-12 bg-white text-gray-900 hover:text-gray-900"
                      >
                        <Users className="mr-2 h-4 w-4 text-gray-600" />
                        <span className="text-gray-900">{searchParams.travelers.adults} Passenger{searchParams.travelers.adults > 1 ? 's' : ''}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Adults</div>
                            <div className="text-sm text-gray-500">Age 12+</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-gray-300 hover:border-blue-500"
                              onClick={() => handleInputChange('travelers', { 
                                ...searchParams.travelers, 
                                adults: Math.max(1, searchParams.travelers.adults - 1) 
                              })}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="font-bold w-8 text-center text-gray-900">{searchParams.travelers.adults}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-gray-300 hover:border-blue-500"
                              onClick={() => handleInputChange('travelers', { 
                                ...searchParams.travelers, 
                                adults: searchParams.travelers.adults + 1 
                              })}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}

            {/* Travelers & Options */}
            <div className="md:col-span-2 flex items-end">
              <div className="w-full">
                <Label className="text-gray-700 mb-2 block font-semibold">Travelers</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-2 border-gray-300 hover:border-blue-500 h-12 bg-white text-gray-900 hover:text-gray-900"
                    >
                      <Users className="mr-2 h-4 w-4 text-gray-600" />
                      <span className="text-gray-900">
                        {searchParams.travelers.adults} Adult{searchParams.travelers.adults > 1 ? 's' : ''}
                        {searchParams.travelers.children > 0 && `, ${searchParams.travelers.children} Child`}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Adults</div>
                          <div className="text-sm text-gray-500">Age 12+</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 hover:border-blue-500"
                            onClick={() => handleInputChange('travelers', { 
                              ...searchParams.travelers, 
                              adults: Math.max(1, searchParams.travelers.adults - 1) 
                            })}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <span className="font-bold w-8 text-center text-gray-900">{searchParams.travelers.adults}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 hover:border-blue-500"
                            onClick={() => handleInputChange('travelers', { 
                              ...searchParams.travelers, 
                              adults: searchParams.travelers.adults + 1 
                            })}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Children</div>
                          <div className="text-sm text-gray-500">Age 2-12</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 hover:border-blue-500"
                            onClick={() => handleInputChange('travelers', { 
                              ...searchParams.travelers, 
                              children: Math.max(0, searchParams.travelers.children - 1) 
                            })}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <span className="font-bold w-8 text-center text-gray-900">{searchParams.travelers.children}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-300 hover:border-blue-500"
                            onClick={() => handleInputChange('travelers', { 
                              ...searchParams.travelers, 
                              children: searchParams.travelers.children + 1 
                            })}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Class (for flights) */}
            {activeNav === 'flights' && (
              <div className="md:col-span-2 flex items-end">
                <div className="w-full">
                  <Label className="text-gray-700 mb-2 block font-semibold">Class</Label>
                  <Select 
                    value={searchParams.cabinClass}
                    onValueChange={(value) => handleInputChange('cabinClass', value)}
                  >
                    <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-12 bg-white text-gray-900">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy" className="text-gray-700">Economy</SelectItem>
                      <SelectItem value="premium" className="text-gray-700">Premium Economy</SelectItem>
                      <SelectItem value="business" className="text-gray-700">Business</SelectItem>
                      <SelectItem value="first" className="text-gray-700">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Rooms (for hotels) */}
            {activeNav === 'hotels' && (
              <div className="md:col-span-2 flex items-end">
                <div className="w-full">
                  <Label className="text-gray-700 mb-2 block font-semibold">Rooms</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-2 border-gray-300 hover:border-blue-500 h-12 bg-white text-gray-900 hover:text-gray-900"
                      >
                        <Bed className="mr-2 h-4 w-4 text-gray-600" />
                        <span className="text-gray-900">{searchParams.rooms || 1} Room{searchParams.rooms && searchParams.rooms > 1 ? 's' : ''}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Rooms</div>
                            <div className="text-sm text-gray-500">Number of rooms</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-gray-300 hover:border-blue-500"
                              onClick={() => handleInputChange('rooms', Math.max(1, (searchParams.rooms || 1) - 1))}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="font-bold w-8 text-center text-gray-900">{searchParams.rooms || 1}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-gray-300 hover:border-blue-500"
                              onClick={() => handleInputChange('rooms', (searchParams.rooms || 1) + 1)}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            {/* Search Button */}
            <div className="md:col-span-2 flex items-end">
              <Button 
                onClick={onSearch} 
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 h-12 shadow-lg hover:shadow-xl transition-all duration-200 text-white font-bold"
                size="lg"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    {activeNav === 'flights' ? 'Search Flights' :
                     activeNav === 'hotels' ? 'Search Hotels' :
                     activeNav === 'trains' ? 'Search Trains' :
                     'Search'}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch 
                  className="data-[state=checked]:bg-blue-600"
                  id="direct-flights"
                />
                <Label htmlFor="direct-flights" className="text-gray-700 font-medium cursor-pointer">
                  Direct {activeNav === 'flights' ? 'flights' : 'routes'} only
                </Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch 
                  className="data-[state=checked]:bg-blue-600"
                  id="refundable"
                />
                <Label htmlFor="refundable" className="text-gray-700 font-medium cursor-pointer">
                  Refundable options
                </Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch 
                  className="data-[state=checked]:bg-blue-600"
                  id="filtered-results"
                />
                <Label htmlFor="filtered-results" className="text-gray-700 font-medium cursor-pointer">
                  Show best deals only
                </Label>
              </div>
              
              {activeNav === 'flights' && (
                <div className="flex items-center gap-2">
                  <Switch 
                    className="data-[state=checked]:bg-blue-600"
                    id="flexible-dates"
                  />
                  <Label htmlFor="flexible-dates" className="text-gray-700 font-medium cursor-pointer">
                    Flexible dates (±3 days)
                  </Label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// CAI Process Monitor Component
function CAIProcessMonitor({ caiProcess, activeNav }: { 
  caiProcess: CAIProcess | null;
  activeNav: string;
}) {
  if (!caiProcess) return null;

  const statusConfig = {
    searching: { color: 'bg-blue-500', text: 'Searching Providers' },
    aggregating: { color: 'bg-purple-500', text: 'Aggregating Results' },
    completed: { color: 'bg-green-500', text: 'Completed' },
    error: { color: 'bg-red-500', text: 'Error' }
  };

  const getSearchType = () => {
    switch (activeNav) {
      case 'flights': return 'flights';
      case 'hotels': return 'hotels';
      case 'trains': return 'trains';
      case 'buses': return 'bus routes';
      case 'cabs': return 'cab rides';
      default: return 'results';
    }
  };

  return (
    <Card className="mb-8 border-2 border-blue-200 shadow-lg">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-lg text-gray-900">CAI Process: {caiProcess.id}</h3>
                <Badge className={
                  caiProcess.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                  caiProcess.status === 'error' ? 'bg-red-100 text-red-800 border-red-200' :
                  'bg-blue-100 text-blue-800 border-blue-200'
                }>
                  {caiProcess.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm">
                Aggregating from {caiProcess.providers.length} {activeNav} providers in real-time
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{caiProcess.foundResults}</div>
              <div className="text-sm text-gray-600">{getSearchType().toUpperCase()} Found</div>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-blue-300 flex items-center justify-center bg-blue-50">
              <span className="font-bold text-blue-600">{caiProcess.progress}%</span>
            </div>
          </div>
        </div>
        
        <Progress 
          value={caiProcess.progress} 
          className="h-2 bg-gray-100"
          indicatorClassName={statusConfig[caiProcess.status].color}
        />
        
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusConfig[caiProcess.status].color}`}></div>
            <span>{statusConfig[caiProcess.status].text}</span>
          </div>
          <span className="font-medium">Connected to: {caiProcess.providers.slice(0, 3).join(', ')}...</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Flight Card Component
function FlightCard({ flight, onBook }: { flight: Flight; onBook: (flight: Flight) => void }) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-300 overflow-hidden group bg-white">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Airline & Deal */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plane className="w-7 h-7 text-blue-600" />
                </div>
                {flight.caiMetadata.isBestDeal && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-md">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Best Deal
                    </Badge>
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">{flight.airline}</h4>
                <p className="text-sm text-gray-600">{flight.code}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium text-gray-700">4.8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-gray-900">{flight.departure.time}</div>
                <div className="text-sm font-semibold text-gray-800">{flight.departure.code}</div>
                <div className="text-xs text-gray-600">{flight.departure.city}</div>
              </div>
              
              <div className="relative flex flex-col items-center">
                <div className="text-sm text-gray-600 mb-1">{flight.duration}</div>
                <div className="w-full h-px bg-gradient-to-r from-blue-300 to-purple-300 relative">
                  <div className="absolute left-0 w-3 h-3 bg-blue-500 rounded-full -translate-y-1.5"></div>
                  <div className="absolute right-0 w-3 h-3 bg-purple-500 rounded-full -translate-y-1.5"></div>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                  </Badge>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{flight.arrival.time}</div>
                <div className="text-sm font-semibold text-gray-800">{flight.arrival.code}</div>
                <div className="text-xs text-gray-600">{flight.arrival.city}</div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="lg:col-span-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {flight.amenities.slice(0, 3).map((amenity, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                >
                  {amenity}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Database className="w-3 h-3" />
                <span>Via: {flight.provider}</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              CAI Confidence: {flight.caiMetadata.confidenceScore}%
            </div>
          </div>

          {/* Price & Book */}
          <div className="lg:col-span-2">
            <div className="text-center lg:text-right">
              <div className="mb-2">
                <div className="text-3xl font-bold text-blue-700">₹{flight.price}</div>
                <div className="text-sm text-gray-600">per person</div>
              </div>
              <Button 
                onClick={() => onBook(flight)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl text-white"
                size="lg"
              >
                <Plane className="w-4 h-4 mr-2" />
                Book Now
              </Button>
              <div className="mt-3 text-xs text-gray-500">
                <div className="flex items-center justify-center lg:justify-end gap-2">
                  <ShieldCheck className="w-3 h-3 text-green-500" />
                  <span>Secure booking via CAI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Hotel Card Component
function HotelCard({ hotel, onBook }: { hotel: Hotel; onBook: (hotel: Hotel) => void }) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-amber-300 overflow-hidden group bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Hotel Image */}
          <div className="md:w-64">
            <div className="relative rounded-xl overflow-hidden h-48 border border-gray-200">
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <Building className="w-16 h-16 text-amber-500" />
              </div>
              {hotel.caiMetadata.isBestDeal && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-md">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Best Deal
                  </Badge>
                </div>
              )}
              <div className="absolute bottom-3 right-3">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm border border-gray-200">
                  <Star className="w-3 h-3 mr-1 text-yellow-500 fill-yellow-500" />
                  {hotel.rating}
                </Badge>
              </div>
            </div>
          </div>

          {/* Hotel Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{hotel.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200">
                    <ShieldCheck className="w-3 h-3 mr-1 text-blue-500" />
                    Verified Property
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-green-50 border-green-200">
                    <Wifi className="w-3 h-3 mr-1 text-green-500" />
                    Free WiFi
                  </Badge>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="mb-2">
                  <div className="text-3xl font-bold text-amber-600">₹{hotel.price}</div>
                  <div className="text-sm text-gray-600">per night</div>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  CAI Confidence: {hotel.caiMetadata.confidenceScore}%
                </div>
                <Button 
                  onClick={() => onBook(hotel)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                >
                  <Hotel className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((amenity, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm bg-gray-100 text-gray-700 border-gray-200">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Provider Info */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Database className="w-4 h-4" />
                  <span>Via: {hotel.provider}</span>
                </div>
                <Badge variant="outline" className="text-xs bg-gray-100 border-gray-200">
                  Process ID: {hotel.caiMetadata.processId}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Train Card Component
function TrainCard({ train, onBook }: { train: Train; onBook: (train: Train) => void }) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-green-300 overflow-hidden group bg-white">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Train Info */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Train className="w-7 h-7 text-green-600" />
                </div>
                {train.caiMetadata.isBestDeal && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-md">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Best Deal
                    </Badge>
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">{train.name}</h4>
                <p className="text-sm text-gray-600">#{train.number}</p>
                <div className="mt-1">
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">{train.class}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-gray-900">{train.departure.time}</div>
                <div className="text-sm font-semibold text-gray-800">{train.departure.station}</div>
                <div className="text-xs text-gray-600">{train.departure.city}</div>
              </div>
              
              <div className="relative flex flex-col items-center">
                <div className="text-sm text-gray-600 mb-1">{train.duration}</div>
                <div className="w-full h-px bg-gradient-to-r from-green-300 to-emerald-300 relative">
                  <div className="absolute left-0 w-3 h-3 bg-green-500 rounded-full -translate-y-1.5"></div>
                  <div className="absolute right-0 w-3 h-3 bg-emerald-500 rounded-full -translate-y-1.5"></div>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    <Clock className="w-3 h-3 mr-1" />
                    On Time
                  </Badge>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{train.arrival.time}</div>
                <div className="text-sm font-semibold text-gray-800">{train.arrival.station}</div>
                <div className="text-xs text-gray-600">{train.arrival.city}</div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="lg:col-span-2">
            <div className="space-y-2">
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Confirmed Tickets</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-500" />
                <span>Meal Service</span>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                CAI Confidence: {train.caiMetadata.confidenceScore}%
              </div>
            </div>
          </div>

          {/* Price & Book */}
          <div className="lg:col-span-2">
            <div className="text-center lg:text-right">
              <div className="mb-2">
                <div className="text-3xl font-bold text-green-700">₹{train.price}</div>
                <div className="text-sm text-gray-600">per person</div>
              </div>
              <Button 
                onClick={() => onBook(train)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl text-white"
                size="lg"
              >
                <Train className="w-4 h-4 mr-2" />
                Book Now
              </Button>
              <div className="mt-3 text-xs text-gray-500">
                <div className="flex items-center justify-center lg:justify-end gap-2">
                  <Database className="w-3 h-3" />
                  <span>Via: {train.provider}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">SkyBooker Pro</h3>
                <p className="text-gray-400 text-sm">Advanced Travel Aggregation</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              A cutting-edge travel booking platform demonstrating real-time IICS CAI integration with multiple provider APIs.
            </p>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-800 rounded-lg">
                <Cpu className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-sm text-gray-300">Powered by Rishab Informatica Group</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact Us', 'FAQs', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connected Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Connected Services</h4>
            <div className="grid grid-cols-2 gap-3">
              {['IndiGo', 'Air India', 'Vistara', 'SpiceJet', 'Taj Hotels', 'IRCTC'].map((service) => (
                <div 
                  key={service} 
                  className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-amber-500 transition-colors group"
                >
                  <div className="w-6 h-6 bg-amber-900/50 rounded flex items-center justify-center">
                    {service.includes('Hotel') ? (
                      <Hotel className="w-3 h-3 text-amber-400" />
                    ) : service === 'IRCTC' ? (
                      <Train className="w-3 h-3 text-amber-400" />
                    ) : (
                      <Plane className="w-3 h-3 text-amber-400" />
                    )}
                  </div>
                  <span className="text-sm font-medium group-hover:text-amber-300">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CAI Status */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">CAI Integration Status</h4>
            <div className="space-y-4">
              {[
                { label: 'API Connection', status: 'Active', color: 'bg-green-500' },
                { label: 'Real-time Sync', status: 'Live', color: 'bg-green-500' },
                { label: 'Data Processing', status: 'Optimal', color: 'bg-blue-500' }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${item.color} rounded-full animate-pulse`}></div>
                    <span className="text-gray-300">{item.label}</span>
                  </div>
                  <Badge variant="outline" className="border-gray-700 text-gray-300">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300">
                This platform demonstrates real-time IICS CAI integration with travel APIs for educational purposes.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 SkyBooker Pro. Part of Rishab Informatica Group Learning Platform.
          </div>
          <div className="flex gap-3">
            {[
              { icon: Phone, label: 'Support' },
              { icon: MessageSquare, label: 'Chat' },
              { icon: Headphones, label: 'Help' }
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-amber-400 hover:bg-gray-800"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function IICSCAILiveLab() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(false);
  const [caiProcess, setCaiProcess] = useState<CAIProcess | null>(null);
  const [activeNav, setActiveNav] = useState('flights');
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "DEL",
    to: "BOM",
    departureDate: new Date(),
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    travelers: { adults: 1, children: 0, infants: 0 },
    cabinClass: "economy",
    tripType: "round",
    rooms: 1,
    trainClass: "all",
    hotelLocation: "",
    busFrom: "",
    busTo: ""
  });

  const simulateCAIProcess = useCallback((type: string) => {
    const providers = {
      flights: ['IndiGo', 'Air India', 'Vistara', 'SpiceJet', 'AirAsia', 'Akasa Air'],
      hotels: ['Taj Hotels', 'Oberoi Hotels', 'ITC Hotels', 'Marriott', 'Hyatt', 'Accor'],
      trains: ['IRCTC', 'MakeMyTrip', 'Goibibo', 'Yatra', 'Cleartrip'],
      buses: ['RedBus', 'Abhibus', 'ZingBus', 'KPN Travels', 'SRS Travels'],
      cabs: ['Uber', 'Ola', 'Rapido', 'Meru', 'Quick Ride']
    };

    setCaiProcess({
      id: `CAI-${Date.now()}`,
      status: 'searching',
      progress: 0,
      providers: providers[type as keyof typeof providers] || providers.flights,
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
          clearInterval(interval);
          setLoading(false);
          
          switch (type) {
            case 'flights':
              foundResults = MOCK_FLIGHTS.length;
              setFlights(MOCK_FLIGHTS);
              toast.success('Successfully found flights via IICS CAI integration!', {
                description: `${MOCK_FLIGHTS.length} flights aggregated from ${prev.providers.length} providers`
              });
              break;
            case 'hotels':
              foundResults = HOTELS.length;
              setHotels(HOTELS);
              toast.success('Successfully found hotels via IICS CAI integration!', {
                description: `${HOTELS.length} hotels aggregated from ${prev.providers.length} providers`
              });
              break;
            case 'trains':
              foundResults = TRAINS.length;
              setTrains(TRAINS);
              toast.success('Successfully found trains via IICS CAI integration!', {
                description: `${TRAINS.length} trains aggregated from ${prev.providers.length} providers`
              });
              break;
            default:
              foundResults = 3;
          }
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

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (!searchParams.from && activeNav === 'flights') {
      toast.error('Please select departure airport');
      return;
    }
    if (!searchParams.to && activeNav === 'flights') {
      toast.error('Please select destination airport');
      return;
    }
    
    setLoading(true);
    setFlights([]);
    setHotels([]);
    setTrains([]);
    setCaiProcess(null);
    simulateCAIProcess(activeNav);
  };

  const handleBookFlight = (flight: Flight) => {
    toast.success(`Initiating booking for ${flight.airline} ${flight.code}`, {
      description: "Connecting to airline provider API through IICS CAI",
      action: {
        label: "View Details",
        onClick: () => {
          console.log("Open booking details for", flight.id);
        }
      }
    });
  };

  const handleBookHotel = (hotel: Hotel) => {
    toast.success(`Initiating booking for ${hotel.name}`, {
      description: "Connecting to hotel provider API through IICS CAI",
      action: {
        label: "View Details",
        onClick: () => {
          console.log("Open booking details for", hotel.id);
        }
      }
    });
  };

  const handleBookTrain = (train: Train) => {
    toast.success(`Initiating booking for ${train.name} #${train.number}`, {
      description: "Connecting to railway provider API through IICS CAI",
      action: {
        label: "View Details",
        onClick: () => {
          console.log("Open booking details for", train.id);
        }
      }
    });
  };

  const renderResults = () => {
    switch (activeNav) {
      case 'flights':
        return flights.length > 0 ? (
          <div className="space-y-4">
            {flights.map((flight) => (
              <FlightCard 
                key={flight.id} 
                flight={flight} 
                onBook={handleBookFlight}
              />
            ))}
          </div>
        ) : null;
      
      case 'hotels':
        return hotels.length > 0 ? (
          <div className="space-y-4">
            {hotels.map((hotel) => (
              <HotelCard 
                key={hotel.id} 
                hotel={hotel} 
                onBook={handleBookHotel}
              />
            ))}
          </div>
        ) : null;
      
      case 'trains':
        return trains.length > 0 ? (
          <div className="space-y-4">
            {trains.map((train) => (
              <TrainCard 
                key={train.id} 
                train={train} 
                onBook={handleBookTrain}
              />
            ))}
          </div>
        ) : null;
      
      default:
        return null;
    }
  };

  const getResultsCount = () => {
    switch (activeNav) {
      case 'flights': return flights.length;
      case 'hotels': return hotels.length;
      case 'trains': return trains.length;
      default: return 0;
    }
  };

  const getResultsTitle = () => {
    switch (activeNav) {
      case 'flights': return `${flights.length} Flights Found`;
      case 'hotels': return `${hotels.length} Hotels Found`;
      case 'trains': return `${trains.length} Trains Found`;
      default: return 'Results Found';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header activeNav={activeNav} setActiveNav={setActiveNav} />
      
      <main className="container mx-auto px-4 py-8">
        <SearchForm 
          onSearch={handleSearch}
          loading={loading}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          activeNav={activeNav}
        />

        <CAIProcessMonitor caiProcess={caiProcess} activeNav={activeNav} />

        {/* Results Section */}
        {(flights.length > 0 || hotels.length > 0 || trains.length > 0) && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{getResultsTitle()}</h3>
                <p className="text-gray-600 mt-1">
                  {activeNav === 'flights' && `${searchParams.from} → ${searchParams.to} • ${format(searchParams.departureDate, "dd MMMM yyyy")}`}
                  {activeNav === 'hotels' && `${searchParams.hotelLocation || 'Mumbai'} • ${format(searchParams.checkIn || new Date(), "dd MMM")} - ${format(searchParams.checkOut || new Date(), "dd MMM")}`}
                  {activeNav === 'trains' && `${searchParams.from} → ${searchParams.to} • ${format(searchParams.departureDate, "dd MMMM yyyy")}`}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="gap-2 border-2 border-gray-300 hover:border-blue-500 text-gray-700">
                  <Filter className="w-4 h-4" />
                  Filters
                  <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700">3</Badge>
                </Button>
                <Select defaultValue="price">
                  <SelectTrigger className="w-[180px] border-2 border-gray-300 focus:border-blue-500 text-gray-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price" className="text-gray-700">Price: Low to High</SelectItem>
                    <SelectItem value="rating" className="text-gray-700">Rating</SelectItem>
                    <SelectItem value="popularity" className="text-gray-700">Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {renderResults()}

            {/* CAI Integration Info */}
            <Card className="mt-12 border-2 border-blue-200 bg-white">
              <CardContent className="pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">How IICS CAI Integration Works</h3>
                    <div className="space-y-6">
                      {[
                        {
                          step: "1",
                          title: "Search Request Initiation",
                          description: "Your search triggers the CAI process to simultaneously contact multiple provider APIs",
                          icon: Server,
                          color: "from-blue-500 to-blue-600"
                        },
                        {
                          step: "2",
                          title: "Real-time API Aggregation",
                          description: "CAI processes responses from all connected providers in real-time",
                          icon: Network,
                          color: "from-purple-500 to-purple-600"
                        },
                        {
                          step: "3",
                          title: "Data Normalization & Processing",
                          description: "Data from different providers is normalized and processed for consistency",
                          icon: Database,
                          color: "from-green-500 to-green-600"
                        }
                      ].map((item) => (
                        <div key={item.step} className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-md`}>
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-1 text-gray-900">{item.title}</h4>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
                    <h4 className="font-bold text-xl mb-6 text-gray-900">Real-time CAI Metrics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Zap className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Response Time</p>
                            <p className="text-sm text-gray-500">Average API response</p>
                          </div>
                        </div>
                        <span className="font-bold text-lg text-gray-900">1.2s</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Cpu className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Success Rate</p>
                            <p className="text-sm text-gray-500">API calls successful</p>
                          </div>
                        </div>
                        <span className="font-bold text-lg text-gray-900">99.8%</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Data Accuracy</p>
                            <p className="text-sm text-gray-500">Information accuracy</p>
                          </div>
                        </div>
                        <span className="font-bold text-lg text-gray-900">98.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Results State */}
        {!loading && getResultsCount() === 0 && !caiProcess && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              {activeNav === 'flights' && <Plane className="w-12 h-12 text-blue-500" />}
              {activeNav === 'hotels' && <Hotel className="w-12 h-12 text-amber-500" />}
              {activeNav === 'trains' && <Train className="w-12 h-12 text-green-500" />}
              {activeNav === 'buses' && <BusIcon className="w-12 h-12 text-green-500" />}
              {activeNav === 'cabs' && <Car className="w-12 h-12 text-purple-500" />}
              {activeNav === 'holidays' && <Umbrella className="w-12 h-12 text-teal-500" />}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Find Your {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}?
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Use the search form above to find {activeNav} using our IICS CAI integration that aggregates results from multiple providers in real-time.
            </p>
            <Button 
              onClick={handleSearch} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              size="lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Search {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)} with CAI
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}