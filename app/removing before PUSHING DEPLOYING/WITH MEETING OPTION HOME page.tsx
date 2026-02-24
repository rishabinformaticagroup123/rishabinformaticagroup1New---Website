import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, CheckCircle, GraduationCap, Users, Phone, MessageCircle, Video, Users2, ScreenShare, Mic } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TestimonialSlider from "@/components/testimonial-slider";
import CompanySlider from "@/components/company-slider";
import { CheckIcon } from "lucide-react";
import VideoSlider from "@/components/video-slider";

// Data Constants
const stats = [
  { value: "5000+", label: "Students Trained" },
  { value: "15+", label: "Professional Courses" },
  { value: "98%", label: "Placement Rate" },
  { value: "10+", label: "Years Experience" }
];

const courses = [
  {
    title: "Informatica IICS COMBO",
    description: "Master IICS, PowerCenter, SQL & Snowflake in 45 days",
    image: "/courses/informatica.png",
    href: "/courses/iics-combo-live"
  },
  { 
    title: "Azure Data Engineering",
    description: "Learn to build and optimize data solutions with Microsoft Azure.",
    image: "/courses/azure.png",
    href: "/courses/azure-combo-live"
  },
  { 
    title: "Snowflake Training",
    description: "Become proficient in Snowflake's cloud data platform and analytics capabilities.",
    image: "/courses/snowflake.png",
    href: "/courses/snowflake-combo-live"
  },
  {
    title: "Performance Engineering",
    description: "Master the techniques to optimize application performance and scalability.",
    image: "/courses/performance.png",
    href: "/courses/performance-engineering"
  }
];

const whyChooseUsItems = [
  {
    icon: <GraduationCap className="h-10 w-10" />,
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world experience."
  },
  {
    icon: <BookOpen className="h-10 w-10" />,
    title: "Comprehensive Curriculum",
    description: "Courses covering both theory and practical applications."
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Placement Assistance",
    description: "Get help with resume building and interview preparation."
  }
];

const learningApproachItems = [
  "Practical, hands-on training with real-world projects",
  "Small batch sizes for personalized attention",
  "Flexible learning options - online and offline",
  "Regular assessments and feedback",
  "Industry-aligned curriculum updated regularly"
];

const blogPosts = [
  {
    title: "How to Land a High-Paying Software Job in 45 Days (2025 Proven Steps)",
    excerpt: "🚀 Looking to break into the IT industry fast? Our powerful Combo Courses — including Informatica IICS Combo, Azure Data Eng. Combo, and Snowflake Combo — are designed to make you job-ready in just 45 days 💼 Whether you're a fresher or from a non-IT background, we've got you covered 👉 Click below to follow our proven, step-by-step roadmap and land your dream software job in 2025!.",
    date: "June 15, 2025",
    href: "/blogs/job-in-45days"
  },
  {
    title: "What Will You Learn in the IICS Combo online Training?",
    excerpt: "Dive deep into our 45-day IICS Combo training program covering SQL, PowerCenter, IICS CDI & CAI, Snowflake,mock interviews, and real-time projects—all in one batch.",
    date: "June 10, 2025",
    href: "/blogs/iics-combo-course-content"
  },
  {
    title: "Performance Engineering Best Practices",
    excerpt: "Discover techniques for optimizing application performance.",
    date: "Apr 5, 2025",
    href: "/blog/performance-engineering"
  }
];

const slides = [
   {
	type: 'image',
    src:  "/courses/informaticacombobatch13.png",
	alt: "Hands-on Practice"
  },
  {  
    type: 'short-video', 
    src: "/videos/video1.mp4",
    duration: 10000
  },
  { 
    type: 'short-video',
    src: "/videos/video2.mp4",
    duration: 10000
  },
  {   
    type: 'short-video',
    src: "/videos/video3.mp4",
    duration: 10000  
  },
  { 
    type: 'youtube',
    videoId: "4DfifZbfk7w"
  },
  { 
    type: 'youtube',
    videoId: "Kg86_3njK6A"
  },
  { 
	type: 'image',
    src: "/courses/informaticacombobatch13.png",
    alt: "Hands-on Practice"
  },
  { 
    type: 'image',
    src: "/courses/informaticacombobatch13.png",
    alt: "Hands-on Practice"
  }
];

// Meeting Platform Features
const meetingFeatures = [
  {
    icon: <Mic className="h-8 w-8" />,
    title: "Crystal Clear Audio",
    description: "High-quality audio communication for interactive learning sessions"
  },
  {
    icon: <ScreenShare className="h-8 w-8" />,
    title: "Screen Sharing",
    description: "Share your screen to demonstrate concepts and code in real-time"
  },
  {
    icon: <Users2 className="h-8 w-8" />,
    title: "Live Classes",
    description: "Interactive sessions with up to 20 participants"
  },
  {
    icon: <Video className="h-8 w-8" />,
    title: "Local Recording",
    description: "Record sessions locally for students to review later"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section - COMPACT & FIXED */}
      <div className="flex-1 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-1">
          
          {/* Mobile Layout - COMPACT */}
          <div className="lg:hidden flex flex-col gap-3">
            <div className="flex flex-col justify-center space-y-3">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Kickstart Your Software Career in 45 Days with our <span className="text-primary">COMBO Courses</span>
              </h1>

              <Link 
                href="/blogs/how-to-get-it-job-in-45days" 
                className="text-sm font-medium text-primary hover:underline flex items-center"
              >
                👉 Click to see how we make it happen!
              </Link>

              <p className="text-xs text-gray-700">
                Rishab Informatica Group offers industry-leading courses in Informatica IICS Combo, Azure Data Eng. Combo, Snowflake Combo.
              </p>

              {/* Meeting Buttons - COMPACT */}
              <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-1 text-xs">🚀 Live Classes</h3>
                <div className="flex gap-1">
                  <Button asChild size="sm" className="flex-1 text-xs h-8">
                    <Link href="/meeting/create">
                      <Video className="mr-1 h-3 w-3" />
                      Start
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex-1 text-xs h-8">
                    <Link href="/meeting/join">
                      <Users2 className="mr-1 h-3 w-3" />
                      Join
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Course Buttons - COMPACT */}
              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1 h-9 text-sm">
                  <Link href="/courses">Explore Courses</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="flex-1 h-9 text-sm">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>

              {/* Contact Info - COMPACT */}
              <div className="text-xs font-semibold text-blue-700 text-center pt-1">
                <div>📞 Call/WhatsApp</div>
                <div>
                  <a href="tel:+918970853557" className="hover:underline">8970853557</a> /{" "}
                  <a href="tel:+919448005273" className="hover:underline">9448005273</a>
                </div>
              </div>
            </div>

            {/* Video Slider - COMPACT */}
            <div className="w-full mt-0">
              <VideoSlider slides={slides} slideDuration={1000} />
            </div>
          </div>

          {/* Desktop Layout - COMPACT */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col justify-center space-y-3">
              <h1 className="text-4xl font-extrabold tracking-tight">
                Kickstart Your Software Career in 45 Days with our <span className="text-primary">COMBO Courses</span>
              </h1>
              
              <Link 
                href="/blogs/how-to-get-it-job-in-45days" 
                className="text-base font-medium text-primary hover:underline flex items-center"
              >
                👉 Click to see how we make it happen!
              </Link>
              
              <p className="text-sm text-gray-700">
                Rishab Informatica Group offers industry-leading courses in Informatica IICS Combo, Azure Data Eng.Combo, Snowflake Combo, and Performance Eng.Courses with 24*7 Support
              </p>
              
              {/* Buttons Container - COMPACT */}
              <div className="space-y-2 mt-1">
                {/* Meeting Buttons - COMPACT */}
                <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-1 text-xs">🚀 Live Interactive Classes</h3>
                  <div className="flex gap-1">
                    <Button asChild size="sm" className="flex-1 text-xs h-8">
                      <Link href="/meeting/create">
                        <Video className="mr-1 h-3 w-3" />
                        Start Meeting
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1 text-xs h-8">
                      <Link href="/meeting/join">
                        <Users2 className="mr-1 h-3 w-3" />
                        Join Meeting
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Course Buttons - PROPER SIZE */}
                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1 h-9">
                    <Link href="/courses">Explore Courses</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex-1 h-9">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>

                {/* Contact Info - COMPACT */}
                <div className="text-xs font-semibold text-gray-800 text-center sm:text-left pt-1">
                  <span>📞 Call/WhatsApp: </span>
                  <a href="tel:+918970853557" className="text-blue-700 hover:underline">+91 8970853557</a>
                  <span> / </span>
                  <a href="tel:+919448005273" className="text-blue-700 hover:underline">+91 9448005273</a>
                </div>
              </div>
            </div>

            {/* Video Slider - MOVED UP */}
            <div className="flex flex-col items-center justify-center -mt-2">
              <VideoSlider slides={slides} slideDuration={4000} />
            </div>
          </div>
        </section>

        {/* Student Success Section - IMMEDIATELY VISIBLE */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-1 text-center">
          <h2 className="text-lg font-bold tracking-tight text-gray-900">
            Our Students Excel At Leading Companies
          </h2>
        </div>

        {/* Moving Logos - IMMEDIATELY VISIBLE */}
        <div className="w-full overflow-hidden py-1 bg-white/10">
          <CompanySlider 
            direction="right-to-left" 
            fullWidth
            logos={[
              { name: "Accenture", src: "/logos/Accenture.PNG", width: 180, height: 60 }, 
              { name: "TCS", src: "/logos/TCS.PNG", width: 120, height: 60 },
              { name: "Wipro", src: "/logos/Wipro.PNG", width: 140, height: 60 },
              { name: "Cognizant", src: "/logos/Cognizant.PNG", width: 160, height: 60 },
              { name: "Infosys", src: "/logos/Infosys.PNG", width: 150, height: 60 },
            ]}
            speed="medium"
          />
        </div>

        {/* Meeting Platform Features - MOVED DOWN */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Platform Features</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              Everything you need for effective online training sessions
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {meetingFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-background border shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mt-3 text-lg font-bold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Rest of sections remain compact */}
      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center rounded-lg bg-muted p-4 text-center">
              <span className="text-2xl font-bold text-primary">{stat.value}</span>
              <span className="mt-1 text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Continue with other sections... */}
      
    </div>
  );
}