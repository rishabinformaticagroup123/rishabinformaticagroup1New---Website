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
  Mail, Smartphone, Monitor, Globe2, Users as UsersIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

export default function FlightServiceProviderPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiRequests, setApiRequests] = useState<APIRequest[]>([]);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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

  // Fetch flights
  const fetchFlights = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setFlights(mockFlights);
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

  // Initialize
  useEffect(() => {
    fetchFlights();
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative z-0">
      {/* ==================== PROFESSIONAL HEADER ==================== */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        {/* Top Status Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-red-600 text-white">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  <span>API Server: Online</span>
                </div>
                <div className="hidden sm:block">|</div>
                <div className="flex items-center gap-2">
                  <DatabaseIcon className="w-4 h-4" />
                  <span>Database: Connected</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <div className="flex items-center gap-2">
                  <CpuIcon className="w-4 h-4" />
                  <span>CAI Integration: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Security: SSL/TLS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Logo & Brand */}
            <div className="flex items-center justify-between w-full lg:w-auto">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">IndiGo Airlines</h1>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">Flight Service Provider Platform</p>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      API v2.1
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Powered by Rishab Informatica Group</p>
                </div>
              </div>
              
              {/* Mobile Menu */}
              <Button variant="ghost" size="icon" className="lg:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'dashboard' 
                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Home className="w-4 h-4" />
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('flights')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'flights' 
                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Plane className="w-4 h-4" />
                Flights
              </button>
              <button 
                onClick={() => setActiveTab('api-config')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'api-config' 
                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Settings className="w-4 h-4" />
                API Config
              </button>
              <button 
                onClick={() => setActiveTab('monitor')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'monitor' 
                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Activity className="w-4 h-4" />
                Monitor
              </button>
              <button 
                onClick={() => setActiveTab('documentation')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === 'documentation' 
                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                Documentation
              </button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">Admin User</div>
                    <div className="text-xs text-gray-500">API Administrator</div>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-3 border-b">
                      <div className="font-medium">API Administrator</div>
                      <div className="text-sm text-gray-500">admin@indigoairlines.com</div>
                    </div>
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3">
                      <User className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Profile Settings</div>
                        <div className="text-xs text-gray-500">Manage your account</div>
                      </div>
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3">
                      <ShieldIcon className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Security</div>
                        <div className="text-xs text-gray-500">API keys & permissions</div>
                      </div>
                    </button>
                    <Separator className="my-2" />
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-red-600">
                      <LogOut className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Logout</div>
                        <div className="text-xs text-gray-500">Sign out from platform</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mt-4">
            <div className="flex overflow-x-auto gap-2 pb-2">
              {['dashboard', 'flights', 'api-config', 'monitor', 'documentation'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
                    activeTab === tab
                      ? 'bg-blue-100 text-blue-600 font-medium'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="container mx-auto px-4 py-8 relative z-0">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-blue-200">
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
          
          <Card className="border-green-200">
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
          
          <Card className="border-purple-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-700">{apiRequests.length}</div>
                  <div className="text-sm text-gray-600">API Requests (24h)</div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Network className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200">
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

          {/* Flights Tab */}
          <TabsContent value="flights" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Flight Inventory</h3>
                    <p className="text-gray-600">Real-time flight data exposed via API</p>
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
                      <Plane className="w-4 h-4 mr-2" />
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
                      <Card key={flight.id} className="border hover:shadow-md">
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

                            {/* Actions */}
                            <div className="lg:col-span-2">
                              <div className="flex flex-col gap-2">
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                                <Button size="sm">
                                  Update Seats
                                </Button>
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
      <footer className="bg-gray-900 text-white mt-12 relative z-0">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">IndiGo Airlines API</h3>
                  <p className="text-gray-400 text-sm">Flight Service Provider</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Official airline API platform for flight booking integration.
                Part of Rishab Informatica Group Learning Platform.
              </p>
              <div className="flex items-center gap-2 text-gray-400">
                <Cpu className="w-4 h-4" />
                <span className="text-sm">Powered by Rishab Informatica Group</span>
              </div>
            </div>

            {/* API Documentation */}
            <div>
              <h4 className="font-bold text-lg mb-4">API Documentation</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">Getting Started</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Authentication</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Flight Search API</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Booking API</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Webhooks</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <Headphones className="w-4 h-4" />
                  <span>24/7 API Support</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>api-support@indigoairlines.com</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>+91 8970853557</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
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
                  <span className="text-sm">Connected to CAI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Real-time Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Webhooks Active</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-300">
                  This platform demonstrates real airline API integration with Informatica CAI.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 IndiGo Airlines API Platform. Part of Rishab Informatica Group Training Ecosystem.
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm" className="text-gray-400">
                <GitBranch className="w-4 h-4 mr-2" />
                API v2.1
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Security
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}