import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, CheckCircle, GraduationCap, Users, Phone, MessageCircle } from "lucide-react";
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
    src: "/courses/informaticaYT.png",
    alt: "Hands-on Practice"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section - Compact layout */}
      <div className="flex-1 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
          {/* Mobile Layout */}
<div className="lg:hidden flex flex-col gap-4">
  <div className="flex flex-col justify-center space-y-3">
    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
      Kickstart Your Software Career in 45 Days with our <span className="text-primary">COMBO Courses</span>
    </h1>

    <Link 
      href="/blogs/job-in-45days" 
      className="text-lg font-medium text-primary hover:underline flex items-center"
    >
      👉 Click to see how we make it happen!
    </Link>

    <p className="text-base text-gray-700 font-medium">
      Rishab Informatica Group offers industry-leading courses in Informatica IICS Combo, Azure Data Eng. Combo, Snowflake Combo.
    </p>

    {/* Two-line Call / WhatsApp Info */}
    <div className="mt-2 text-center font-semibold text-blue-700 text-base leading-snug">
      <div>📞 Call / WhatsApp</div>
      <div>
        <a href="tel:+918970853557" className="hover:underline">+91 8970853557</a> /{" "}
        <a href="tel:+919448005273" className="hover:underline">9448005273</a>
      </div>
    </div>

    {/* Buttons side by side */}
    <div className="flex flex-row gap-2 justify-center mt-3">
      <Button asChild size="lg" className="rounded-full text-sm w-1/2">
        <Link href="/courses">Explore Courses</Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="rounded-full text-sm w-1/2">
        <Link href="/contact">Contact Us</Link>
      </Button>
    </div>
  </div>

  {/* Video Slider remains below */}
  <div className="w-full mt-1">
    <VideoSlider slides={slides} slideDuration={1000} />base text-gray-700
  </div>
</div>


          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center space-y-3">
              <h1 className="text-5xl font-extrabold tracking-tight">
                Kickstart Your Software Career in 45 Days with our <span className="text-primary">COMBO Courses</span>
              </h1>
              
              <Link 
                href="/blogs/job-in-45days" 
                className="text-lg font-medium text-primary hover:underline flex items-center"
              >
                👉 Click to see how we make it happen!
              </Link>
              
              <p className="text-base text-gray-700">
                Rishab Informatica Group offers industry-leading courses in Informatica IICS Combo, Azure Data Eng.Combo, Snowflake Combo, and Performance Eng.Courses with 24*7 Support
              </p>
              
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button asChild size="lg" className="rounded-full text-sm">
                    <Link href="/courses">Explore Courses</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full text-sm">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>

                {/* Call & WhatsApp */}
                <div className="mt-4 text-base font-semibold text-gray-800 text-center sm:text-left">
                  <span>📞 Call/WhatsApp: </span>
                  <a href="tel:+918970853557" className="text-blue-700 hover:underline">+91 8970853557</a>
                  <span> / </span>
                  <a href="tel:+919448005273" className="text-blue-700 hover:underline">+91 9448005273</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <VideoSlider slides={slides} slideDuration={4000} />
            </div>
          </div>
        </section>

        {/* Student Success Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-1 text-center">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Our Students Excel At Leading Companies
          </h2>
        </div>

        {/* Moving Logos */}
        <div className="w-full overflow-hidden py-2 bg-white/10">
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
            speed = "medium"
          />
        </div>
      </div>

      {/* Rest of the sections remain exactly the same */}
      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
              <span className="text-3xl font-bold text-primary">{stat.value}</span>
              <span className="mt-2 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:pt-8 pb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Top Courses</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Industry-relevant courses designed to help you master the latest technologies and advance your career.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
              <Image 
                src={course.image} 
                width={400} 
                height={225} 
                alt={course.title} 
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="mt-2 text-muted-foreground">{course.description}</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Live Training</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Placement Assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Real-time Projects</span>
                  </li>
                </ul>
                <Button asChild className="mt-6 w-full">
                  <Link href={course.href}>Enroll Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Rishab Informatica Group</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              We're committed to providing the highest quality training to help you succeed in your tech career.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {whyChooseUsItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center rounded-lg bg-background p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Student Success Stories</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Hear what our students say about their experience.
            </p>
          </div>
          <div className="mt-12">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* Learning Approach Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <Image
              src="/images/approach.jpeg"
              width={600}
              height={400}
              alt="Learning approach"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Learning Approach</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Practical training that prepares you for real-world challenges.
            </p>
            <ul className="mt-8 space-y-4">
              {learningApproachItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="mr-3 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest from Our Blog</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Stay updated with the latest trends in tech.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground">{post.date}</div>
                <h3 className="mt-2 text-xl font-bold">{post.title}</h3>
                <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                <Button asChild variant="link" className="mt-4 px-0 text-primary">
                  <Link href={post.href} className="flex items-center">
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/blogs">View All Blogs</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Advance Your Career?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
            Join thousands of successful professionals.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white text-black hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          {/* Mobile Call & WhatsApp in CTA */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="tel:+918970853557" 
              className="flex items-center gap-2 text-base font-semibold text-white hover:underline"
            >
              <Phone className="h-5 w-5" />
              Call: +91 8970853557
            </a>
            <a 
              href="https://wa.me/918970853557" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base font-semibold text-white hover:underline"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}