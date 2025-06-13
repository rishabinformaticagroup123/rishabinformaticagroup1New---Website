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
      { 
        name: "All Courses",
        href: "/courses",
        isMegamenu: true,
        columns: [
          {
            title: "Live Courses",
            items: [
              { name: "Informatica IICS Combo", href: "/courses/IICS-Combo-Live"},
              { name: "Informatica IICS Cloud", href: "/courses/IICS-Cloud-Live" },
              { name: "Informatica IICS CAI", href: "/courses/IICS-CAI-Live" },
			  { name: "Azure Data Eng. COMBO",href: "/courses/AZURE-Combo-Live" },
			  { name: "Snowflake Combo",href: "/courses/SNOWFLAKE-Combo-Live" },
			  { name: "Performance Engineering",href: "/courses/Performance-Engineering" },
            ]
          },
          {
            title: "Recorded Courses with Support",
            items: [
              { name: "Informatica IICS COMBO Full Course", href: "/courses/IICS-Combo-recorded" },
			  { name: "Informatica IICS COMBO Full Course Part-1", href: "/courses/IICS-Combo-recorded-Part1" },
			  { name: "Informatica IICS COMBO Full Course Part-2", href: "/courses/IICS-Combo-recorded-Part2" },
              { name: " Informatica IICS CAI", href: "/courses/IICS-CAI-recorded" },
              { name: "Informatica Power Center", href: "/courses/Informatica-Powercenter" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Blogs",
    href: "/blogs"
  },
  {
    name: "Interview Q&A",
    href: "/Interview-qa",
    subItems: [
      { name: "Informatica Power center", href: "/Interview-qa/powercenter" },
      { name: "Informatica IICS - IDMC", href: "/Interview-qa/iics" },
      { name: "SQL", href: "/Interview-qa/sql" },
      { name: "Azure (ADF + ADB )", href: "/Interview-qa/azure" },
    ],
  },
  {
    name: "Study Materials",
    href: "/study-materials",
    subItems: [
      { name: "Informatica Power center", href: "/study-materials/powercenter" },
      { name: "Informatica IICS - IDMC", href: "/study-materials/iics" },
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
    subItems: [{ name: "Student Success Stories", href: "/testimonials" }],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [mobileMenuOpen]);

  const toggleMobileDropdown = (itemName) => {
    setMobileDropdown(mobileDropdown === itemName ? null : itemName);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white shadow-md border-b"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/">
            <Image src="/logo.png" width={160} height={48} alt="Logo" className="h-12 w-auto transition-all hover:opacity-90" priority />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-white px-4 py-2 rounded-md shadow-sm">
          {MENU_ITEMS.map((item) => (
            <div key={item.name} className="relative group" onMouseEnter={() => setActiveDropdown(item.name)} onMouseLeave={() => setActiveDropdown(null)}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-1">
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-semibold rounded-md transition-colors",
                    isClient && pathname === item.href ? "text-blue-600" : "text-orange-600 hover:text-blue-600 hover:bg-orange-50"
                  )}
                >
                  {item.name}
                </Link>
                {item.subItems && (
                  <motion.span animate={{ rotate: activeDropdown === item.name ? 180 : 0 }} transition={{ type: "spring", stiffness: 500 }}>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </motion.span>
                )}
              </motion.div>
              
              <AnimatePresence>
                {item.subItems && activeDropdown === item.name && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, y: -15 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className={cn(
                      "absolute left-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100",
                      item.subItems.some(sub => sub.isMegamenu) ? "w-[600px] p-4" : "w-56"
                    )}
                  >
                    {item.subItems.some(sub => sub.isMegamenu) ? (
                      <div className="grid grid-cols-2 gap-6">
                        {item.subItems[0].columns.map((column, colIndex) => (
                          <div key={colIndex}>
                            <h4 className="font-bold mb-3 text-gray-800">{column.title}</h4>
                            <ul className="space-y-2">
                              {column.items.map((subItem) => (
                                <li key={subItem.href}>
                                  <Link
                                    href={subItem.href}
                                    className={cn(
                                      "block px-4 py-2 text-sm font-semibold transition-colors rounded-md",
                                      isClient && pathname === subItem.href 
                                        ? "text-blue-600 font-semibold bg-blue-50" 
                                        : "text-orange-600 hover:bg-orange-50 hover:text-blue-600"
                                    )}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      item.subItems.map((subItem) => (
                        <motion.div 
                          key={subItem.href}
                          variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                        >
                          <Link
                            href={subItem.href}
                            className={cn(
                              "block px-4 py-2 text-sm font-semibold transition-colors",
                              isClient && pathname === subItem.href 
                                ? "text-blue-600 font-" 
                                : "text-orange-600 hover:bg-orange-50 hover:text-blue-600"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Student Login */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:flex">
          <Button asChild className="bg-orange-600 hover:bg-blue-600 text-white">
            <Link href="https://login.rishabinformaticagroup.com/login" target="_blank" className="flex items-center gap-2">
              <span>Student Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              </svg>
            </Link>
          </Button>
        </motion.div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="sm" className="bg-orange-600 hover:bg-blue-600 text-white">
              <Link href="https://zfghut.on-app.in/app/home?orgCode=zfghut&referrer=utm_source=copy-link&utm_medium=tutor-app-referral" target="_blank" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>App</span>
              </Link>
            </Button>
          </motion.div>
          <motion.button
            whileHover={{ rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed inset-0 bg-white z-50 md:hidden pt-20 px-4 overflow-y-auto"
            >
              <div className="flex flex-col space-y-4">
                {MENU_ITEMS.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 pb-2">
                    <div className="flex justify-between items-center">
                      <Link
                        href={item.href}
                        className={cn(
                          "px-3 py-2 text-base font-medium flex-grow",
                          isClient && pathname === item.href ? "text-indigo-600" : "text-gray-900"
                        )}
                        onClick={() => !item.subItems && setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.subItems && (
                        <button 
                          onClick={() => toggleMobileDropdown(item.name)}
                          className="p-2 rounded-md hover:bg-gray-100"
                          aria-expanded={mobileDropdown === item.name}
                        >
                          <motion.span
                            animate={{ rotate: mobileDropdown === item.name ? 180 : 0 }}
                          >
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          </motion.span>
                        </button>
                      )}
                    </div>
                    
                    {item.subItems && mobileDropdown === item.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 overflow-hidden"
                      >
                        {item.subItems[0]?.columns ? (
                          <>
                            {item.subItems[0].columns.map((column, colIndex) => (
                              <div key={colIndex} className="mb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">{column.title}</h4>
                                <div className="space-y-2">
                                  {column.items.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className={cn(
                                        "block px-3 py-2 text-sm fm-semibold",
                                        isClient && pathname === subItem.href 
                                          ? "text-blue-600" 
                                          : "text-orange-600 hover:text-blue-600"
                                      )}
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "block px-3 py-2 text-sm font-semi bold",
                                isClient && pathname === subItem.href 
                                  ? "text-blue-600"
                                  : "text-orange-600 hover:text-blue-600"
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Student Login Button */}
              <div className="mt-6">
                <Button asChild className="w-full bg-orange-600 hover:bg-blue-600 text-white">
                  <Link href="https://login.rishabinformaticagroup.com/login" target="_blank" className="flex items-center justify-center gap-2">
                    <span>Student Login</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    </svg>
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}