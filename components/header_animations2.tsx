"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

// ▼ COMPLETE MENU STRUCTURE (100% preserved) ▼
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
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // ▼ Auto-close mobile menu on route change ▼
  useEffect(() => setMobileMenuOpen(false), [pathname]);

  // ▼ Lock body scroll when mobile menu is open ▼
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [mobileMenuOpen]);

  // ▼ Animation variants (reusable) ▼
  const fadeIn = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const slideIn = {
    hidden: { x: '100%' },
    visible: { x: 0 }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-white shadow-sm border-b"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with hover animation */}
        <motion.div whileHover={{ scale: 1.03 }}>
          <Link href="/" aria-label="Home">
            <Image 
              src="/logo.png" 
              width={160} 
              height={48} 
              alt="Company Logo"
              className="transition-opacity hover:opacity-90 h-12 w-auto"
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {MENU_ITEMS.map((item) => (
            <div 
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md",
                    "hover:text-primary hover:bg-gray-50",
                    pathname === item.href ? "text-primary" : "text-gray-800"
                  )}
                >
                  {item.name}
                </Link>
                {item.subItems && (
                  <motion.span
                    animate={{
                      rotate: activeDropdown === item.name ? 180 : 0
                    }}
                  >
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </motion.span>
                )}
              </motion.div>

              {/* Animated Dropdown */}
              <AnimatePresence>
                {item.subItems && activeDropdown === item.name && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeIn}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
                  >
                    {item.subItems.map((subItem, idx) => (
                      <motion.div
                        key={subItem.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          href={subItem.href}
                          className={cn(
                            "block px-4 py-2.5 text-sm transition-colors",
                            "hover:bg-gray-50 hover:text-primary",
                            pathname === subItem.href ? "text-primary font-medium" : "text-gray-700"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.div 
          className="md:hidden flex items-center gap-2"
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild size="sm" className="bg-primary hover:bg-primary-dark text-white">
            <Link href="https://app.classplusapp.com" target="_blank">
              <Smartphone className="h-4 w-4" />
            </Link>
          </Button>
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={slideIn}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <Image 
                  src="/logo.png" 
                  width={140} 
                  height={42} 
                  alt="Logo"
                  className="opacity-90"
                />
                <motion.button
                  whileHover={{ rotate: 180 }}
                  className="p-1.5 rounded-full hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </motion.button>
              </div>

              {/* Mobile Menu Content */}
              <div className="p-4 overflow-y-auto h-[calc(100vh-80px)] space-y-1">
                {MENU_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="mb-1"
                  >
                    <div className="flex justify-between items-center">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex-1 py-3 px-3 rounded-md hover:bg-gray-50 text-sm font-medium",
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
                          className="p-1.5 hover:bg-gray-50 rounded-md"
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
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="ml-4 overflow-hidden"
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              "block py-2.5 px-3 text-sm rounded-md hover:bg-gray-50",
                              pathname === subItem.href ? "text-primary font-medium" : "text-gray-700"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}