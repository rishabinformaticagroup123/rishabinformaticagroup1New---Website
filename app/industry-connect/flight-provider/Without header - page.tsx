'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plane, 
  Calendar,
  Clock,
  Users,
  Shield,
  CheckCircle,
  Ticket,
  Luggage,
  Wifi,
  Utensils,
  Tv,
  UserCheck,
  CreditCard,
  MapPin,
  ArrowRight,
  BarChart,
  Globe,
  Server,
  Cpu,
  Database,
  Key,
  Lock,
  Zap,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Copy,
  Check,
  AlertCircle,
  Download,
  Upload,
  Settings,
  Activity,
  Terminal,
  Code,
  Network
} from "lucide-react";
import { format } from "date-fns";
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

// ==================== TYPES ====================
interface AirlineFlight {
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

interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
}

interface APIRequestLog {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  status: number;
  duration: number;
  source: string;
  payload?: any;
  response?: any;
}

interface CAIConfiguration {
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

// ==================== MAIN COMPONENT ====================
export default function AirlineServiceProviderPage() {
  // State Management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [flights, setFlights] = useState<AirlineFlight[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiRequests, setApiRequests] = useState<APIRequestLog[]>([]);
  const [caiConfig, setCaiConfig] = useState<CAIConfiguration>({
    baseUrl: typeof window !== 'undefined' ? `${window.location.origin}/api/airline` : '',
    apiKey: 'indigo_api_key_' + Math.random().toString(36).substr(2, 16),
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

  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    origin: 'DEL',
    destination: 'BOM',
    departureDate: format(new Date(), 'yyyy-MM-dd'),
    passengers: 1,
    cabinClass: 'economy'
  });

  // Mock API call simulation
  const simulateApiCall = async (endpoint: string, method: string, payload?: any) => {
    const startTime = Date.now();
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    const logEntry: APIRequestLog = {
      id: requestId,
      timestamp: new Date().toISOString(),
      endpoint,
      method,
      status: 200,
      duration: 0,
      source: 'CAI_INTEGRATION',
      payload
    };

    setApiRequests(prev => [logEntry, ...prev.slice(0, 49)]); // Keep last 50

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

    const duration = Date.now() - startTime;
    
    // Update log with duration
    setApiRequests(prev => prev.map(log => 
      log.id === requestId ? { ...log, duration } : log
    ));

    return { success: true, requestId, duration };
  };

  // Fetch flights from backend
  const fetchFlights = async () => {
    setLoading(true);
    try {
      await simulateApiCall(caiConfig.endpoints.search, 'POST', searchParams);
      
      // In production, this would be:
      // const response = await fetch(`${caiConfig.baseUrl}${caiConfig.endpoints.search}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-API-Key': caiConfig.apiKey
      //   },
      //   body: JSON.stringify(searchParams)
      // });
      // const data = await response.json();
      // setFlights(data.flights);

      // Mock data for demonstration
      const mockFlights: AirlineFlight[] = [
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
          amenities: ['Free Meal', '20kg Baggage', 'In-flight Entertainment', 'WiFi'],
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
          amenities: ['Free Meal', '25kg Baggage', 'Business Lounge', 'Priority Boarding', 'WiFi'],
          status: 'scheduled'
        },
        {
          id: 'IG20241225003',
          flightNumber: '6E 209',
          airlineCode: '6E',
          departure: {
            airport: 'Indira Gandhi International Airport',
            city: 'Delhi',
            code: 'DEL',
            terminal: 'T3',
            time: '19:45',
            date: '2024-12-25'
          },
          arrival: {
            airport: 'Chhatrapati Shivaji Maharaj International Airport',
            city: 'Mumbai',
            code: 'BOM',
            terminal: 'T2',
            time: '22:00',
            date: '2024-12-25'
          },
          duration: '2h 15m',
          aircraft: 'Airbus A320',
          availableSeats: 18,
          fares: {
            economy: 5200,
            premiumEconomy: 7800,
            business: 14500,
            first: 21000
          },
          amenities: ['Free Meal', '20kg Baggage', 'In-flight Entertainment'],
          status: 'scheduled'
        }
      ];

      setFlights(mockFlights);
    } catch (error) {
      toast.error('Failed to fetch flights');
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle API key copy
  const copyApiKey = () => {
    navigator.clipboard.writeText(caiConfig.apiKey);
    setCopied(true);
    toast.success('API Key copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate new API key
  const generateNewApiKey = () => {
    const newKey = 'indigo_api_key_' + Math.random().toString(36).substr(2, 16);
    setCaiConfig(prev => ({ ...prev, apiKey: newKey }));
    toast.success('New API Key generated');
  };

  // Initialize on mount
  useEffect(() => {
    fetchFlights();
  }, []);

  // Stats calculation
  const totalFlights = flights.length;
  const totalAvailableSeats = flights.reduce((sum, flight) => sum + flight.availableSeats, 0);
  const averagePrice = flights.length > 0 
    ? Math.round(flights.reduce((sum, flight) => sum + flight.fares.economy, 0) / flights.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">IndiGo Airlines</h1>
                <p className="text-blue-100 mt-1">Flight Service Provider Platform</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <Server className="w-3 h-3 mr-1" />
                    API Active
                  </Badge>
                  <Badge variant="outline" className="border-white/30 text-white">
                    <Cpu className="w-3 h-3 mr-1" />
                    CAI Integrated
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="text-center md:text-right">
                <div className="text-sm text-blue-200">Connected to</div>
                <div className="text-xl font-bold">Informatica IICS CAI</div>
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                onClick={() => setActiveTab('api-config')}
              >
                <Settings className="w-4 h-4 mr-2" />
                API Configuration
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 -mt-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-blue-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-700">{totalFlights}</div>
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
                  <div className="text-2xl font-bold text-green-700">{totalAvailableSeats}</div>
                  <div className="text-sm text-gray-600">Available Seats</div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-700">₹{averagePrice}</div>
                  <div className="text-sm text-gray-600">Avg. Price</div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="flights" className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              <span className="hidden sm:inline">Flights</span>
            </TabsTrigger>
            <TabsTrigger value="api-config" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">API Config</span>
            </TabsTrigger>
            <TabsTrigger value="monitor" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Monitor</span>
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Docs</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold">CAI Integration Overview</h3>
                    <p className="text-gray-600">Real-time connection status with aggregators</p>
                  </div>
                  <Button onClick={fetchFlights} disabled={loading}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Data
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded">
                          <Globe className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">API Endpoint</h4>
                          <code className="text-sm text-gray-600 break-all">
                            {caiConfig.baseUrl}{caiConfig.endpoints.search}
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 rounded">
                          <Network className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Connected Aggregators</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge className="bg-blue-100 text-blue-800">MakeMyTrip</Badge>
                            <Badge className="bg-purple-100 text-purple-800">Goibibo</Badge>
                            <Badge className="bg-orange-100 text-orange-800">EaseMyTrip</Badge>
                            <Badge className="bg-green-100 text-green-800">Yatra</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-100 rounded">
                          <Database className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Flight Inventory</h4>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Total Flights:</span>
                              <span className="font-semibold">{totalFlights}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Available Seats:</span>
                              <span className="font-semibold">{totalAvailableSeats}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Last Updated:</span>
                              <span className="font-semibold">{format(new Date(), 'HH:mm:ss')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent API Requests */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Recent API Requests</h3>
                <ScrollArea className="h-64">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiRequests.slice(0, 10).map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-mono text-xs">
                            {format(new Date(request.timestamp), 'HH:mm:ss')}
                          </TableCell>
                          <TableCell>
                            <code className="text-xs">{request.endpoint}</code>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                request.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                                request.method === 'POST' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }
                            >
                              {request.method}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{request.duration}ms</span>
                          </TableCell>
                        </TableRow>
                      ))}
                      {apiRequests.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            No API requests yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flights Tab */}
          <TabsContent value="flights" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Flight Inventory</h3>
                    <p className="text-gray-600">Real-time flight data available via API</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
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
                      <Card key={flight.id} className="border hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Flight Info */}
                            <div className="lg:col-span-3">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Plane className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-lg">{flight.flightNumber}</h4>
                                  <p className="text-sm text-gray-600">{flight.airlineCode}</p>
                                  <Badge 
                                    className={
                                      flight.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                                      flight.status === 'boarding' ? 'bg-blue-100 text-blue-800' :
                                      flight.status === 'delayed' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }
                                  >
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
                                  <div className="h-px bg-gray-300 my-2 relative">
                                    <div className="absolute left-0 top-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full bg-gray-400"></div>
                                    <div className="absolute right-0 top-1/2 w-2 h-2 -mt-1 -mr-1 rounded-full bg-gray-400"></div>
                                  </div>
                                  <div className="text-xs text-gray-500">Non-stop</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold">{flight.arrival.time}</div>
                                  <div className="text-sm font-semibold">{flight.arrival.code}</div>
                                  <div className="text-xs text-gray-600">{flight.arrival.city}</div>
                                </div>
                              </div>
                              <div className="mt-3">
                                <div className="text-sm text-gray-600">
                                  {flight.aircraft} • {flight.availableSeats} seats available
                                </div>
                              </div>
                            </div>

                            {/* Fares */}
                            <div className="lg:col-span-2">
                              <div className="space-y-1">
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
                                <Button size="sm" variant="outline" className="w-full">
                                  View Details
                                </Button>
                                <Button size="sm" className="w-full">
                                  Update Inventory
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex flex-wrap gap-2">
                              {flight.amenities.map((amenity, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
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
                          Use this key in your CAI connector configuration
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

                  {/* Endpoints Configuration */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">API Endpoints</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Search Flights Endpoint</Label>
                        <code className="block p-3 bg-gray-100 rounded text-sm font-mono">
                          {caiConfig.baseUrl}{caiConfig.endpoints.search}
                        </code>
                      </div>
                      <div className="space-y-2">
                        <Label>Create Booking Endpoint</Label>
                        <code className="block p-3 bg-gray-100 rounded text-sm font-mono">
                          {caiConfig.baseUrl}{caiConfig.endpoints.book}
                        </code>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Webhooks Configuration */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Webhooks</Label>
                    <p className="text-sm text-gray-600">
                      CAI will call these URLs for async operations
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded border">
                        <div>
                          <div className="font-medium">Booking Confirmation</div>
                          <code className="text-sm text-gray-600">
                            {caiConfig.baseUrl}{caiConfig.webhooks.bookingConfirm}
                          </code>
                        </div>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded border">
                        <div>
                          <div className="font-medium">Payment Success</div>
                          <code className="text-sm text-gray-600">
                            {caiConfig.baseUrl}{caiConfig.webhooks.paymentSuccess}
                          </code>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CAI Connector Configuration */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-6">CAI Connector Configuration</h3>
                <div className="space-y-4">
                  <Label>Sample CAI Connector Configuration</Label>
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
                      toast.success('Configuration copied to clipboard');
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy CAI Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Documentation Tab */}
          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-6">API Documentation</h3>
                
                <div className="space-y-8">
                  {/* Search Endpoint */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">POST</Badge>
                      <code className="text-lg font-mono">{caiConfig.endpoints.search}</code>
                    </div>
                    <p className="text-gray-600">
                      Search for available flights based on search criteria. This endpoint is called by CAI aggregators.
                    </p>
                    
                    <div className="space-y-3">
                      <Label>Request Body</Label>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`{
  "origin": "DEL",
  "destination": "BOM",
  "departureDate": "2024-12-25",
  "passengers": 2,
  "cabinClass": "economy"
}`}</pre>
                    </div>

                    <div className="space-y-3">
                      <Label>Response</Label>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "data": [
    {
      "id": "IG20241225001",
      "flightNumber": "6E 205",
      "airlineCode": "6E",
      "departure": {
        "airport": "Indira Gandhi International Airport",
        "city": "Delhi",
        "code": "DEL",
        "terminal": "T3",
        "time": "06:00",
        "date": "2024-12-25"
      },
      "arrival": {
        "airport": "Chhatrapati Shivaji Maharaj International Airport",
        "city": "Mumbai",
        "code": "BOM",
        "terminal": "T2",
        "time": "08:15",
        "date": "2024-12-25"
      },
      "duration": "2h 15m",
      "aircraft": "Airbus A320neo",
      "availableSeats": 45,
      "fares": {
        "economy": 4250,
        "premiumEconomy": 6500,
        "business": 12500,
        "first": 18500
      },
      "amenities": ["Free Meal", "20kg Baggage", "In-flight Entertainment"],
      "status": "scheduled"
    }
  ],
  "timestamp": "2024-12-24T10:30:00Z",
  "provider": "IndiGo Airlines"
}`}</pre>
                    </div>
                  </div>

                  <Separator />

                  {/* Booking Endpoint */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-800">POST</Badge>
                      <code className="text-lg font-mono">{caiConfig.endpoints.book}</code>
                    </div>
                    <p className="text-gray-600">
                      Create a new booking. CAI will call this endpoint when user confirms booking.
                    </p>
                    
                    <div className="space-y-3">
                      <Label>Headers</Label>
                      <div className="space-y-2">
                        <code className="block bg-gray-100 p-2 rounded text-sm">
                          X-API-Key: {caiConfig.apiKey.substring(0, 12)}...
                        </code>
                        <code className="block bg-gray-100 p-2 rounded text-sm">
                          Content-Type: application/json
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">IndiGo Airlines API</h4>
              <p className="text-gray-400 text-sm">
                Official REST API for flight booking integration. 
                Used by aggregators via Informatica CAI for real-time flight data.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">CAI Integration Status</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>API: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Database: Connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Webhooks: Operational</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <p className="text-gray-400 text-sm">
                For CAI integration support, contact:
                <br />
                <code className="text-blue-300">cai-support@indigoairlines.com</code>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2024 IndiGo Airlines Flight Service Provider. This is a demonstration platform for CAI integration.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}