import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, CheckCircle, GraduationCap, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import TestimonialSlider from "@/components/testimonial-slider"
import CompanySlider from "@/components/company-slider"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Combined Hero + Students Work Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        {/* Compact Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                Advance Your <span className="text-primary">Tech Career</span> With Expert Training
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Rishab Informatica Group offers industry-leading courses in Informatica IICS, Azure Data Engineering,
                Snowflake, and Performance Engineering.
              </p>
              <div className="mt-6 flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/courses">Explore Courses</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            
            {/* YouTube-style Video Container */}
            <div className="flex items-center justify-center">
              <div className="w-full aspect-video rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  width={800}
                  height={450}
                  alt="Training preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Students Work At Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Our Students Work At</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              Our graduates have been placed at top companies around the world.
            </p>
          </div>
          <div className="mt-8">
            <CompanySlider />
          </div>
          {/* Subtle Divider */}
          <div className="mx-auto w-24 h-1 bg-primary/20 rounded-full my-6"></div>
        </section>
      </div>

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
            <span className="text-3xl font-bold text-primary">5000+</span>
            <span className="mt-2 text-sm text-muted-foreground">Students Trained</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
            <span className="text-3xl font-bold text-primary">15+</span>
            <span className="mt-2 text-sm text-muted-foreground">Professional Courses</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
            <span className="text-3xl font-bold text-primary">98%</span>
            <span className="mt-2 text-sm text-muted-foreground">Placement Rate</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
            <span className="text-3xl font-bold text-primary">10+</span>
            <span className="mt-2 text-sm text-muted-foreground">Years Experience</span>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Top Courses</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Industry-relevant courses designed to help you master the latest technologies and advance your career.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Informatica IICS COMBO",
              description: "Master Informatica Intelligent Cloud Services with our comprehensive training program.",
              image: "/placeholder.svg?height=200&width=300",
              href: "/courses/informatica-iics",
            },
            {
              title: "Azure Data Engineering",
              description: "Learn to build and optimize data solutions with Microsoft Azure.",
              image: "/placeholder.svg?height=200&width=300",
              href: "/courses/azure-data-engineering",
            },
            {
              title: "Snowflake Training",
              description: "Become proficient in Snowflake's cloud data platform and analytics capabilities.",
              image: "/placeholder.svg?height=200&width=300",
              href: "/courses/snowflake",
            },
            {
              title: "Performance Engineering",
              description: "Master the techniques to optimize application performance and scalability.",
              image: "/placeholder.svg?height=200&width=300",
              href: "/courses/performance-engineering",
            },
          ].map((course, index) => (
            <Card key={index} className="overflow-hidden">
              <Image
                src={course.image || "/placeholder.svg"}
                width={300}
                height={200}
                alt={course.title}
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
                <Button asChild variant="link" className="mt-4 px-0">
                  <Link href={course.href} className="flex items-center">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Rishab Informatica Group</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We're committed to providing the highest quality training to help you succeed in your tech career.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <GraduationCap className="h-10 w-10 text-primary" />,
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of real-world experience.",
              },
              {
                icon: <BookOpen className="h-10 w-10 text-primary" />,
                title: "Comprehensive Curriculum",
                description: "Our courses cover both theoretical concepts and practical applications.",
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Placement Assistance",
                description: "Get help with resume building, interview preparation, and job placement.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg bg-background p-6 text-center shadow-sm"
              >
                {feature.icon}
                <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Student Success Stories</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Hear what our students have to say about their experience with Rishab Informatica Group.
            </p>
          </div>
          <div className="mt-12">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=500"
              width={500}
              height={400}
              alt="Learning approach"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Learning Approach</h2>
            <p className="mt-4 text-muted-foreground">
              We believe in a hands-on, practical approach to learning that prepares you for real-world challenges.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Practical, hands-on training with real-world projects",
                "Small batch sizes for personalized attention",
                "Flexible learning options - online, offline, and hybrid",
                "Regular assessments and feedback",
                "Industry-aligned curriculum updated regularly",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest from Our Blog</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Stay updated with the latest trends and insights in the tech industry.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "The Future of Data Engineering in 2025",
              excerpt: "Explore the emerging trends and technologies shaping the future of data engineering.",
              image: "/placeholder.svg?height=200&width=300",
              date: "Apr 15, 2025",
              href: "/blogs/future-of-data-engineering",
            },
            {
              title: "Mastering Informatica IICS: A Beginner's Guide",
              excerpt: "Learn the fundamentals of Informatica Intelligent Cloud Services in this comprehensive guide.",
              image: "/placeholder.svg?height=200&width=300",
              date: "Apr 10, 2025",
              href: "/blogs/mastering-informatica-iics",
            },
            {
              title: "Performance Engineering Best Practices",
              excerpt: "Discover the best practices for optimizing application performance and scalability.",
              image: "/placeholder.svg?height=200&width=300",
              date: "Apr 5, 2025",
              href: "/blogs/performance-engineering-best-practices",
            },
          ].map((blog, index) => (
            <Card key={index} className="overflow-hidden">
              <Image
                src={blog.image || "/placeholder.svg"}
                width={300}
                height={200}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground">{blog.date}</div>
                <h3 className="mt-2 text-xl font-bold">{blog.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{blog.excerpt}</p>
                <Button asChild variant="link" className="mt-4 px-0">
                  <Link href={blog.href} className="flex items-center">
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
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Advance Your Career?</h2>
            <p className="mx-auto mt-4 max-w-xl">
              Join thousands of successful professionals who have transformed their careers with Rishab Informatica
              Group.
            </p>
            <div className="mt-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href="/courses">Explore Courses</Link>
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