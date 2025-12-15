import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Student Stories - Rishab Informatica Group",
  description:
    "Read success stories from our students who have transformed their careers with Rishab Informatica Group.",
}

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col gap-16 py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Student <span className="text-primary">Success Stories</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Hear from our students who have transformed their careers with Rishab Informatica Group.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              content:
                "The Informatica IICS training at Rishab Informatica Group was comprehensive and practical. I landed a job at TCS within a month of completing the course.",
              name: "Priya Sharma",
              role: "Data Integration Specialist, TCS",
              image: "/placeholder.svg?height=80&width=80",
              course: "Informatica IICS COMBO",
            },
            {
              content:
                "The Azure Data Engineering course was exactly what I needed to transition into a cloud role. The hands-on labs and projects were incredibly valuable.",
              name: "Rahul Patel",
              role: "Cloud Data Engineer, Cognizant",
              image: "/placeholder.svg?height=80&width=80",
              course: "Azure Data Engineering",
            },
            {
              content:
                "I took the Snowflake training while working full-time. The flexible schedule and expert instructors made it possible for me to upskill without leaving my job.",
              name: "Ananya Singh",
              role: "Data Analyst, Tech Mahindra",
              image: "/placeholder.svg?height=80&width=80",
              course: "Snowflake Training",
            },
            {
              content:
                "The Performance Engineering course gave me the skills I needed to stand out in interviews. I'm now working at IBM as a Performance Engineer.",
              name: "Vikram Desai",
              role: "Performance Engineer, IBM",
              image: "/placeholder.svg?height=80&width=80",
              course: "Performance Engineering",
            },
            {
              content:
                "After completing the Azure Data Engineering course, I received multiple job offers. The curriculum was up-to-date with the latest industry standards.",
              name: "Arjun Mehta",
              role: "Senior Data Engineer, Infosys",
              image: "/placeholder.svg?height=80&width=80",
              course: "Azure Data Engineering",
            },
            {
              content:
                "The instructors at Rishab Informatica Group are true experts in their fields. They provided practical insights that you won't find in textbooks.",
              name: "Neha Gupta",
              role: "ETL Developer, Wipro",
              image: "/placeholder.svg?height=80&width=80",
              course: "Informatica IICS COMBO",
            },
            {
              content:
                "I was skeptical about online training, but Rishab Informatica Group exceeded my expectations. The interactive sessions and real-time support made learning effective.",
              name: "Sanjay Kumar",
              role: "Database Administrator, HCL",
              image: "/placeholder.svg?height=80&width=80",
              course: "Snowflake Training",
            },
            {
              content:
                "The placement assistance provided by Rishab Informatica Group was exceptional. They helped me prepare for interviews and connected me with potential employers.",
              name: "Meera Patel",
              role: "Performance Test Engineer, Accenture",
              image: "/placeholder.svg?height=80&width=80",
              course: "Performance Engineering",
            },
            {
              content:
                "I switched from a non-IT background to data engineering with the help of Rishab Informatica Group. Their comprehensive training made the transition smooth.",
              name: "Rajiv Malhotra",
              role: "Junior Data Engineer, Deloitte",
              image: "/placeholder.svg?height=80&width=80",
              course: "Azure Data Engineering",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="mt-4">{testimonial.content}</p>
                <div className="mt-6 flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    width={80}
                    height={80}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="mt-1 text-xs text-primary">Course: {testimonial.course}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Video Testimonials</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Watch our students share their experience with Rishab Informatica Group.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-background shadow-sm">
                <div className="aspect-video bg-muted">
                  <Image
                    src="/placeholder.svg?height=200&width=350"
                    width={350}
                    height={200}
                    alt={`Video testimonial ${index}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Student Success Story #{index}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Watch how our training helped this student advance their career.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Statistics */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Placement Statistics</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our students have been placed at top companies around the world.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
            <span className="text-3xl font-bold text-primary">98%</span>
            <span className="mt-2 text-sm text-muted-foreground">Placement Rate</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
            <span className="text-3xl font-bold text-primary">30+</span>
            <span className="mt-2 text-sm text-muted-foreground">Partner Companies</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
            <span className="text-3xl font-bold text-primary">45%</span>
            <span className="mt-2 text-sm text-muted-foreground">Salary Increase</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6 text-center">
            <span className="text-3xl font-bold text-primary">2 Weeks</span>
            <span className="mt-2 text-sm text-muted-foreground">Average Placement Time</span>
          </div>
        </div>
      </section>

      {/* Top Employers */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Top Employers</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our students work at some of the most prestigious companies in the industry.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              "TCS",
              "Tech Mahindra",
              "Cognizant",
              "IBM",
              "Accenture",
              "Infosys",
              "Wipro",
              "HCL",
              "Deloitte",
              "Capgemini",
              "Microsoft",
              "Amazon",
            ].map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="flex h-24 w-full items-center justify-center rounded-lg bg-background p-4 shadow-sm">
                  <span className="font-semibold">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
