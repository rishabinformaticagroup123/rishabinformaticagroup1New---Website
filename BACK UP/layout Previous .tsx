"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Image from "next/image"

const MENU_ITEMS = [
  { name: "Home", href: "/" },
  { 
    name: "About", 
    href: "/about",
    subItems: [
      { name: "Our Story", href: "/about/our-story" },
      { name: "Mission & Vision", href: "/about/mission-vision" }
    ]
  },
  { 
    name: "Courses", 
    href: "/courses",
    subItems: [
      { name: "IICS Combo", href: "/courses/iics-combo" },
      { name: "PowerCenter", href: "/courses/powercenter" }
    ]
  },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image 
            src="/logo.png" 
            width={180}
            height={54}
            alt="Rishab Informatics"
            className="h-auto"
          />
        </Link>

        {/* Desktop Menu (Always visible for testing) */}
        <nav className="flex items-center gap-4">
          {MENU_ITEMS.map((item) => (
            <div key={item.name} className="relative">
              <Link
                href={item.href}
                className="px-3 py-2 text-gray-800 hover:text-primary font-medium"
              >
                {item.name}
              </Link>
              {item.subItems && (
                <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="https://app.classplusapp.com" target="_blank">
              Student Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle (Hidden on desktop) */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50">
          <div className="absolute right-0 top-0 h-full w-64 bg-white p-4">
            <div className="flex justify-between items-center mb-4">
              <Image 
                src="/logo.png" 
                width={120}
                height={36}
                alt="Logo"
              />
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-2">
              {MENU_ITEMS.map((item) => (
                <div key={item.name}>
                  <Link 
                    href={item.href}
                    className="block py-2 px-3 hover:bg-gray-100 rounded"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}