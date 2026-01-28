// app/industry-connect/flight-provider/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plane, Calendar, Clock, Users, Shield, CheckCircle,
  Ticket, Luggage, Wifi, Utensils, Tv, CreditCard,
  MapPin, ArrowRight, BarChart, Globe, Server, Cpu,
  Database, Key, Lock, Zap, RefreshCw, Search, Filter,
  Download, Settings, Activity, Code, Network, Eye,
  EyeOff, Copy, Check, AlertCircle, Bell, User,
  LogOut, Home, Briefcase, Wallet, Headphones,
  Phone, MessageSquare, ChevronDown, ChevronUp,
  ExternalLink, ShieldCheck, Award, Tag, BarChart3,
  Cpu as CpuIcon, Database as DatabaseIcon, Terminal,
  FileText, Code2, GitBranch, Cloud, Shield as ShieldIcon,
  Mail, Smartphone, Monitor, Globe2, Users as UsersIcon,
  Plus, Edit, Trash2, X, ShoppingCart,
  CreditCard as CardIcon, BookOpen, FileCheck,
  UserPlus, Smartphone as Mobile, Mail as EmailIcon,
  Map, Navigation, Percent, Award as AwardIcon
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Types
interface Flight {
  id: string;
  flightNumber: string;
  airlineCode: string;
  departure: {
    airport: string;
    city: string;
    code: string;
    terminal: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    code: string;
    terminal: string;
    time: string;
    date: string;
  };
  duration: string;
  aircraft: string;
  availableSeats: number;
  fares: {
    economy: number;
    premiumEconomy: number;
    business: number;
    first: number;
  };
  amenities: string[];
  status: 'scheduled' | 'boarding' | 'departed' | 'delayed' | 'cancelled';
}

interface APIRequest {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  status: number;
  duration: number;
  source: string;
  payload?: any;
}

interface CAIConfig {
  baseUrl: string;
  apiKey: string;
  endpoints: {
    search: string;
    availability: string;
    book: string;
    cancel: string;
  };
  webhooks: {
    bookingConfirm: string;
    bookingCancel: string;
    paymentSuccess: string;
  };
}

interface Booking {
  id: string;
  flightId: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  seats: number;
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentMethod: string;
}

export default function FlightServiceProviderPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiRequests, setApiRequests] = useState<APIRequest[]>([]);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [selectedFlightForBooking, setSelectedFlightForBooking] = useState<Flight | null>(null);
  const [bookingForm, setBookingForm] = useState({
    passengerName: '',
    passengerEmail: '',
    passengerPhone: '',
    seats: 1,
    class: 'economy',
    paymentMethod: 'credit_card'
  });
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [caiConfig, setCaiConfig] = useState<CAIConfig>({
    baseUrl: typeof window !== 'undefined' ? `${window.location.origin}/api/airline` : '',
    apiKey: 'indigo_api_' + Math.random().toString(36).substr(2, 16),
    endpoints: {
      search: '/flights/search',
      availability: '/flights/availability',
      book: '/bookings/create',
      cancel: '/bookings/cancel'
    },
    webhooks: {
      bookingConfirm: '/webhooks/booking-confirm',
      bookingCancel: '/webhooks/booking-cancel',
      paymentSuccess: '/webhooks/payment-success'
    }
  });

  // Mock flights
  const mockFlights: Flight[] = [
    {
      id: 'IG20241225001',
      flightNumber: '6E 205',
      airlineCode: '6E',
      departure: {
        airport: 'Indira Gandhi International Airport',
        city: 'Delhi',
        code: 'DEL',
        terminal: 'T3',
        time: '06:00',
        date: '2024-12-25'
      },
      arrival: {
        airport: 'Chhatrapati Shivaji Maharaj International Airport',
        city: 'Mumbai',
        code: 'BOM',
        terminal: 'T2',
        time: '08:15',
        date: '2024-12-25'
      },
      duration: '2h 15m',
      aircraft: 'Airbus A320neo',
      availableSeats: 45,
      fares: {
        economy: 4250,
        premiumEconomy: 6500,
        business: 12500,
        first: 18500
      },
      amenities: ['Free Meal', '20kg Baggage', 'WiFi', 'Entertainment'],
      status: 'scheduled'
    },
    {
      id: 'IG20241225002',
      flightNumber: '6E 207',
      airlineCode: '6E',
      departure: {
        airport: 'Indira Gandhi International Airport',
        city: 'Delhi',
        code: 'DEL',
        terminal: 'T3',
        time: '14:30',
        date: '2024-12-25'
      },
      arrival: {
        airport: 'Chhatrapati Shivaji Maharaj International Airport',
        city: 'Mumbai',
        code: 'BOM',
        terminal: 'T2',
        time: '16:45',
        date: '2024-12-25'
      },
      duration: '2h 15m',
      aircraft: 'Airbus A321neo',
      availableSeats: 32,
      fares: {
        economy: 4800,
        premiumEconomy: 7200,
        business: 13500,
        first: 19500
      },
      amenities: ['Business Lounge', '30kg Baggage', 'Priority Boarding', 'WiFi'],
      status: 'scheduled'
    }
  ];

  // Mock bookings
  const mockBookings: Booking[] = [
    {
      id: 'BK001',
      flightId: 'IG20241225001',
      passengerName: 'Rajesh Kumar',
      passengerEmail: 'rajesh@example.com',
      passengerPhone: '+91 9876543210',
      seats: 2,
      totalAmount: 8500,
      bookingDate: '2024-12-20T10:30:00Z',
      status: 'confirmed',
      paymentMethod: 'credit_card'
    },
    {
      id: 'BK002',
      flightId: 'IG20241225002',
      passengerName: 'Priya Sharma',
      passengerEmail: 'priya@example.com',
      passengerPhone: '+91 8765432109',
      seats: 1,
      totalAmount: 4800,
      bookingDate: '2024-12-20T14:45:00Z',
      status: 'confirmed',
      paymentMethod: 'upi'
    }
  ];

  // Fetch flights
  const fetchFlights = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setFlights(mockFlights);
    setBookings(mockBookings);
    setLoading(false);
    
    // Log API request
    const request: APIRequest = {
      id: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
      endpoint: '/api/flights/search',
      method: 'GET',
      status: 200,
      duration: 800,
      source: 'CAI_INTEGRATION'
    };
    setApiRequests(prev => [request, ...prev.slice(0, 9)]);
  };

  // Copy API key
  const copyApiKey = () => {
    navigator.clipboard.writeText(caiConfig.apiKey);
    setCopied(true);
    toast.success('API Key copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate new API key
  const generateNewApiKey = () => {
    const newKey = 'indigo_api_' + Math.random().toString(36).substr(2, 16);
    setCaiConfig(prev => ({ ...prev, apiKey: newKey }));
    toast.success('New API Key generated');
  };

  // Handle flight booking
  const handleBookFlight = (flight: Flight) => {
    setSelectedFlightForBooking(flight);
    setBookingForm({
      passengerName: '',
      passengerEmail: '',
      passengerPhone: '',
      seats: 1,
      class: 'economy',
      paymentMethod: 'credit_card'
    });
    setBookingDialogOpen(true);
  };

  // Submit booking
  const submitBooking = () => {
    if (!selectedFlightForBooking) return;

    const newBooking: Booking = {
      id: `BK${Date.now()}`,
      flightId: selectedFlightForBooking.id,
      passengerName: bookingForm.passengerName,
      passengerEmail: bookingForm.passengerEmail,
      passengerPhone: bookingForm.passengerPhone,
      seats: bookingForm.seats,
      totalAmount: bookingForm.seats * selectedFlightForBooking.fares[bookingForm.class as keyof typeof selectedFlightForBooking.fares],
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      paymentMethod: bookingForm.paymentMethod
    };

    setBookings(prev => [newBooking, ...prev]);
    
    // Log API request
    const request: APIRequest = {
      id: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
      endpoint: caiConfig.endpoints.book,
      method: 'POST',
      status: 201,
      duration: 1200,
      source: 'CAI_BOOKING',
      payload: newBooking
    };
    setApiRequests(prev => [request, ...prev.slice(0, 9)]);

    toast.success('Booking Successful!', {
      description: `Booking ID: ${newBooking.id} | Seats: ${newBooking.seats}`
    });

    setBookingDialogOpen(false);
    setSelectedFlightForBooking(null);
  };

  // Cancel booking
  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    ));

    // Log API request
    const request: APIRequest = {
      id: `req_${Date.now()}`,
      timestamp: new Date().toISOString(),
      endpoint: caiConfig.endpoints.cancel,
      method: 'POST',
      status: 200,
      duration: 800,
      source: 'CAI_CANCELLATION',
      payload: { bookingId }
    };
    setApiRequests(prev => [request, ...prev.slice(0, 9)]);

    toast.info('Booking Cancelled', {
      description: 'Booking has been successfully cancelled'
    });
  };

  // Initialize
  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    {/* ==================== NEW EXCELLENT HEADER DESIGN ==================== */}
<header className="sticky top-0 z-40 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border-b border-blue-800/30 shadow-2xl">
  {/* Top Status Ribbon */}
  <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600">
    <div className="container mx-auto px-4 py-1.5">
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="font-medium">LIVE</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Server className="w-3 h-3" />
            <span>API: <span className="font-bold">ACTIVE</span></span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-3 h-3" />
            <span>DB: <span className="font-bold">CONNECTED</span></span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-1 sm:mt-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>CAI INTEGRATION: <span className="font-bold">ONLINE</span></span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            <span>TLS 1.3</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Main Header */}
  <div className="container mx-auto px-4 py-3">
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
      {/* Logo & Brand */}
      <div className="flex items-center justify-between w-full lg:w-auto">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-xl flex items-center justify-center shadow-xl ring-2 ring-blue-400/30 group-hover:ring-blue-400/50 transition-all duration-300">
              <Plane className="w-7 h-7 text-white transform group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg">
              <Check className="w-3 h-3 text-white" />
            </div>
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-slate-950 animate-ping opacity-75"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                IndiGo Airlines
              </h1>
              <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 border-0 text-xs px-2 py-0.5 shadow-md">
                <CpuIcon className="w-3 h-3 mr-1" />
                API v2.1
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-cyan-300 font-medium">Flight Service Provider Platform</p>
              <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
              <p className="text-xs text-blue-300">
                <span className="text-amber-300">Rishab</span> Informatica Group
              </p>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-white hover:bg-white/10 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>

      {/* Main Navigation - Glass Morphism */}
      <nav className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 px-1 py-1 shadow-lg">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'from-blue-500 to-cyan-500' },
          { id: 'flights', label: 'Flights', icon: Plane, color: 'from-emerald-500 to-green-500' },
          { id: 'bookings', label: 'Bookings', icon: Ticket, color: 'from-purple-500 to-pink-500' },
          { id: 'api-config', label: 'API Config', icon: Settings, color: 'from-amber-500 to-orange-500' },
          { id: 'monitor', label: 'Monitor', icon: Activity, color: 'from-rose-500 to-red-500' },
          { id: 'documentation', label: 'Docs', icon: FileText, color: 'from-indigo-500 to-blue-500' }
        ].map(({ id, label, icon: Icon, color }) => (
          <button 
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${
              activeTab === id 
                ? `bg-gradient-to-r ${color} text-white shadow-lg transform -translate-y-0.5` 
                : 'text-blue-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-semibold">{label}</span>
            {activeTab === id && (
              <div className="ml-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </nav>

      {/* User Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/10 rounded-full relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-slate-950 animate-pulse"></span>
          </Button>
          <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-blue-700/50 rounded-xl shadow-2xl p-3 invisible group-hover:visible transition-all">
            <div className="text-xs text-cyan-300 mb-2">New API Requests (3)</div>
            {/* Notification items would go here */}
          </div>
        </div>

        {/* Quick Actions */}
        <Button 
          variant="outline" 
          size="sm"
          className="hidden sm:flex items-center gap-2 border-blue-500/50 text-cyan-200 hover:bg-blue-800/30 hover:border-blue-400"
        >
          <Headphones className="w-4 h-4" />
          <span className="font-medium">Support</span>
        </Button>

        {/* User Profile */}
        <div className="relative group">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 pl-1 pr-3 hover:bg-white/10 rounded-full"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
            </div>
            <div className="text-left hidden lg:block">
              <div className="text-sm font-semibold text-white">Admin User</div>
              <div className="text-xs text-cyan-300">Super Admin</div>
            </div>
            <ChevronDown className="w-4 h-4 text-blue-300" />
          </Button>
          
          {/* User Dropdown - Glass Morphism */}
          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-blue-700/50 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-blue-800/50">
                <div className="font-bold text-white">API Administrator</div>
                <div className="text-sm text-cyan-300 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  admin@indigoairlines.com
                </div>
              </div>
              
              <div className="py-2">
                <button className="w-full px-4 py-3 hover:bg-white/5 flex items-center gap-3 transition-colors group">
                  <div className="p-2 bg-blue-900/50 rounded-lg group-hover:bg-blue-700/50">
                    <User className="w-4 h-4 text-blue-300" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Profile & Account</div>
                    <div className="text-xs text-blue-300">Personal settings</div>
                  </div>
                </button>
                
                <button className="w-full px-4 py-3 hover:bg-white/5 flex items-center gap-3 transition-colors group">
                  <div className="p-2 bg-emerald-900/50 rounded-lg group-hover:bg-emerald-700/50">
                    <ShieldIcon className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Security Center</div>
                    <div className="text-xs text-emerald-300">API keys & permissions</div>
                  </div>
                </button>
                
                <button className="w-full px-4 py-3 hover:bg-white/5 flex items-center gap-3 transition-colors group">
                  <div className="p-2 bg-purple-900/50 rounded-lg group-hover:bg-purple-700/50">
                    <Settings className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <div className="font-medium text-white">API Settings</div>
                    <div className="text-xs text-purple-300">Configure endpoints</div>
                  </div>
                </button>
              </div>
              
              <Separator className="my-2 bg-blue-800/50" />
              
              <button className="w-full px-4 py-3 hover:bg-red-900/20 flex items-center gap-3 transition-colors text-red-400 group">
                <div className="p-2 bg-red-900/50 rounded-lg group-hover:bg-red-700/50">
                  <LogOut className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium">Sign Out</div>
                  <div className="text-xs text-red-300">Secure logout</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Mobile Navigation */}
    <div className="lg:hidden mt-4">
      <div className="grid grid-cols-3 gap-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
          { id: 'flights', label: 'Flights', icon: Plane, color: 'bg-gradient-to-r from-emerald-500 to-green-500' },
          { id: 'bookings', label: 'Bookings', icon: Ticket, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
          { id: 'api-config', label: 'API Config', icon: Settings, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
          { id: 'monitor', label: 'Monitor', icon: Activity, color: 'bg-gradient-to-r from-rose-500 to-red-500' },
          { id: 'documentation', label: 'Docs', icon: FileText, color: 'bg-gradient-to-r from-indigo-500 to-blue-500' }
        ].map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
              activeTab === id
                ? `${color} text-white shadow-lg border border-white/20`
                : 'bg-slate-800/50 text-blue-100 hover:bg-slate-700 border border-transparent'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
</header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-blue-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-700">{flights.length}</div>
                  <div className="text-sm text-gray-600">Active Flights</div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-700">
                    {flights.reduce((sum, flight) => sum + flight.availableSeats, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Available Seats</div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <UsersIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-700">{bookings.length}</div>
                  <div className="text-sm text-gray-600">Total Bookings</div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Ticket className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-700">99.8%</div>
                  <div className="text-sm text-gray-600">API Uptime</div>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-6">CAI Integration Status</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded">
                          <Cpu className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold">CAI Connection</div>
                          <div className="text-sm text-gray-600">Connected to aggregators</div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Connected Aggregators</span>
                        <span className="font-semibold">4</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['MakeMyTrip', 'Goibibo', 'EaseMyTrip', 'Yatra'].map((agg) => (
                          <Badge key={agg} variant="outline" className="border-blue-200">
                            {agg}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">API Endpoints</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <code className="text-sm">POST {caiConfig.endpoints.search}</code>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <code className="text-sm">POST {caiConfig.endpoints.book}</code>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-6">Recent API Activity</h3>
                  <ScrollArea className="h-72">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Endpoint</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {apiRequests.slice(0, 8).map((req) => (
                          <TableRow key={req.id}>
                            <TableCell className="font-mono text-xs">
                              {format(new Date(req.timestamp), 'HH:mm:ss')}
                            </TableCell>
                            <TableCell>
                              <code className="text-xs">{req.endpoint}</code>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {req.source}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={
                                req.status === 200 ? 'bg-green-100 text-green-800' :
                                req.status >= 400 ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }>
                                {req.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                        {apiRequests.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                              No API requests yet
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Flights Tab with Booking Option */}
          <TabsContent value="flights" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Flight Inventory Management</h3>
                    <p className="text-gray-600">Manage flights and process bookings</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" onClick={fetchFlights} disabled={loading}>
                      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Flight
                    </Button>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-4" />
                      <p className="text-gray-600">Loading flight data...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {flights.map((flight) => (
                      <Card key={flight.id} className="border hover:shadow-md transition-all">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Flight Info */}
                            <div className="lg:col-span-3">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg flex items-center justify-center">
                                  <Plane className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-lg">{flight.flightNumber}</h4>
                                  <p className="text-sm text-gray-600">{flight.airlineCode}</p>
                                  <Badge className={
                                    flight.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                                    flight.status === 'boarding' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }>
                                    {flight.status.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* Schedule */}
                            <div className="lg:col-span-5">
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <div className="text-xl font-bold">{flight.departure.time}</div>
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
                                  <div className="text-xs text-gray-500">Non-stop</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold">{flight.arrival.time}</div>
                                  <div className="text-sm font-semibold">{flight.arrival.code}</div>
                                  <div className="text-xs text-gray-600">{flight.arrival.city}</div>
                                </div>
                              </div>
                              <div className="mt-3 text-sm text-gray-600">
                                {flight.aircraft} • {flight.availableSeats} seats available
                              </div>
                            </div>

                            {/* Fares */}
                            <div className="lg:col-span-2">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Economy:</span>
                                  <span className="font-bold">₹{flight.fares.economy}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Business:</span>
                                  <span className="font-bold">₹{flight.fares.business}</span>
                                </div>
                              </div>
                            </div>

                            {/* Actions - INCLUDING BOOK BUTTON */}
                            <div className="lg:col-span-2">
                              <div className="flex flex-col gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleBookFlight(flight)}
                                >
                                  <Ticket className="w-4 h-4 mr-2" />
                                  Book Flight
                                </Button>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="flex-1">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="destructive" className="flex-1">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex flex-wrap gap-2">
                              {flight.amenities.map((amenity, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Flight Bookings</h3>
                    <p className="text-gray-600">View and manage all flight bookings</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Bookings</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Passenger</TableHead>
                      <TableHead>Flight</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => {
                      const flight = flights.find(f => f.id === booking.flightId);
                      return (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{booking.passengerName}</div>
                              <div className="text-sm text-gray-500">{booking.passengerEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {flight ? (
                              <div>
                                <div className="font-medium">{flight.flightNumber}</div>
                                <div className="text-sm text-gray-500">{flight.departure.code} → {flight.arrival.code}</div>
                              </div>
                            ) : 'N/A'}
                          </TableCell>
                          <TableCell className="font-bold">₹{booking.totalAmount}</TableCell>
                          <TableCell>
                            <Badge className={
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {booking.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(booking.bookingDate), 'dd MMM yyyy')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {booking.status === 'confirmed' && (
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => cancelBooking(booking.id)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Configuration Tab */}
          <TabsContent value="api-config" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-6">CAI Integration Configuration</h3>
                
                <div className="space-y-6">
                  {/* API Key Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-lg font-semibold">API Key</Label>
                        <p className="text-sm text-gray-600">
                          Use this key in CAI connector configuration
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff className="w-4 h-4 mr-2" />
                          ) : (
                            <Eye className="w-4 h-4 mr-2" />
                          )}
                          {showApiKey ? 'Hide' : 'Show'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyApiKey}
                          className={copied ? 'bg-green-50 border-green-200' : ''}
                        >
                          {copied ? (
                            <Check className="w-4 h-4 mr-2" />
                          ) : (
                            <Copy className="w-4 h-4 mr-2" />
                          )}
                          {copied ? 'Copied' : 'Copy'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={generateNewApiKey}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-900 rounded-lg">
                      <code className="text-sm text-green-400 font-mono break-all">
                        {showApiKey ? caiConfig.apiKey : '••••••••••••••••••••••••••••••'}
                      </code>
                    </div>
                  </div>

                  <Separator />

                  {/* CAI Connector Configuration */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">CAI Connector Configuration</Label>
                    <Textarea
                      value={JSON.stringify({
                        connector: {
                          name: "IndiGoAirlines",
                          type: "REST",
                          configuration: {
                            baseUrl: caiConfig.baseUrl,
                            authentication: {
                              type: "API_KEY",
                              key: caiConfig.apiKey
                            },
                            endpoints: caiConfig.endpoints,
                            timeout: 30000,
                            retryPolicy: {
                              maxAttempts: 3,
                              backoffMultiplier: 2
                            }
                          }
                        }
                      }, null, 2)}
                      rows={12}
                      className="font-mono text-sm"
                      readOnly
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify({
                          connector: {
                            name: "IndiGoAirlines",
                            type: "REST",
                            configuration: {
                              baseUrl: caiConfig.baseUrl,
                              authentication: {
                                type: "API_KEY",
                                key: caiConfig.apiKey
                              },
                              endpoints: caiConfig.endpoints,
                              timeout: 30000,
                              retryPolicy: {
                                maxAttempts: 3,
                                backoffMultiplier: 2
                              }
                            }
                          }
                        }, null, 2));
                        toast.success('CAI configuration copied');
                      }}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy CAI Configuration
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">IndiGo Airlines API</h3>
                  <p className="text-blue-300 text-sm">Flight Service Provider</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Official airline API platform for flight booking integration.
                Part of Rishab Informatica Group Learning Platform.
              </p>
              <div className="flex items-center gap-2 text-blue-300">
                <Cpu className="w-4 h-4" />
                <span className="text-sm">Powered by Rishab Informatica Group</span>
              </div>
            </div>

            {/* API Documentation */}
            <div>
              <h4 className="font-bold text-lg mb-4">API Documentation</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-cyan-300">Getting Started</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-300">Authentication</a></li>
                <li><Link href="#" className="text-gray-400 hover:text-cyan-300">Flight Search API</a></li>
                <li><Link href="#" className="text-gray-400 hover:text-cyan-300">Booking API</a></li>
                <li><Link href="#" className="text-gray-400 hover:text-cyan-300">Webhooks</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-green-400 hover:text-cyan-300">
                  <Headphones className="w-4 h-4" />
                  <span>24/7 API Support</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 hover:text-cyan-300">
                  <Mail className="w-4 h-4" />
                  <span>api-support@indigoairlines.com</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 hover:text-cyan-300">
                  <Phone className="w-4 h-4" />
                  <span>+91 8970853557</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 hover:text-cyan-300">
                  <MessageSquare className="w-4 h-4" />
                  <span>Live Chat Support</span>
                </li>
              </ul>
            </div>

            {/* CAI Integration */}
            <div>
              <h4 className="font-bold text-lg mb-4">CAI Integration</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Connected to CAI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Real-time Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">Webhooks Active</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-gray-300">
                  This platform demonstrates real airline API integration with Informatica CAI.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-slate-800" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 IndiGo Airlines API Platform. Part of Rishab Informatica Group Training Ecosystem.
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <GitBranch className="w-4 h-4 mr-2" />
                API v2.1
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Security
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== BOOKING DIALOG ==================== */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Book Flight</DialogTitle>
            <DialogDescription>
              Complete the booking form for {selectedFlightForBooking?.flightNumber}
            </DialogDescription>
          </DialogHeader>
          
          {selectedFlightForBooking && (
            <div className="space-y-6">
              {/* Flight Summary */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg">{selectedFlightForBooking.flightNumber}</h4>
                      <p className="text-sm text-gray-600">{selectedFlightForBooking.aircraft}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        ₹{selectedFlightForBooking.fares[bookingForm.class as keyof typeof selectedFlightForBooking.fares]}
                      </div>
                      <p className="text-sm text-gray-600">per passenger</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="font-semibold">{selectedFlightForBooking.departure.time}</div>
                      <div className="text-sm text-gray-600">{selectedFlightForBooking.departure.code}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">{selectedFlightForBooking.duration}</div>
                      <div className="h-px bg-gray-300 my-2"></div>
                      <div className="text-xs text-gray-500">Direct</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{selectedFlightForBooking.arrival.time}</div>
                      <div className="text-sm text-gray-600">{selectedFlightForBooking.arrival.code}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Passenger Name</Label>
                    <Input 
                      value={bookingForm.passengerName}
                      onChange={(e) => setBookingForm({...bookingForm, passengerName: e.target.value})}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input 
                      value={bookingForm.passengerEmail}
                      onChange={(e) => setBookingForm({...bookingForm, passengerEmail: e.target.value})}
                      placeholder="email@example.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Phone Number</Label>
                    <Input 
                      value={bookingForm.passengerPhone}
                      onChange={(e) => setBookingForm({...bookingForm, passengerPhone: e.target.value})}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <Label>Number of Seats</Label>
                    <Select 
                      value={bookingForm.seats.toString()}
                      onValueChange={(value) => setBookingForm({...bookingForm, seats: parseInt(value)})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select seats" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num} seat{num > 1 ? 's' : ''}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Class</Label>
                    <Select 
                      value={bookingForm.class}
                      onValueChange={(value) => setBookingForm({...bookingForm, class: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="premiumEconomy">Premium Economy</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="first">First Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Payment Method</Label>
                    <Select 
                      value={bookingForm.paymentMethod}
                      onValueChange={(value) => setBookingForm({...bookingForm, paymentMethod: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="debit_card">Debit Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price Summary */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Base Fare ({bookingForm.seats} × ₹{selectedFlightForBooking.fares[bookingForm.class as keyof typeof selectedFlightForBooking.fares]})</span>
                      <span className="font-semibold">₹{bookingForm.seats * selectedFlightForBooking.fares[bookingForm.class as keyof typeof selectedFlightForBooking.fares]}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Taxes & Fees</span>
                      <span className="font-semibold">₹{Math.round(bookingForm.seats * selectedFlightForBooking.fares[bookingForm.class as keyof typeof selectedFlightForBooking.fares] * 0.18)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total Amount</span>
                      <span className="font-bold text-2xl text-blue-600">
                        ₹{Math.round(bookingForm.seats * selectedFlightForBooking.fares[bookingForm.class as keyof typeof selectedFlightForBooking.fares] * 1.18)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={submitBooking}
              disabled={!bookingForm.passengerName || !bookingForm.passengerEmail || !bookingForm.passengerPhone}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Ticket className="w-4 h-4 mr-2" />
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}