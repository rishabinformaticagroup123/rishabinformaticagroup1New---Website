"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
    instructor: "Rishab Sir",
    topic: "Advanced Mapping Design",
    date: "Today"
  },
  {
    course: "Azure Data Engineering",
    time: "08:00 AM - 10:00 AM IST",
    instructor: "Rishab Sir",
    topic: "Data Factory Pipelines",
    date: "Tomorrow"
  },
  {
    course: "Snowflake Training",
    time: "07:00 PM - 09:00 PM IST",
    instructor: "Rishab Sir",
    topic: "Snowflake Architecture",
    date: "Mon, 15"
  }
];

// Main component with Suspense for useSearchParams
function MeetingJoinContent() {
  const searchParams = useSearchParams();
  const [meetingId, setMeetingId] = useState(searchParams?.get('room') || "");
  const [name, setName] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = () => {
    if (meetingId && name) {
      setIsJoining(true);
      // Redirect to meeting room
      window.location.href = `/meeting/${meetingId}?name=${encodeURIComponent(name)}`;
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
                <h1 className="text-xl font-bold text-gray-900">Rishab Informatica</h1>
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
          
          {/* Main Join Card - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-blue-600/5 rounded-2xl p-6 border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Join Live Class Session
                  </h2>
                  <p className="text-gray-600">
                    Connect with Rishab Sir and fellow learners in real-time
                  </p>
                </div>
              </div>
            </div>

            {/* Join Meeting Card */}
            <Card className="border-2 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Video className="h-6 w-6 text-primary" />
                  Join Meeting
                </CardTitle>
                <CardDescription>
                  Enter the meeting details provided by your instructor
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
                    <Link2 className="h-4 w-4" /> Meeting ID / Room Name
                  </Label>
                  <Input
                    id="meetingId"
                    placeholder="e.g., iics-class-07pm"
                    value={meetingId}
                    onChange={(e) => setMeetingId(e.target.value)}
                    className="h-12 text-base font-mono"
                  />
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
                  By joining, you agree to our class guidelines and code of conduct
                </p>
              </CardFooter>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/meeting/create">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2 border-2 hover:bg-primary/5">
                  <MonitorSmartphone className="h-6 w-6" />
                  <span className="font-semibold">Start New Class</span>
                  <span className="text-xs text-gray-500">For instructors only</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2 border-2" disabled>
                <Calendar className="h-6 w-6" />
                <span className="font-semibold">Schedule Class</span>
                <span className="text-xs text-gray-500">Coming soon</span>
              </Button>
            </div>

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

          {/* Right Sidebar - Upcoming Sessions & Info */}
          <div className="space-y-6">
            {/* Live Session Card */}
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
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900">Informatica IICS Combo</h4>
                    <p className="text-sm text-gray-600">Performance Tuning Session</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Rishab Sir</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Users className="h-4 w-4" />
                    <span>8 students online</span>
                  </div>
                  <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                    <Video className="mr-2 h-4 w-4" />
                    Join Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
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