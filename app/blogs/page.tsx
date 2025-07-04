import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Blogs - Rishab Informatica Group",
  description: "Stay updated with the latest trends and insights in the tech industry through our blog.",
}

export default function BlogsPage() {
  return (
    <div className="flex flex-col gap-16 py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Our <span className="text-primary">Blog</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Stay updated with the latest trends and insights in the tech industry.
          </p>
        </div>
      </section>

      {/* Featured Blog */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-muted">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="text-sm font-medium text-primary">Featured Article</div>
             <h2 className="mt-2 text-3xl font-bold tracking-tight">
  How to Land a High-Paying Software Job in 45 Days (2025 Proven Steps)
</h2>

<p className="mt-4 text-muted-foreground">
  🚀 Looking to break into the IT industry fast?  
  Our powerful Combo Courses — including <strong>Informatica IICS Combo</strong>, <strong>Azure Data Eng. Combo</strong>, and <strong>Snowflake Combo</strong> — are designed to make you job-ready in just 45 days.
  <br />
  💼 Whether you're a fresher or from a non-IT background, we've got you covered.
  <br />
  👉 <strong>Click below to follow our proven, step-by-step roadmap</strong> and land your dream software job in 2025!
</p>

<div className="mt-4 flex items-center">
  <Image
    src="/placeholder.svg?height=50&width=50"
    width={50}
    height={50}
    alt="Author"
    className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium">Hari.A</p>
                  <p className="text-sm text-muted-foreground">June , 2025 · 10 min read</p>
                </div>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/blogs/how-to-get-it-job-in-45days">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <Image
                src="/images/get-job-45days.jpeg"
                width={600}
                height={400}
                alt="Featured blog post"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
			 title: "What Will You Learn in the IICS Combo online Training?",
              excerpt: "Dive deep into our 45-day IICS Combo training program covering SQL, PowerCenter, IICS CDI & CAI, Snowflake, mock interviews, and real-time projects—all in one batch. ",
              image: "/images/content.jpeg",
              date: "June 9, 2025",
              author: "Hari.A",
              authorImage: "/placeholder.svg?height=50&width=50",
              readTime: "12 min read",
              href: "/blogs/iics-combo-course-content",
              category: "Informatica", 
			 },          	
			 {															
			  title: "What is ETL and Why It's Important for Modern Companies",
              excerpt: "Discover how modern companies rely on ETL tools to manage massive data pipelines, make smarter decisions, and stay competitive—plus why ETL developers are in high demand.",
              image: "/images/etl.png",
              date: "June 25, 2025",
              author: "Hari.A",
              authorImage: "/placeholder.svg?height=50&width=50",
              readTime: "10 min read",
              href: "/blogs/what-is-etl",
              category: "Informatica", 
			 },          	
			 {			    	  
			  title: "How to move from NON IT to IT Easily & safely ?",
              excerpt: "Learn the fundamentals of Informatica Intelligent Cloud Services in this comprehensive guide.",
              image: "/images/nonit-it.png",
              date: "June 25, 2025",
              author: "Hari.A",
              authorImage: "/placeholder.svg?height=50&width=50",
              readTime: "8 min read",
              href: "/blogs/non-it-to-it-without-coding",
              category: "Informatica",
            },
            {
              title: "Performance Engineering Best Practices",
              excerpt: "Discover the best practices for optimizing application performance and scalability.",
              image: "/placeholder.svg?height=200&width=300",
              date: "Apr 5, 2025",
              author: "Vikram Desai",
              authorImage: "/placeholder.svg?height=50&width=50",
              readTime: "6 min read",
              href: "/blogs/performance-engineering-best-practices",
              category: "Performance",
            },
            {
              title: "Getting Started with Azure Data Factory",
              excerpt:
                "A step-by-step guide to setting up and using Azure Data Factory for your data integration needs.",
              image: "/placeholder.svg?height=200&width=300",
              date: "Mar 28, 2025",
              author: "Rahul Patel",
              authorImage: "/placeholder.svg?height=50&width=50",
              readTime: "7 min read",
              href: "/blogs/getting-started-with-azure-data-factory",
              category: "Azure",
            },
            {
              title: "Snowflake vs. Traditional Data Warehouses",
              excerpt: "A comparison of Snowflake's cloud data platform with traditional data warehouse solutions.",
              image: "/placeholder.svg?height=200&width=300",
              date: "Mar 20, 2025",
              author: "Ananya Singh",
              authorImage: "/placeholder.svg?height=50&width=50",
              readTime: "9 min read",
              href: "/blogs/snowflake-vs-traditional-data-warehouses",
              category: "Snowflake",
            },
            {
              title: "The Role of AI in Modern Data Engineering",
              excerpt: "Explore how artificial intelligence is transforming the field of data engineering.",
              image: "/placeholder.svg?height=200&width=300",
              date: "Mar 15, 2025",
              author: "Rajesh Kumar",
              authorImage: "/placeholder.svg?height=50&width=50",
              readTime: "10 min read",
              href: "/blogs/ai-in-data-engineering",
              category: "AI",
            },
            {
              title: "Building Scalable ETL Pipelines with Informatica",
              excerpt: "Learn how to design and implement scalable ETL pipelines using Informatica IICS.",
              image: "/placeholder.svg?height=200&width=300",
              date: "Mar 10, 2025",
              author: "Priya Sharma",
              authorImage: "/placeholder.svg?height=50&width=50",
              readTime: "8 min read",
              href: "/blogs/scalable-etl-pipelines-informatica",
              category: "Informatica",
            },
            {
              title: "Performance Testing Tools Comparison",
              excerpt: "A comprehensive comparison of the top performance testing tools available in the market.",
              image: "/placeholder.svg?height=200&width=300",
              date: "Mar 5, 2025",
              author: "Vikram Desai",
              authorImage: "/placeholder.svg?height=50&width=50",
              readTime: "7 min read",
              href: "/blogs/performance-testing-tools-comparison",
              category: "Performance",
            },
            {
              title: "Data Governance Best Practices",
              excerpt: "Implement effective data governance strategies to ensure data quality and compliance.",
              image: "/placeholder.svg?height=200&width=300",
              date: "Feb 28, 2025",
              author: "Rahul Patel",
              authorImage: "/placeholder.svg?height=50&width=50",
              readTime: "6 min read",
              href: "/blogs/data-governance-best-practices",
              category: "Data Management",
            },
            {
              title: "Optimizing Snowflake for Cost Efficiency",
              excerpt: "Tips and tricks to optimize your Snowflake implementation for better cost efficiency.",
              image: "/placeholder.svg?height=200&width=300",
              date: "Feb 20, 2025",
              author: "Ananya Singh",
              authorImage: "/placeholder.svg?height=50&width=50",
              readTime: "8 min read",
              href: "/blogs/optimizing-snowflake-cost-efficiency",
              category: "Snowflake",
            },
          ].map((blog, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  width={300}
                  height={200}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  {blog.category}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Image
                    src={blog.authorImage || "/placeholder.svg"}
                    width={50}
                    height={50}
                    alt={blog.author}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="ml-2">
                    <p className="text-xs font-medium">{blog.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {blog.date} · {blog.readTime}
                    </p>
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-bold">{blog.title}</h3>
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
        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Subscribe to Our Newsletter</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Get the latest articles, tutorials, and updates from Rishab Informatica Group delivered straight to your
              inbox.
            </p>
            <form className="mt-8 sm:flex sm:max-w-md sm:mx-auto">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-md border-0 px-4 py-2 text-foreground shadow-sm ring-1 ring-inset ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Button type="submit">Subscribe</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
