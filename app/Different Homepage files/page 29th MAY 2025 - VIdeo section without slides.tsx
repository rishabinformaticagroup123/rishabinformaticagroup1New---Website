import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, CheckCircle, GraduationCap, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import TestimonialSlider from "@/components/testimonial-slider"
import CompanySlider from "@/components/company-slider"
import { CheckIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-16">
      {/* Hero Section */}
      <div className="flex-1 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Column */}
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5x9">
                Kickstart Your Software Career in 45 Days <span className="text-primary"> with our COMBO Courses </span> Save time & money !!
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Rishab Informatica Group offers industry-leading courses in Informatica IICS, Azure Data Engineering, Snowflake, and Performance Eng.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/courses">Explore Courses</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>

              {/* Alumni Section */}
              <div className="pt-0">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900mb-0">
                  Our Students Excel At Leading Companies
                </h2>
                <p className="mt-2 text-gray-600">
                  
                </p>
              </div>
            </div>

            {/* Right Column - Video */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-full aspect-video rounded-xl shadow-lg overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  width={800}
                  height={450}
                  alt="Training preview"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Full-width Animation */}
        <div className="w-full overflow-hidden py-6 bg-white/10 relative -mt-12">
          {/* Edge fade effects */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <CompanySlider 
            direction="right-to-left" 
            fullWidth
            logos={[
              { name: "Accenture", src: "/logos/Accenture.PNG", width: 180, height: 60 }, 
              { name: "TCS", src: "/logos/TCS.PNG", width: 120, height: 60},
              { name: "Wipro", src: "/logos/Wipro.PNG", width: 140, height: 60},
              { name: "Cognizant", src: "/logos/Cognizant.PNG", width: 160, height: 60 },
              { name: "Infosys", src: "/logos/Infosys.PNG" , width: 150, height: 60 },
            ]}
            speed="medium" // slow/medium/fast
          />
        </div>
      </div>

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
              <span className="text-3xl font-bold text-primary">{stat.value}</span>
              <span className="mt-2 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses - MODIFIED SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Top Courses</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Industry-relevant courses designed to help you master the latest technologies and advance your career.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* IICS Combo Course Card */}
          <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
            <Image 
              src="/courses/informatica.PNG" 
              width={400} 
              height={225} 
              alt="Informatica IICS COMBO" 
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">Informatica IICS COMBO</h3>
              <p className="mt-2 text-muted-foreground">
                Master IICS, PowerCenter, SQL & Snowflake in 45 days
              </p>
              
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
                <Link href="/courses/IICS-Combo-Live">
                  Enroll Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Azure Data Engineering Course Card */}
          <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
            <Image 
              src="/courses/azure.PNG" 
              width={400} 
              height={225} 
              alt="Azure Data Engineering" 
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">Azure Data Engineering</h3>
              <p className="mt-2 text-muted-foreground">
                Learn to build and optimize data solutions with Microsoft Azure.
              </p>
              
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
                <Link href="/courses/azure-data-engineering">
                  Enroll Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Snowflake Training Course Card */}
          <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
            <Image 
              src="/courses/snowflake.PNG" 
              width={400} 
              height={225} 
              alt="Snowflake Training" 
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">Snowflake Training</h3>
              <p className="mt-2 text-muted-foreground">
                Become proficient in Snowflake's cloud data platform and analytics capabilities.
              </p>
              
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
                <Link href="/courses/snowflake">
                  Enroll Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Performance Engineering Course Card */}
          <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
            <Image 
              src="/courses/performance.PNG" 
              width={400} 
              height={225} 
              alt="Performance Engineering" 
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">Performance Engineering</h3>
              <p className="mt-2 text-muted-foreground">
                Master the techniques to optimize application performance and scalability.
              </p>
              
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
                <Link href="/courses/performance-engineering">
                  Enroll Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* View All Courses Button */}
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>		
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Learning Approach */}
      <LearningApproach />

      {/* Latest Blogs */}
      <LatestBlogs />

      {/* CTA Section */}
      <CTA />
    </div>
  )
}

// Rest of your components remain EXACTLY THE SAME...
const CourseCard = ({ title, description, image, href }: { title: string, description: string, image: string, href: string }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <Image src={image} width={400} height={225} alt={title} className="h-48 w-full object-cover" />
    <CardContent className="p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <Button asChild variant="link" className="mt-4 px-0 text-primary">
        <Link href={href} className="flex items-center">
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </CardContent>
  </Card>
)

const WhyChooseUs = () => (
  <section className="bg-muted py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Rishab Informatica Group</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          We're committed to providing the highest quality training to help you succeed in your tech career.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
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
)

const Testimonials = () => (
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
)

const LearningApproach = () => (
  <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <Image
          src="/learning-approach.jpg"
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
)

const LatestBlogs = () => (
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
)

const CTA = () => (
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
        <Button asChild size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  </section>
)

// Data (unchanged)
const stats = [
  { value: "5000+", label: "Students Trained" },
  { value: "15+", label: "Professional Courses" },
  { value: "98%", label: "Placement Rate" },
  { value: "10+", label: "Years Experience" }
]

const courses = [
  {
     title: "Informatica IICS COMBO",
    description: "Master IICS, PowerCenter, SQL & Snowflake in 45 days",
    image: "/courses/informatica.PNG",
    href: "/courses/IICS-Combo-Live"
  },
  { 
    title: "Azure Data Engineering",
    description: "Learn to build and optimize data solutions with Microsoft Azure.",
    image: "/courses/azure.PNG",
    href: "/courses/azure-data-engineering"
  },
  { 
    title: "Snowflake Training",
    description: "Become proficient in Snowflake's cloud data platform and analytics capabilities.",
    image: "/courses/snowflake.PNG",
    href: "/courses/snowflake"
  },
  {
    title: "Performance Engineering",
    description: "Master the techniques to optimize application performance and scalability.",
    image: "/courses/performance.PNG",
    href: "/courses/performance-engineering"
  }
]

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
]

const learningApproachItems = [
  "Practical, hands-on training with real-world projects",
  "Small batch sizes for personalized attention",
  "Flexible learning options - online and offline",
  "Regular assessments and feedback",
  "Industry-aligned curriculum updated regularly"
]

const blogPosts = [
  {
    title: "The Future of Data Engineering",
    excerpt: "Explore emerging trends shaping data engineering.",
    date: "Apr 15, 2025",
    href: "/blog/future-data-engineering"
  },
  {
    title: "Mastering Informatica IICS",
    excerpt: "Learn the fundamentals of Informatica Intelligent Cloud Services.",
    date: "Apr 10, 2025",
    href: "/blog/mastering-informatica"
  },
  {
    title: "Performance Engineering Best Practices",
    excerpt: "Discover techniques for optimizing application performance.",
    date: "Apr 5, 2025",
    href: "/blog/performance-engineering"
  }
]