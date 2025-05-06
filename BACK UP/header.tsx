"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Image from "next/image"

interface MenuItem {
  name: string
  href: string
  subItems?: {
    name: string
    href: string
  }[]
}

const FULL_MENU_ITEMS: MenuItem[] = [
  { name: "Home", href: "/" },
  { 
    name: "About", 
    href: "/about",
    subItems: [
      { name: "Our Story", href: "/about/our-story" },
      { name: "Mission & Vision", href: "/about/mission-vision" },
      { name: "Contact Us", href: "/about/contact" }
    ]
  },
  // ... (keep your existing menu items) ...
]

const PRIORITY_MENU_ITEMS = FULL_MENU_ITEMS.slice(0, 5)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Improved scroll lock with cleanup
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : originalStyle
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [mobileMenuOpen])

  // Memoized dropdown handlers
  const handleDropdownEnter = useCallback((name: string) => {
    setActiveDropdown(name)
  }, [])

  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-900">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with priority loading */}
        <Link href="/" className="flex-shrink-0" aria-label="Home">
          <Image 
            src="/logo.png" 
            width={120}
            height={40}
            alt="Company Logo"
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {PRIORITY_MENU_ITEMS.map((item) => (
            <div 
              key={item.name}
              className="relative group"
              onMouseEnter={() => handleDropdownEnter(item.name)}
              onMouseLeave={handleDropdownLeave}
            >
              <div className="flex items-center gap-1">
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium whitespace-nowrap transition-colors",
                    "hover:text-primary dark:hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {item.name}
                </Link>
                {item.subItems && (
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                )}
              </div>

              {item.subItems && activeDropdown === item.name && (
                <div 
                  className={cn(
                    "absolute left-0 top-full mt-1 w-56 rounded-md shadow-lg z-50",
                    "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700",
                    "animate-in fade-in-50"
                  )}
                >
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={cn(
                        "block px-4 py-2 text-sm transition-colors",
                        "hover:bg-gray-50 dark:hover:bg-gray-700",
                        pathname === subItem.href ? "text-primary" : "text-gray-700 dark:text-gray-300"
                      )}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* More dropdown */}
          {FULL_MENU_ITEMS.length > 5 && (
            <div 
              className="relative group"
              onMouseEnter={() => handleDropdownEnter("More")}
              onMouseLeave={handleDropdownLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                More
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {activeDropdown === "More" && (
                <div className="absolute left-0 top-full mt-1 w-56 rounded-md shadow-lg z-50 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  {FULL_MENU_ITEMS.slice(5).map((item) => (
                    <div key={item.name} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {item.name}
                      </Link>
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-6 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="hover:bg-gray-50 dark:hover:bg-gray-800">
            <Link href="https://web.classplusapp.com/login?orgCode=zfghut" target="_blank" rel="noopener">
              Student Login
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="https://zfghut.on-app.in/app/home" target="_blank" rel="noopener">
              <Smartphone className="mr-1 h-4 w-4" />
              Download App
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="https://zfghut.on-app.in/app/home" target="_blank" rel="noopener">
              <Smartphone className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        open={mobileMenuOpen} 
        items={FULL_MENU_ITEMS} 
        onClose={() => setMobileMenuOpen(false)} 
        pathname={pathname}
      />
    </header>
  )
}

interface MobileMenuProps {
  open: boolean
  items: MenuItem[]
  onClose: () => void
  pathname: string | null
}

function MobileMenu({ open, items, onClose, pathname }: MobileMenuProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  if (!open) return null

  return (
    <div 
      className="md:hidden fixed inset-0 z-50 bg-black/50 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg animate-in slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <Image 
            src="/logo.png" 
            width={120}
            height={40}
            alt="Company Logo"
            className="h-10 w-auto"
          />
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          {items.map((item) => (
            <div key={item.name} className="mb-1">
              <div className="flex justify-between items-center">
                {item.subItems ? (
                  <button
                    className="flex-1 text-left py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex-1 py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                )}
                {item.subItems && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    activeDropdown === item.name && "rotate-180"
                  )} />
                )}
              </div>

              {item.subItems && activeDropdown === item.name && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={cn(
                        "block py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-sm",
                        pathname === subItem.href && "text-primary"
                      )}
                      onClick={onClose}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-4 space-y-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="https://web.classplusapp.com/login" target="_blank" rel="noopener" onClick={onClose}>
                Student Login
              </Link>
            </Button>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="https://zfghut.on-app.in/app/home" target="_blank" rel="noopener" onClick={onClose}>
                <Smartphone className="mr-2 h-4 w-4" />
                Download App
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}