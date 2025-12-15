"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Image from "next/image"

const FULL_MENU_ITEMS = [
  // ... (keep your existing menu items array) ...
];

const PRIORITY_MENU_ITEMS = FULL_MENU_ITEMS.slice(0, 5)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileMenuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image 
            src="/logo.png" 
            width={120} 
            height={40} 
            alt="Logo" 
            priority
          />
        </Link>

        {/* Desktop Navigation - FIXED VERSION */}
        <nav className={cn(
          "hidden md:flex items-center gap-4",
          "!visible md:!flex", // Critical fix
          "bg-white dark:bg-background" // Ensures contrast
        )}>
          {PRIORITY_MENU_ITEMS.map((item) => (
            <div 
              key={item.name} 
              className="group relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-1 hover-transition">
                <span className={cn(
                  "text-sm font-medium whitespace-nowrap hover:text-primary dark:hover:text-primary",
                  pathname === item.href && "text-primary"
                )}>
                  {item.name}
                </span>
                {item.subItems && (
                  <ChevronDown className="h-4 w-4 dropdown-chevron" />
                )}
              </div>

              {item.subItems && activeDropdown === item.name && (
                <div className={cn(
                  "absolute left-0 top-full mt-1 w-56",
                  "bg-white dark:bg-card rounded-md shadow-lg",
                  "z-50 animate-dropdown",
                  "!block !opacity-100" // Dropdown stability
                )}>
                  <div className="py-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-accent hover-transition"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {FULL_MENU_ITEMS.length > 5 && (
            <div 
              className="group relative"
              onMouseEnter={() => setActiveDropdown("More")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-1 hover-transition">
                <span className="text-sm font-medium whitespace-nowrap hover:text-primary dark:hover:text-primary">
                  More
                </span>
                <ChevronDown className="h-4 w-4 dropdown-chevron" />
              </div>

              {activeDropdown === "More" && (
                <div className={cn(
                  "absolute left-0 top-full mt-1 w-56",
                  "bg-white dark:bg-card rounded-md shadow-lg",
                  "z-50 animate-dropdown",
                  "!block !opacity-100" // Dropdown stability
                )}>
                  <div className="py-1">
                    {FULL_MENU_ITEMS.slice(5).map((item) => (
                      <div key={item.name">
                        <Link
                          href={item.href}
                          className="block px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-accent hover-transition"
                        >
                          {item.name}
                        </Link>
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-6 py-2 text-sm hover:bg-gray-50 dark:hover:bg-accent hover-transition"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="hover-transition">
            <Link
              href="https://web.classplusapp.com/login?orgCode=zfghut"
              target="_blank"
              rel="noopener noreferrer"
            >
              Student Login
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 hover-transition">
            <Link
              href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Smartphone className="mr-1 h-4 w-4" />
              Download App
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 hover-transition"
          >
            <Link
              href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Smartphone className="mr-1 h-4 w-4" />
              Download
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="hover-transition"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu - FIXED VERSION */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50"> {/* Removed md:hidden */}
          <MobileMenu 
            items={FULL_MENU_ITEMS} 
            onClose={() => setMobileMenuOpen(false)} 
            pathname={pathname}
          />
        </div>
      )}
    </header>
  )
}

// MobileMenu component remains exactly the same as your original
function MobileMenu({ items, onClose, pathname }) {
  const [activeDropdown, setActiveDropdown] = useState(null)
  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black/50 animate-in fade-in">
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-card shadow-lg mobile-menu-slide">
        <div className="flex justify-between items-center p-4 border-b dark:border-accent">
          <Image 
            src="/logo.png" 
            width={120} 
            height={40} 
            alt="Logo"
          />
          <Button variant="ghost" size="icon" onClick={onClose} className="hover-transition">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          {items.map((item) => (
            <div key={item.name} className="mb-1">
              <div className="flex justify-between items-center hover-transition">
                {item.subItems ? (
                  <button
                    className="flex-1 text-left py-2 px-3 hover:bg-gray-50 dark:hover:bg-accent rounded-md"
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex-1 py-2 px-3 hover:bg-gray-50 dark:hover:bg-accent rounded-md"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                )}
                {item.subItems && (
                  <ChevronDown className={cn(
                    "h-4 w-4 dropdown-chevron",
                    activeDropdown === item.name && "rotate-180"
                  )} />
                )}
              </div>

              {item.subItems && activeDropdown === item.name && (
                <div className="ml-4 mt-1 space-y-1 animate-in fade-in">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block py-2 px-3 hover:bg-gray-50 dark:hover:bg-accent rounded-md text-sm hover-transition"
                      onClick={onClose}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Button asChild variant="outline" className="w-full mt-4 hover-transition">
            <Link
              href="https://web.classplusapp.com/login?orgCode=zfghut"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              Student Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}