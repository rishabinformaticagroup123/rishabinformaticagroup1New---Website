"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Smartphone, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

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

  // Auto-close mobile menu on navigation
  useEffect(() => setMobileMenuOpen(false), [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white shadow-sm border-b will-change-transform"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with enhanced interaction */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
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
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
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
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </motion.span>
                )}
              </motion.div>

              {/* Enhanced Dropdown */}
              <AnimatePresence>
                {item.subItems && activeDropdown === item.name && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, y: -15 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.1
                        }
                      }
                    }}
                    className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden will-change-transform"
                  >
                    {item.subItems.map((subItem, i) => (
                      <motion.div
                        key={subItem.href}
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: { opacity: 1, x: 0 }
                        }}
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

        {/* Desktop Student Login Button (Right Side) */}
        <motion.div 
          className="hidden md:flex"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button asChild className="bg-primary hover:bg-primary-dark text-white">
            <Link 
              href="https://login.rishabinformaticagroup.com/login" 
              target="_blank"
              className="flex items-center gap-2"
            >
              <span>Student Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6"/>
                <path d="M10 14 21 3"/>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              </svg>
            </Link>
          </Button>
        </motion.div>

        {/* Mobile Menu Button with App Download */}
        <div className="md:hidden flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="sm" className="bg-primary hover:bg-primary-dark text-white">
              <Link 
                href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral" 
                target="_blank"
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                <span>App</span>
              </Link>
            </Button>
          </motion.div>
          <motion.button
            whileHover={{ rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
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
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 400,
                bounce: 0.25
              }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl will-change-transform"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex justify-between items-center">
                <Image 
                  src="/logo.png" 
                  width={140} 
                  height={42} 
                  alt="Logo"
                  className="opacity-90"
                />
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-full hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </motion.button>
              </div>

              <div className="p-4 overflow-y-auto h-[calc(100vh-80px)] space-y-1">
                {MENU_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
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
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
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
                        </motion.button>
                      )}
                    </div>

                    {item.subItems && activeDropdown === item.name && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="ml-4 overflow-hidden"
                        transition={{ type: "spring", damping: 20 }}
                      >
                        {item.subItems.map((subItem, i) => (
                          <motion.div
                            key={subItem.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Link
                              href={subItem.href}
                              className={cn(
                                "block py-2.5 px-3 text-sm rounded-md hover:bg-gray-50",
                                pathname === subItem.href ? "text-primary font-medium" : "text-gray-700"
                              )}
                            >
                              {subItem.name}
                            </Link>
                          </motion.div>
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