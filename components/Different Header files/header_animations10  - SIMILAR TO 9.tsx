"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

const MENU_ITEMS = [
  { name: "Home", href: "/" },
  {
    name: "About", href: "/about",
    subItems: [
      { name: "Our Story", href: "/about/our-story" },
      { name: "Mission & Vision", href: "/about/mission-vision" },
      { name: "Contact Us", href: "/about/contact" },
    ]
  },
  {
    name: "Courses", href: "/courses",
    subItems: [
      { name: "IICS Combo", href: "/courses/iics-combo" },
      { name: "IICS", href: "/courses/iics" },
      { name: "PowerCenter", href: "/courses/powercenter" },
      { name: "SQL", href: "/courses/sql" },
      { name: "Snowflake", href: "/courses/snowflake" },
      { name: "Azure", href: "/courses/azure" },
      { name: "Talend", href: "/courses/talend" },
      { name: "Performance Engineering", href: "/courses/performance-engineering" },
    ]
  },
  { name: "Blog", href: "/blog" },
  {
    name: "Interview Q&A", href: "/interview-qa",
    subItems: [
      { name: "PowerCenter", href: "/interview-qa/powercenter" },
      { name: "IICS", href: "/interview-qa/iics" },
      { name: "SQL", href: "/interview-qa/sql" },
      { name: "Snowflake", href: "/interview-qa/snowflake" },
    ]
  },
  {
    name: "Study Materials", href: "/study-materials",
    subItems: [
      { name: "PowerCenter", href: "/study-materials/powercenter" },
      { name: "IICS", href: "/study-materials/iics" },
      { name: "SQL", href: "/study-materials/sql" },
      { name: "Snowflake", href: "/study-materials/snowflake" },
    ]
  },
  {
    name: "Internship", href: "/internship",
    subItems: [
      { name: "Internship Details", href: "/internship/details" },
      { name: "Real Projects", href: "/internship/real-projects" },
    ]
  },
  {
    name: "Testimonials", href: "/testimonials",
    subItems: [
      { name: "Student Success Stories", href: "/testimonials/success-stories" }
    ]
  }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => setMobileMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo - Increased Size */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" width={200} height={60} alt="Logo" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-1 font-semibold text-[17px] text-gray-900 hover:text-[#f36f36] transition-colors">
                <Link href={item.href}>{item.name}</Link>
                {item.subItems && <ChevronDown className="w-4 h-4" />}
              </div>

              {/* Submenu Dropdown with Animation */}
              <AnimatePresence>
                {item.subItems && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-0 mt-2 w-60 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-20"
                  >
                    {item.subItems.map(sub => (
                      <motion.div
                        key={sub.href}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          href={sub.href}
                          className={cn(
                            "block px-5 py-3 text-[15px] font-medium text-gray-800 hover:bg-gray-100 hover:text-[#f36f36] transition-colors",
                            pathname === sub.href && "text-[#f36f36] font-semibold"
                          )}
                        >
                          {sub.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:flex">
          <Button asChild className="bg-[#f36f36] hover:bg-[#e05a2b] text-white font-semibold">
            <Link href="https://login.rishabinformaticagroup.com/login" target="_blank">
              Student Login
            </Link>
          </Button>
        </div>

        {/* Mobile Menu & App Download */}
        <div className="md:hidden flex items-center gap-2">
          <Button size="sm" asChild className="bg-[#f36f36] hover:bg-[#e05a2b] text-white">
            <Link
              href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral"
              target="_blank"
            >
              <Download className="w-4 h-4 mr-1" />
              App
            </Link>
          </Button>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-gray-700 hover:text-[#f36f36]">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-white shadow-xl p-4"
          >
            <div className="flex justify-between items-center">
              <Link href="/" className="text-lg font-semibold text-[#f36f36]">
                Home
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-700 hover:text-[#f36f36]">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-4">
              {MENU_ITEMS.map((item) => (
                <div key={item.name} className="space-y-2">
                  <Link
                    href={item.href}
                    className="block py-2 text-lg font-semibold text-gray-900 hover:text-[#f36f36] transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div className="ml-4 space-y-2">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block py-2 text-lg font-medium text-gray-800 hover:bg-gray-100 hover:text-[#f36f36] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
