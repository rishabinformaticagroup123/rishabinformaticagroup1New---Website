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
    name: "About",
    href: "/about",
    subItems: [
      { name: "Our Story", href: "/about/our-story" },
      { name: "Mission & Vision", href: "/about/mission-vision" },
      { name: "Contact Us", href: "/about/contact" },
    ],
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
      { name: "Performance Engineering", href: "/courses/performance-engineering" },
    ],
  },
  { name: "Blog", href: "/blog" },
  {
    name: "Interview Q&A",
    href: "/interview-qa",
    subItems: [
      { name: "PowerCenter", href: "/interview-qa/powercenter" },
      { name: "IICS", href: "/interview-qa/iics" },
      { name: "SQL", href: "/interview-qa/sql" },
      { name: "Snowflake", href: "/interview-qa/snowflake" },
    ],
  },
  {
    name: "Study Materials",
    href: "/study-materials",
    subItems: [
      { name: "PowerCenter", href: "/study-materials/powercenter" },
      { name: "IICS", href: "/study-materials/iics" },
      { name: "SQL", href: "/study-materials/sql" },
      { name: "Snowflake", href: "/study-materials/snowflake" },
    ],
  },
  {
    name: "Internship",
    href: "/internship",
    subItems: [
      { name: "Internship Details", href: "/internship/details" },
      { name: "Real Projects", href: "/internship/real-projects" },
    ],
  },
  {
    name: "Testimonials",
    href: "/testimonials",
    subItems: [{ name: "Student Success Stories", href: "/testimonials/success-stories" }],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);
  useEffect(() => setMobileMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white shadow-md border-b"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/">
            <Image
              src="/logo.png"
              width={160}
              height={48}
              alt="Logo"
              className="h-12 w-auto transition-all hover:opacity-90"
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4">
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
                    "px-3 py-2 text-[15px] font-semibold rounded-md transition-colors",
                    isClient && pathname === item.href
                      ? "text-indigo-600"
                      : "text-orange-600 hover:text-blue-600 hover:bg-orange-50"
                  )}
                >
                  {item.name}
                </Link>
                {item.subItems && (
                  <motion.span
                    animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </motion.span>
                )}
              </div>
              {/* Dropdown */}
              <AnimatePresence>
                {item.subItems && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100"
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "block px-4 py-3 text-[15px] transition-colors",
                          isClient && pathname === subItem.href
                            ? "text-indigo-600 font-semibold"
                            : "text-orange-600 hover:bg-orange-50 hover:text-blue-600"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Login Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:flex">
          <Button asChild className="bg-orange-600 hover:bg-blue-600 text-white">
            <Link href="https://login.rishabinformaticagroup.com/login" target="_blank" className="flex items-center gap-2">
              <span>Student Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </Link>
          </Button>
        </motion.div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="sm" className="bg-orange-600 hover:bg-blue-600 text-white">
              <Link
                href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral"
                target="_blank"
              >
                <Download className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.button
            whileHover={{ rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto md:hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <Image src="/logo.png" width={140} height={40} alt="Logo" />
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>
            <nav className="space-y-2">
              {MENU_ITEMS.map((item) => (
                <div key={item.name}>
                  <div
                    className="flex justify-between items-center py-2 text-lg font-medium text-orange-700"
                    onClick={() =>
                      setMobileDropdown((prev) => (prev === item.name ? null : item.name))
                    }
                  >
                    <Link href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      {item.name}
                    </Link>
                    {item.subItems && <ChevronDown className="h-4 w-4" />}
                  </div>
                  {item.subItems && mobileDropdown === item.name && (
                    <div className="pl-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block py-1 text-base text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
