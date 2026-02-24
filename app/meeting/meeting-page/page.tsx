"use client";

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  Users, 
  Mic, 
  ScreenShare, 
  MonitorSmartphone,
  Shield,
  Clock,
  Calendar,
  Link2,
  User,
  Key,
  ArrowRight,
  CheckCircle2,
  Headphones,
  Sparkles,
  Eye,
  EyeOff,
  Copy,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Meeting Features
const features = [
  {
    icon: <Video className="h-5 w-5" />,
    title: "HD Video",
    description: "Crystal clear video quality"
  },
  {
    icon: <Mic className="h-5 w-5" />,
    title: "Clear Audio",
    description: "High-quality audio transmission"
  },
  {
    icon: <ScreenShare className="h-5 w-5" />,
    title: "Screen Share",
    description: "Share your screen instantly"
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "20+ Participants",
    description: "Interactive group sessions"
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "No Time Limit",
    description: "Unlimited meeting duration"
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Secure",
    description: "End-to-end encrypted"
  }
];

// Upcoming Live Sessions
const upcomingSessions = [
  {
    course: "Informatica IICS Combo",
    time: "07:00 PM - 09:00 PM IST",
    instructor: "Hari Sir",
    topic: "Advanced Mapping Design",
    date: "Today",
    code: "INFA-BATCH13"
  },
  {
    course: "Snowflake Training",
    time: "07:15 AM - 08:45 AM IST",
    instructor: "Hari Sir",
    topic: "Snowflake Architecture",
    date: "Mon, 15",
    code: "INFA-SNOW"
  }
];

// Main component with Suspense for useSearchParams
function MeetingJoinContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Student join states
  const [meetingId, setMeetingId] = useState(searchParams?.get('room') || "");
  const [name, setName] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  // Instructor create states
  const [instructorPassword, setInstructorPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);
  
  const SECRET_PASSWORD = "Hari@2026"; // Your password

  // Auto-fill meeting ID from URL
  useEffect(() => {
    const roomFromUrl = searchParams?.get('room');
    if (roomFromUrl) {
      setMeetingId(roomFromUrl.toUpperCase());
    }
  }, [searchParams]);

  const handleJoin = () => {
    if (meetingId && name) {
      setIsJoining(true);
      window.location.href = `/meeting/${meetingId}?name=${encodeURIComponent(name)}`;
    }
  };

  const handleAuthenticate = () => {
    if (instructorPassword === SECRET_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid instructor password');
    }
  };

  const generateRoomId = () => {
    const prefix = 'INFA';
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${randomId}`;
  };

  const handleGenerateCode = () => {
    const newCode = generateRoomId();
    setGeneratedCode(newCode);
    setCodeCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 3000);
  };

  const startMeeting = () => {
    if (generatedCode) {
      router.push(`/meeting/${generatedCode}?host=true&name=Hari%20Sir`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-1.5">
                <Video className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Rishab Informatica Group</h1>
                <p className="text-xs text-gray-600">Live Interactive Classes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="hidden md:flex items-center gap-2 text-gray-600">
                <Headphones className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
              <div className="bg-green-100 px-3 py-1.5 rounded-full">
                <span className="text-xs font-semibold text-green-700 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Live Now: 12 Students
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-blue-600/5 rounded-2xl p-6 border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Rishab Informatica Group Live Classes
                  </h2>
                  <p className="text-gray-600">
                    Join sessions with Hari Sir or start a new class (instructors only)
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs for Student/Instructor */}
            <Tabs defaultValue="join" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="join" className="text-base py-3">
                  <Users className="h-4 w-4 mr-2" />
                  Join Class (Students)
                </TabsTrigger>
                <TabsTrigger value="create" className="text-base py-3">
                  <Shield className="h-4 w-4 mr-2" />
                  Start Class (Instructors)
                </TabsTrigger>
              </TabsList>

              {/* STUDENT TAB - Join Meeting (HIGHLIGHTED) */}
              <TabsContent value="join">
                <Card className="border-2 shadow-lg ring-2 ring-primary/20 ring-offset-2 relative">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Video className="h-6 w-6 text-primary" />
                      Join Live Class
                    </CardTitle>
                    <CardDescription>
                      Enter the meeting code provided by your instructor
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-2">
                        <User className="h-4 w-4" /> Your Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>

                    {/* Meeting ID Input */}
                    <div className="space-y-2">
                      <Label htmlFor="meetingId" className="text-sm font-semibold flex items-center gap-2">
                        <Link2 className="h-4 w-4" /> Meeting Code
                      </Label>
                      <Input
                        id="meetingId"
                        placeholder="e.g., INFA-X7K9M2"
                        value={meetingId}
                        onChange={(e) => setMeetingId(e.target.value.toUpperCase())}
                        className="h-12 text-base font-mono"
                      />
                      {meetingId && (
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Using code: {meetingId}
                        </p>
                      )}
                    </div>

                    {/* Join Options */}
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Mic optional</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Camera optional</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button 
                      onClick={handleJoin}
                      disabled={!meetingId || !name || isJoining}
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
                    >
                      {isJoining ? (
                        <>Connecting to Class...</>
                      ) : (
                        <>
                          Join Live Class
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-center text-gray-500">
                      By joining, you agree to our class guidelines
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* INSTRUCTOR TAB - Create Meeting (Password Protected) */}
              <TabsContent value="create">
                <Card className="border-2 shadow-lg border-primary/20">
                  <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-blue-50/50">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Shield className="h-6 w-6 text-primary" />
                      Start New Class (Instructors Only)
                    </CardTitle>
                    <CardDescription>
                      Create a new meeting session for your students
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-5 pt-6">
                    {!isAuthenticated ? (
                      // Password Prompt
                      <div className="space-y-4">
                        <div className="relative">
                          <Label className="text-sm font-semibold mb-2 block">Instructor Password</Label>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={instructorPassword}
                            onChange={(e) => setInstructorPassword(e.target.value)}
                            className="h-12 text-base pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        
                        {authError && (
                          <p className="text-sm text-red-500">{authError}</p>
                        )}
                        
                        <Button 
                          onClick={handleAuthenticate}
                          className="w-full"
                          disabled={!instructorPassword}
                        >
                          <Key className="mr-2 h-4 w-4" />
                          Access Instructor Panel
                        </Button>
                      </div>
                    ) : (
                      // Code Generation Panel
                      <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-sm text-green-800 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Authenticated as Instructor (Hari Sir)
                          </p>
                        </div>

                        {!generatedCode ? (
                          <Button 
                            onClick={handleGenerateCode}
                            size="lg"
                            className="w-full"
                          >
                            <Video className="mr-2 h-5 w-5" />
                            Generate New Meeting Code
                          </Button>
                        ) : (
                          <div className="space-y-4">
                            <div className="bg-blue-50 p-6 rounded-xl text-center">
                              <p className="text-sm text-gray-600 mb-2">Your Meeting Code:</p>
                              <p className="text-3xl font-mono font-bold text-primary mb-4">
                                {generatedCode}
                              </p>
                              
                              <div className="flex gap-2">
                                <Button
                                  onClick={copyToClipboard}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  {codeCopied ? (
                                    <>
                                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                      Copied!
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-4 w-4 mr-2" />
                                      Copy Code
                                    </>
                                  )}
                                </Button>
                                
                                <Button
                                  onClick={startMeeting}
                                  className="flex-1 bg-primary"
                                >
                                  <Video className="h-4 w-4 mr-2" />
                                  Start Meeting
                                </Button>
                              </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2 text-sm">Share with Students:</h4>
                              <p className="text-xs text-gray-600 mb-2">
                                Students should:
                              </p>
                              <ol className="text-xs space-y-1 text-gray-700 list-decimal pl-4">
                                <li>Go to "Join Class" tab above</li>
                                <li>Enter code: <span className="font-mono font-bold">{generatedCode}</span></li>
                                <li>Enter their name</li>
                                <li>Click "Join Live Class"</li>
                              </ol>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Features Grid */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Live Class Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="text-primary mt-0.5">{feature.icon}</div>
                    <div>
                      <p className="text-sm font-medium">{feature.title}</p>
                      <p className="text-xs text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Upcoming Sessions & Info (NO FAKE BUTTONS) */}
          <div className="space-y-6">
            {/* Live Session Info Card - NO fake button */}
            <Card className="bg-gradient-to-br from-orange-50 to-red-50/30 border-orange-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-orange-700">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  LIVE NOW
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <h4 className="font-bold text-gray-900">Informatica IICS Combo</h4>
                    <p className="text-sm text-gray-600">Performance Tuning Session</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Hari Sir</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Users className="h-4 w-4" />
                    <span>8 students online</span>
                  </div>
                  
                  {/* REMOVED: Fake "Join Now" button */}
                  
                  {/* Instruction to use main form */}
                  <div className="mt-4 pt-3 border-t border-orange-200">
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <ArrowRight className="h-3 w-3 text-orange-600" />
                      Use the <span className="font-semibold">"Join Live Class"</span> form above
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions - Informational only */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session, idx) => (
                  <div key={idx} className="border-b last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {session.date}
                      </span>
                      <span className="text-xs text-gray-500">{session.time}</span>
                    </div>
                    <h4 className="font-semibold text-sm">{session.course}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">{session.topic}</p>
                    <p className="text-xs text-gray-500 mt-1">Instructor: {session.instructor}</p>
                    
                    {/* Show code hint but no direct join button */}
                    <p className="text-xs text-primary mt-1">
                      Code: <span className="font-mono">{session.code}</span>
                    </p>
                  </div>
                ))}
                <Button variant="link" className="w-full text-xs p-0 h-auto">
                  View full schedule →
                </Button>
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Headphones className="h-8 w-8 mx-auto text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Need Help Joining?</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Call or WhatsApp for instant support
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-primary">+91 8970853557</p>
                    <p className="text-sm font-bold text-primary">+91 9448005273</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Available 15 mins before class
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-8 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
            <p>© 2026 Rishab Informatica Group. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-primary">Privacy</Link>
              <Link href="/terms" className="hover:text-primary">Terms</Link>
              <Link href="/support" className="hover:text-primary">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Main page with Suspense wrapper
export default function MeetingJoinPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading meeting interface...</p>
        </div>
      </div>
    }>
      <MeetingJoinContent />
    </Suspense>
  );
}

// Force dynamic rendering to avoid static prerender issues
export const dynamic = 'force-dynamic';