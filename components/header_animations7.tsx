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
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" width={160} height={48} alt="Logo" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-1 font-semibold text-sm text-gray-800 hover:text-orange-600 transition-colors">
                <Link href={item.href}>{item.name}</Link>
                {item.subItems && <ChevronDown className="w-4 h-4" />}
              </div>
              {/* Submenu Dropdown */}
              <AnimatePresence>
                {item.subItems && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden"
                  >
                    {item.subItems.map(sub => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={cn(
                          "block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-600",
                          pathname === sub.href && "text-orange-600 font-semibold"
                        )}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:flex">
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white font-semibold">
            <Link href="https://login.rishabinformaticagroup.com/login" target="_blank">
              Student Login
            </Link>
          </Button>
        </div>

        {/* Mobile Menu & App Download */}
        <div className="md:hidden flex items-center gap-2">
          <Button size="sm" asChild className="bg-orange-600 hover:bg-orange-700 text-white">
            <Link
              href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral"
              target="_blank"
            >
              <Download className="w-4 h-4 mr-1" />
              App
            </Link>
          </Button>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-gray-700 hover:text-orange-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
