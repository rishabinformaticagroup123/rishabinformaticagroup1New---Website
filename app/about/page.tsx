import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "About Us - Rishab Informatica Group",
  description: "Learn about Rishab Informatica Group, our mission, vision, and values.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              About <span className="text-primary">Rishab Informatica Group</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Rishab Informatica Group is a leading IT training institute dedicated to providing high-quality education
              in the fields of data engineering, cloud computing, and performance engineering.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Since our founding, we have trained thousands of professionals who have gone on to work at top companies
              around the world.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=500"
              width={500}
              height={400}
              alt="Rishab Informatica Group office"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="mt-4 text-muted-foreground">
                  To empower individuals with the knowledge and skills needed to excel in the rapidly evolving tech
                  industry through high-quality, industry-relevant training programs.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold">Our Vision</h2>
                <p className="mt-4 text-muted-foreground">
                  To be the most trusted and respected IT training institute, recognized globally for our excellence in
                  education and the success of our students.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Story</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Rishab Informatica Group was founded in 2015 with a simple mission: to provide high-quality IT training that
            actually prepares students for real-world challenges.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            What started as a small training center with just two courses has now grown into a comprehensive institute
            offering a wide range of programs in data engineering, cloud computing, and performance engineering.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Over the years, we have continuously evolved our curriculum to keep pace with industry trends and
            technologies, ensuring that our students are always learning the most relevant and in-demand skills.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              These core values guide everything we do at Rishab Informatica Group.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Excellence",
                description:
                  "We strive for excellence in everything we do, from curriculum development to teaching methods.",
              },
              {
                title: "Innovation",
                description:
                  "We embrace innovation and continuously update our programs to reflect the latest industry trends.",
              },
              {
                title: "Integrity",
                description: "We conduct ourselves with the highest level of integrity and ethical standards.",
              },
              {
                title: "Student Success",
                description: "We measure our success by the success of our students in their careers.",
              },
              {
                title: "Practical Learning",
                description:
                  "We believe in hands-on, practical learning that prepares students for real-world challenges.",
              },
              {
                title: "Continuous Improvement",
                description: "We are committed to continuously improving our programs and teaching methods.",
              },
            ].map((value, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="mt-2 text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Meet the experienced professionals who make Rishab Informatica Group a center of excellence.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Rajesh Kumar",
              role: "Founder & CEO",
              bio: "With over 15 years of experience in the IT industry, Rajesh founded Rishab Informatica Group to bridge the gap between academic learning and industry requirements.",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Priya Sharma",
              role: "Head of Data Engineering",
              bio: "Priya brings 10+ years of experience in data engineering and cloud technologies, having worked at top tech companies before joining our team.",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Vikram Singh",
              role: "Lead Instructor, Informatica",
              bio: "An Informatica certified expert with extensive experience implementing IICS solutions for Fortune 500 companies.",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Ananya Patel",
              role: "Lead Instructor, Performance Engineering",
              bio: "Specializing in application performance optimization, Ananya has helped numerous organizations improve their system efficiency.",
              image: "/placeholder.svg?height=300&width=300",
            },
          ].map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <Image
                src={member.image || "/placeholder.svg"}
                width={300}
                height={300}
                alt={member.name}
                className="h-64 w-full object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Teaching Approach</h2>
              <p className="mt-4 text-muted-foreground">
                At Rishab Informatica Group, we believe in a teaching approach that combines theoretical knowledge with
                practical, hands-on experience.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Industry-aligned curriculum developed by experts",
                  "Small batch sizes for personalized attention",
                  "Hands-on projects based on real-world scenarios",
                  "Regular assessments to track progress",
                  "Flexible learning options - online, offline, and hybrid",
                  "Dedicated placement assistance",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                width={500}
                height={400}
                alt="Teaching approach"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Journey?</h2>
            <p className="mx-auto mt-4 max-w-xl">
              Join Rishab Informatica Group and take the first step towards a successful career in tech.
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
