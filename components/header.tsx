"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Smartphone } from "lucide-react"
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
        
        {/* Logo - Consistent Size */}
        <div className="flex items-center lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="Rishab Informatica Group Logo"
              className="h-auto w-auto"
              priority
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

        {/* Mobile Buttons */}
        <div className="flex lg:hidden gap-2">
          {/* Install Our App Button */}
          <Button
            asChild
            className="lg:hidden bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
          >
            <Link
              href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Smartphone className="mr-2 h-4 w-4" />
              Install Our App
            </Link>
          </Button>
          
          {/* Mobile Menu Toggle - Fixed */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu - Fixed */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-50 transition-all duration-300",
        mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <Image
                src="/logo.png"
                width={40}
                height={40}
                alt="Logo"
                className="h-auto w-auto"
              />
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-4 py-2 text-base font-medium",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <Button asChild className="w-full">
                <Link 
                  href="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact us
                </Link>
              </Button>
              <Button
                asChild
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8]"
              >
                <Link
                  href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  Install Our App
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}