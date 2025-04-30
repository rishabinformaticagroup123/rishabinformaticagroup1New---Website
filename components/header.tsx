"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Student Stories", href: "/testimonials" },
  { name: "Blogs", href: "/blogs" },
  { name: "Our Top Courses", href: "/courses" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Privacy Policy", href: "/privacy-policy" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        
        {/* Logo */}
        <div className="flex items-center lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="Rishab Informatica Group Logo"
              className="h-auto w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-6 ml-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors",
                pathname === item.href ? "text-primary font-bold" : "text-muted-foreground hover:text-primary",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild>
            <Link
              href="https://web.classplusapp.com/login?orgCode=zfghut"
              target="_blank"
              rel="noopener noreferrer"
            >
              Student Log in
            </Link>
          </Button>
        </div>

        {/* Mobile Buttons (Download App + Menu) */}
        <div className="flex lg:hidden gap-2">
          {/* New Download App Button - Mobile Only */}
          <Button
            asChild
            variant="outline"
            className="lg:hidden"
          >
            <Link
              href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download App
            </Link>
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div className={cn("lg:hidden", mobileMenuOpen ? "fixed inset-0 z-50" : "hidden")}>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                src="/logo.png"
                width={60}
                height={60}
                alt="Logo"
                className="h-auto w-auto"
              />
            </Link>
            <Button variant="ghost" className="-m-2.5 rounded-md p-2.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>

          {/* Mobile Links */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7",
                      pathname === item.href
                        ? "text-primary font-bold bg-muted"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Contact Us - Mobile */}
              <div className="py-6">
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Contact us
                  </Link>
                </Button>
              </div>

              {/* Download App - Mobile Only (also included in menu for redundancy) */}
              <div className="py-6">
                <Button
                  asChild
                  className="w-full bg-primary text-white font-bold hover:bg-primary/90"
                >
                  <Link
                    href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Download App
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}