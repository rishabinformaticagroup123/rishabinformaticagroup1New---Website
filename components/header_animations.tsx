"use client"
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

// 2. Lazy-loaded motion components (SECOND)
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false, loading: () => <div className="contents" /> } // Added fallback
);
const MotionHeader = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.header),
  { ssr: false, loading: () => <header className="contents" /> }
);

// ▼ Existing component imports (AFTER animation imports) ▼
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Image from "next/image"

// ▼ YOUR COMPLETE MENU STRUCTURE (100% preserved) ▼
const MENU_ITEMS = [
  { 
    name: "Home", 
    href: "/" 
  },
  { 
    name: "About", 
    href: "/about",
    subItems: [
      { name: "Our Story", href: "/about/our-story" },
      { name: "Mission & Vision", href: "/about/mission-vision" },
      { name: "Contact Us", href: "/about/contact" }
    ]
  },
  { 
    name: "Courses", 
    href: "/courses",
    subItems: [
      { name: "IICS Combo", href: "/courses/iics-combo" },
      { name: "IICS", href: "/courses/iics" },
      { name: "PowerCenter", href: "/courses/powercenter" },
      { name: "SQL", href: "/courses/sql" },
      { name: "Snowflake", href: "/courses/snowflake" },
      { name: "Azure", href: "/courses/azure" },
      { name: "Talend", href: "/courses/talend" },
      { name: "Performance Engineering", href: "/courses/performance-engineering" }
    ]
  },
  { 
    name: "Blog", 
    href: "/blog" 
  },
  { 
    name: "Interview Q&A", 
    href: "/interview-qa",
    subItems: [
      { name: "PowerCenter", href: "/interview-qa/powercenter" },
      { name: "IICS", href: "/interview-qa/iics" },
      { name: "SQL", href: "/interview-qa/sql" },
      { name: "Snowflake", href: "/interview-qa/snowflake" }
    ]
  },
  { 
    name: "Study Materials", 
    href: "/study-materials",
    subItems: [
      { name: "PowerCenter", href: "/study-materials/powercenter" },
      { name: "IICS", href: "/study-materials/iics" },
      { name: "SQL", href: "/study-materials/sql" },
      { name: "Snowflake", href: "/study-materials/snowflake" }
    ]
  },
  { 
    name: "Internship", 
    href: "/internship",
    subItems: [
      { name: "Internship Details", href: "/internship/details" },
      { name: "Real Projects", href: "/internship/real-projects" }
    ]
  },
  { 
    name: "Testimonials", 
    href: "/testimonials",
    subItems: [
      { name: "Student Success Stories", href: "/testimonials/success-stories" }
    ]
  }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // ▼ PRESERVED LOGIC ▼
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* ▼ PRESERVED LOGO ▼ */}
        <Link href="/" className="flex-shrink-0" aria-label="Home">
          <Image 
            src="/logo.png" 
            width={160} 
            height={48} 
            alt="Company Logo" 
            priority
            className="transition-opacity hover:opacity-90 h-12 w-auto"
          />
        </Link>

        {/* ========== ENHANCED DESKTOP NAV ========== */}
        <nav className="hidden md:flex items-center gap-1">
          {MENU_ITEMS.map((item) => (
            <div 
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-1">
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md",
                    "hover:text-primary hover:bg-gray-50",
                    pathname === item.href ? "text-primary" : "text-gray-800"
                  )}
                >
                  {item.name}
                </Link>
                {item.subItems && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeDropdown === item.name ? "rotate-180 text-primary" : "text-gray-500"
                  )} />
                )}
              </div>

              {/* ▼ ENHANCED DROPDOWN ANIMATION ▼ */}
              {item.subItems && (
                <div 
                  className={cn(
                    "absolute left-0 top-full mt-1 w-56 origin-top",
                    "bg-white rounded-lg shadow-lg border border-gray-100",
                    "transition-all duration-200 ease-out",
                    "transform-gpu", // Hardware acceleration
                    activeDropdown === item.name 
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                  )}
                >
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-colors duration-150",
                        "hover:bg-gray-50 hover:text-primary",
                        pathname === subItem.href ? "text-primary font-medium" : "text-gray-700"
                      )}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* ▼ PRESERVED ACTION BUTTONS ▼ */}
        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="ghost" className="hover:bg-gray-50">
            <Link href="https://app.classplusapp.com" target="_blank" className="text-sm font-medium">
              Student Login
            </Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary-dark text-white">
            <Link href="/contact" className="text-sm font-medium">
              Contact
            </Link>
          </Button>
        </div>

        {/* ========== ENHANCED MOBILE MENU ========== */}
        <div className="md:hidden flex items-center gap-2">
          <Button asChild size="sm" className="bg-primary hover:bg-primary-dark text-white">
            <Link 
              href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral" 
              target="_blank"
            >
              <Smartphone className="h-4 w-4" />
            </Link>
          </Button>
          <button
            className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-150"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* ▼ ENHANCED MOBILE OVERLAY ▼ */}
      {mobileMenuOpen && (
        <div 
          className={cn(
            "md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
            "transition-opacity duration-300 ease-in-out",
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className={cn(
              "absolute right-0 top-0 h-full w-80 bg-white shadow-xl",
              "transition-transform duration-300 ease-in-out transform-gpu",
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <Image 
                src="/logo.png" 
                width={140} 
                height={42} 
                alt="Company Logo"
                className="opacity-90"
              />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-150"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
              {MENU_ITEMS.map((item) => (
                <div key={item.name} className="mb-1">
                  <div className="flex justify-between items-center">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex-1 py-3 px-3 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors duration-150",
                        pathname === item.href ? "text-primary" : "text-gray-800"
                      )}
                    >
                      {item.name}
                    </Link>
                    {item.subItems && (
                      <button
                        onClick={() => setActiveDropdown(
                          activeDropdown === item.name ? null : item.name
                        )}
                        className="p-1.5 hover:bg-gray-50 rounded-md transition-colors duration-150"
                        aria-label={`Toggle ${item.name} menu`}
                      >
                        <ChevronDown className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          activeDropdown === item.name && "rotate-180"
                        )} />
                      </button>
                    )}
                  </div>

                  {item.subItems && activeDropdown === item.name && (
                    <div 
                      className={cn(
                        "ml-4 mt-1 space-y-1",
                        "animate-in fade-in-50 slide-in-from-top-2 duration-200"
                      )}
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={cn(
                            "block py-2.5 px-3 text-sm rounded-md hover:bg-gray-50 transition-colors duration-150",
                            pathname === subItem.href ? "text-primary font-medium" : "text-gray-700"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 space-y-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href="https://app.classplusapp.com" target="_blank">
                    Student Login
                  </Link>
                </Button>
                <Button asChild className="w-full bg-primary hover:bg-primary-dark">
                  <Link href="/contact">
                    Contact
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}