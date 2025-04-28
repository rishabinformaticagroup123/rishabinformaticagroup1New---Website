import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Our Courses - Rishab Informatica Group",
  description:
    "Explore our comprehensive range of IT training courses in Informatica IICS, Azure Data Engineering, Snowflake, and Performance Engineering.",
}

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-16 py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Our <span className="text-primary">Courses</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Industry-relevant courses designed to help you master the latest technologies and advance your career.
          </p>
        </div>
      </section>

      {/* Course Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="informatica">Informatica</TabsTrigger>
              <TabsTrigger value="azure">Azure</TabsTrigger>
              <TabsTrigger value="snowflake">Snowflake</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Informatica IICS COMBO",
                  description: "Master Informatica Intelligent Cloud Services with our comprehensive training program.",
                  image: "/placeholder.svg?height=200&width=300",
                  duration: "12 Weeks",
                  level: "Beginner to Advanced",
                  price: "$999",
                  href: "https://www.rishabinformaticagroup.com/courses/498547",
                  category: "informatica",
                },
                {
                  title: "Azure Data Engineering",
                  description: "Learn to build and optimize data solutions with Microsoft Azure.",
                  image: "/placeholder.svg?height=200&width=300",
                  duration: "10 Weeks",
                  level: "Intermediate",
                  price: "$899",
                  href: "/courses/azure-data-engineering",
                  category: "azure",
                },
                {
                  title: "Snowflake Training",
                  description: "Become proficient in Snowflake's cloud data platform and analytics capabilities.",
                  image: "/placeholder.svg?height=200&width=300",
                  duration: "8 Weeks",
                  level: "Intermediate",
                  price: "$799",
                  href: "/courses/snowflake",
                  category: "snowflake",
                },
                {
                  title: "Performance Engineering",
                  description: "Master the techniques to optimize application performance and scalability.",
                  image: "/placeholder.svg?height=200&width=300",
                  duration: "10 Weeks",
                  level: "Advanced",
                  price: "$899",
                  href: "/courses/performance-engineering",
                  category: "performance",
                },
                {
                  title: "Informatica PowerCenter",
                  description: "Learn Informatica PowerCenter for ETL development and data integration.",
                  image: "/placeholder.svg?height=200&width=300",
                  duration: "8 Weeks",
                  level: "Beginner to Intermediate",
                  price: "$699",
                  href: "/courses/informatica-powercenter",
                  category: "informatica",
                },
                {
                  title: "Azure Data Factory",
                  description: "Master Azure Data Factory for cloud-based data integration and ETL processes.",
                  image: "/placeholder.svg?height=200&width=300",
                  duration: "6 Weeks",
                  level: "Intermediate",
                  price: "$599",
                  href: "/courses/azure-data-factory",
                  category: "azure",
                },
                {
                  title: "Snowflake Administration",
                  description: "Learn to administer and manage Snowflake cloud data platform efficiently.",
                  image: "/placeholder.svg?height=200&width=300",
                  duration: "6 Weeks",
                  level: "Advanced",
                  price: "$699",
                  href: "/courses/snowflake-administration",
                  category: "snowflake",
                },
                {
                  title: "Load Testing with JMeter",
                  description: "Master load testing techniques using Apache JMeter for web applications.",
                  image: "/placeholder.svg?height=200&width=300",
                  duration: "4 Weeks",
                  level: "Intermediate",
                  price: "$499",
                  href: "/courses/load-testing-jmeter",
                  category: "performance",
                },
                {
                  title: "Informatica MDM",
                  description: "Learn Master Data Management concepts and implementation with Informatica MDM.",
                  image: "/placeholder.svg?height=200&width=300",
                  duration: "8 Weeks",
                  level: "Advanced",
                  price: "$799",
                  href: "/courses/informatica-mdm",
                  category: "informatica",
                },
              ].map((course, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      width={300}
                      height={200}
                      alt={course.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{course.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Duration:</span> {course.duration}
                      </div>
                      <div>
                        <span className="font-medium">Level:</span> {course.level}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-bold">{course.price}</span>
                      <Button asChild>
                        <Link href={course.href}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          {["informatica", "azure", "snowflake", "performance"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Informatica IICS COMBO",
                    description:
                      "Master Informatica Intelligent Cloud Services with our comprehensive training program.",
                    image: "/placeholder.svg?height=200&width=300",
                    duration: "12 Weeks",
                    level: "Beginner to Advanced",
                    price: "$999",
                    href: "/courses/informatica-iics",
                    category: "informatica",
                  },
                  {
                    title: "Azure Data Engineering",
                    description: "Learn to build and optimize data solutions with Microsoft Azure.",
                    image: "/placeholder.svg?height=200&width=300",
                    duration: "10 Weeks",
                    level: "Intermediate",
                    price: "$899",
                    href: "/courses/azure-data-engineering",
                    category: "azure",
                  },
                  {
                    title: "Snowflake Training",
                    description: "Become proficient in Snowflake's cloud data platform and analytics capabilities.",
                    image: "/placeholder.svg?height=200&width=300",
                    duration: "8 Weeks",
                    level: "Intermediate",
                    price: "$799",
                    href: "/courses/snowflake",
                    category: "snowflake",
                  },
                  {
                    title: "Performance Engineering",
                    description: "Master the techniques to optimize application performance and scalability.",
                    image: "/placeholder.svg?height=200&width=300",
                    duration: "10 Weeks",
                    level: "Advanced",
                    price: "$899",
                    href: "/courses/performance-engineering",
                    category: "performance",
                  },
                  {
                    title: "Informatica PowerCenter",
                    description: "Learn Informatica PowerCenter for ETL development and data integration.",
                    image: "/placeholder.svg?height=200&width=300",
                    duration: "8 Weeks",
                    level: "Beginner to Intermediate",
                    price: "$699",
                    href: "/courses/informatica-powercenter",
                    category: "informatica",
                  },
                  {
                    title: "Azure Data Factory",
                    description: "Master Azure Data Factory for cloud-based data integration and ETL processes.",
                    image: "/placeholder.svg?height=200&width=300",
                    duration: "6 Weeks",
                    level: "Intermediate",
                    price: "$599",
                    href: "/courses/azure-data-factory",
                    category: "azure",
                  },
                  {
                    title: "Snowflake Administration",
                    description: "Learn to administer and manage Snowflake cloud data platform efficiently.",
                    image: "/placeholder.svg?height=200&width=300",
                    duration: "6 Weeks",
                    level: "Advanced",
                    price: "$699",
                    href: "/courses/snowflake-administration",
                    category: "snowflake",
                  },
                  {
                    title: "Load Testing with JMeter",
                    description: "Master load testing techniques using Apache JMeter for web applications.",
                    image: "/placeholder.svg?height=200&width=300",
                    duration: "4 Weeks",
                    level: "Intermediate",
                    price: "$499",
                    href: "/courses/load-testing-jmeter",
                    category: "performance",
                  },
                  {
                    title: "Informatica MDM",
                    description: "Learn Master Data Management concepts and implementation with Informatica MDM.",
                    image: "/placeholder.svg?height=200&width=300",
                    duration: "8 Weeks",
                    level: "Advanced",
                    price: "$799",
                    href: "/courses/informatica-mdm",
                    category: "informatica",
                  },
                ]
                  .filter((course) => course.category === category)
                  .map((course, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          width={300}
                          height={200}
                          alt={course.title}
                          className="h-48 w-full object-cover"
                        />
                        <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold">{course.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Duration:</span> {course.duration}
                          </div>
                          <div>
                            <span className="font-medium">Level:</span> {course.level}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xl font-bold">{course.price}</span>
                          <Button asChild>
                            <Link href={course.href}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Featured Course */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="text-sm font-medium text-primary">Featured Course</div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Informatica IICS COMBO</h2>
              <p className="mt-4 text-muted-foreground">
                Our most comprehensive Informatica training program covers all aspects of Informatica Intelligent Cloud
                Services, including Cloud Data Integration, Cloud Application Integration, and more.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Learn from industry experts with real-world experience",
                  "Hands-on projects and case studies",
                  "24/7 access to learning resources",
                  "Dedicated placement assistance",
                  "Industry-recognized certification",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/courses/informatica-iics">
                    Explore Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                width={500}
                height={400}
                alt="Informatica IICS COMBO"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Benefits */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Our Courses</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our courses are designed to provide you with the skills and knowledge needed to succeed in today's
            competitive job market.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Industry-Relevant Curriculum",
              description:
                "Our courses are designed in collaboration with industry experts to ensure you learn the most relevant skills.",
            },
            {
              title: "Experienced Instructors",
              description: "Learn from instructors with years of real-world experience in their respective fields.",
            },
            {
              title: "Hands-On Learning",
              description:
                "Gain practical experience through hands-on projects, case studies, and real-world scenarios.",
            },
            {
              title: "Placement Assistance",
              description:
                "Get help with resume building, interview preparation, and job placement after course completion.",
            },
          ].map((benefit, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Learning Formats */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Flexible Learning Formats</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Choose the learning format that best fits your schedule and learning style.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Online Live",
                description: "Attend live online sessions with instructors and interact in real-time.",
                features: [
                  "Live instructor-led sessions",
                  "Real-time interaction",
                  "Recorded sessions for review",
                  "24/7 access to learning materials",
                ],
              },
              {
                title: "Self-Paced",
                description: "Learn at your own pace with pre-recorded video lessons and exercises.",
                features: [
                  "Study at your own pace",
                  "Pre-recorded video lessons",
                  "Interactive exercises",
                  "Email support from instructors",
                ],
              },
              {
                title: "Hybrid",
                description: "Combine live sessions with self-paced learning for maximum flexibility.",
                features: [
                  "Weekend live sessions",
                  "Self-paced learning during weekdays",
                  "Personalized learning path",
                  "Regular check-ins with instructors",
                ],
              },
            ].map((format, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{format.title}</h3>
                  <p className="mt-2 text-muted-foreground">{format.description}</p>
                  <ul className="mt-4 space-y-2">
                    {format.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Find answers to common questions about our courses and training programs.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              question: "What are the prerequisites for your courses?",
              answer:
                "Prerequisites vary by course. Basic courses typically require only basic computer knowledge, while advanced courses may require specific technical knowledge. Check individual course pages for details.",
            },
            {
              question: "Do you offer placement assistance?",
              answer:
                "Yes, we offer comprehensive placement assistance including resume building, interview preparation, and connections with our industry partners for job opportunities.",
            },
            {
              question: "Are there any discounts available?",
              answer:
                "We offer early bird discounts, group enrollment discounts, and special offers for students and alumni. Contact our admissions team for current promotions.",
            },
            {
              question: "What is your refund policy?",
              answer:
                "We offer a 7-day money-back guarantee for most courses. If you're not satisfied with the course within the first week, you can request a full refund. See our refund policy page for details.",
            },
            {
              question: "How long do I have access to course materials?",
              answer:
                "You will have lifetime access to all course materials, including updates to the curriculum as technologies evolve.",
            },
            {
              question: "Do you provide certificates upon completion?",
              answer:
                "Yes, all students receive a certificate of completion after successfully finishing the course and passing the final assessment.",
            },
          ].map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Advance Your Career?</h2>
            <p className="mx-auto mt-4 max-w-xl">
              Enroll in one of our courses today and take the first step towards a successful career in tech.
            </p>
            <div className="mt-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
