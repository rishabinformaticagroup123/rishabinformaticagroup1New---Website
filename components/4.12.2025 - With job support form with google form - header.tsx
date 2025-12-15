"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ExternalLink, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Define the structure for menu items, allowing for nested subItems and megamenu columns
interface MenuItem {
  name: string;
  href: string;
  external?: boolean;
  subItems?: (MenuItem | MegamenuItem)[];
  isMegamenu?: boolean; // Only for top-level subItems that are megamenus
  columns?: { title: string; items: MenuItem[] }[]; // Only for megamenu subItems
}

interface MegamenuItem extends MenuItem {
  isMegamenu: true;
  columns: { title: string; items: MenuItem[] }[];
}

const MENU_ITEMS: MenuItem[] = [
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
              { name: "Informatica IICS Combo", href: "/courses/iics-combo-live" },
              { name: "Informatica IICS Cloud", href: "/courses/iics-cloud-live" },
              { name: "Informatica IICS CAI", href: "/courses/iics-cai-live" },
              { name: "Azure Data Eng. COMBO", href: "/courses/azure-combo-live" },
              { name: "Snowflake Combo", href: "/courses/snowflake-combo-live" },
              { name: "Performance Engineering", href: "/courses/performance-engineering" },
            ]
          },
          {
            title: "Recorded Courses with Support",
            items: [
              { name: "Informatica IICS COMBO Full Course", href: "/courses/iics-combo-recorded" },
              { name: "IICS COMBO Part-1", href: "/courses/iics-combo-recorded-part-1" },
              { name: "IICS COMBO Part-2", href: "/courses/iics-combo-recorded-part-2" },
              { name: "Informatica IICS CAI", href: "/courses/iics-cai-recorded" },
              { name: "Informatica Power Center", href: "/courses/informatica-powercenter" }
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
  // ✅ Moved "Crack the Next Interview" here
  {
    name: "Crack the Next Interview",
    href: "/interview-qa",
    subItems: [
      {
	     name: "SQL",
        href: "/interview-qa/sql",
        subItems: [
          { name: "Interview Q&A", href: "/interview-qa/sql/qa" },
          { name: "Notes", href: "/interview-qa/powercenter/notes" },
          { name: "Exercises", href: "/interview-qa/powercenter/exercises" },
          { name: "Project Stuffs", href: "/interview-qa/powercenter/projects" },
   	  	]
      },
      {  	 	  	 
	    name: "Informatica Power Center",
        href: "/interview-qa/powercenter",
        subItems: [
          { name: "Interview Q&A", href: "/interview-qa/powercenter/qa" },
          { name: "Notes", href: "/interview-qa/powercenter/notes" },
          { name: "Exercises", href: "/interview-qa/powercenter/exercises" },
          { name: "Mapping Docs", href: "/interview-qa/powercenter/mappings" },
          { name: "Project Stuffs", href: "/interview-qa/powercenter/projects" },
          { name: "Sample Resumes", href: "/interview-qa/powercenter/resumes" },
        ]
      },
      {
        name: "Informatica IICS - IDMC",
        href: "/interview-qa/iics",
        subItems: [
          { name: "Interview Q&A", href: "/interview-qa/iics/qa" },
          { name: "Notes", href: "/interview-qa/iics/notes" },
          { name: "Exercises", href: "/interview-qa/iics/exercises" },
          { name: "Mapping Docs", href: "/interview-qa/iics/mappings" },
          { name: "Project Stuffs", href: "/interview-qa/iics/projects" },
          { name: "Sample Resumes", href: "/interview-qa/iics/resumes" },
        ]
      },
      {
	    name: "Snowflake",
        href: "/interview-qa/snowflake",
        subItems: [
          { name: "Interview Q&A", href: "/interview-qa/snowflake/qa" },
          { name: "Notes", href: "/interview-qa/snowflake/notes" },
          { name: "Exercises", href: "/interview-qa/snowflake/exercises" },
          { name: "Mapping Docs", href: "/interview-qa/snowflake/mappings" },
          { name: "Project Stuffs", href: "/interview-qa/snowflake/projects" },
          { name: "Sample Resumes", href: "/interview-qa/snowflake/resumes" },
	    ]
      },
      {
	    name: "Azure (ADF + ADB)",
        href: "/interview-qa/azure",
        subItems: [
          { name: "Interview Q&A", href: "/interview-qa/azure/qa" },
          { name: "Notes", href: "/interview-qa/azure/notes" },
          { name: "Exercises", href: "/interview-qa/azure/exercises" },
          { name: "Project Stuffs", href: "/interview-qa/azure/projects" },
          { name: "Sample Resumes", href: "/interview-qa/azure/resumes" },
        ]
      },
      {
		  name: "Unix Commands",
        href: "/interview-qa/Unix ",
        subItems: [
          { name: "Interview Q&A", href: "/interview-qa/azure/qa" },
          { name: "Notes", href: "/interview-qa/azure/notes" },
          { name: "Exercises", href: "/interview-qa/azure/exercises" },
        ]
      }
    ]
  },
  // ✅ Moved "SQL Lab" here
  {
    name: "SQL Lab",
    href: "/sql",
    subItems: [
	  { name: "SQL Lab + Practice", href: "/sql/setup" },
      { name: "SQL – Introduction", href: "/sql/introduction" },
	  { name: "SQL – 55 Interview-Q&A", href: "/interview-qa/sql/qa" },
      { name: "How to Import Tables", href: "/sql/students" },
      { name: "Different Languages of SQL", href: "/sql/languages" },
      { name: "Constraints", href: "/sql/constraints" },
      { name: "Single Row Functions", href: "/sql/single-row-functions" },
      { name: "Joins", href: "/sql/joins" },
      { name: "Aggregation", href: "/sql/aggregation" },
      { name: "Rank Functions", href: "/sql/rank" },
      { name: "Sorting Functions", href: "/sql/sorting" },
      { name: "Union & Union All Functions", href: "/sql/union" },
      { name: "Exercises", href: "/sql/excercises" }
    ]
  },
  {
    name: "Live Job Support",
    href: "/job-support",
    subItems: [
      {
        name: "Job Support Request Form",
        href: "https://forms.gle/PFat1nZEUnwWW8y89",
        external: true
      },
      {
        name: "Real Projects",
        href: "/job-support/real-projects"
      }
    ]
  },
  {
    name: "Testimonials",
    href: "/testimonials",
    subItems: [
      { name: "Student Success Stories", href: "/testimonials" },
    ],
  }
];
    

// Recursive component for mobile menu items
// Extracted outside the Header component for better modularity and reusability
const MobileMenuItem: React.FC<{
  item: MenuItem;
  level?: number;
  currentMobileDropdowns: string[];
  toggleMobileDropdown: (name: string) => void;
  closeMobileMenu: () => void;
  isClient: boolean;
  pathname: string;
}> = ({ item, level = 0, currentMobileDropdowns, toggleMobileDropdown, closeMobileMenu, isClient, pathname }) => {
  const isOpen = currentMobileDropdowns.includes(item.name);
  const hasSubItems = item.subItems && item.subItems.length > 0;
  // Check if the *current* item being rendered is a megamenu itself
  // Or, if it's a parent of a megamenu (like "Courses"), check if its first subItem is a megamenu
  const isMegamenuParent = hasSubItems && (item.subItems[0] as MegamenuItem)?.isMegamenu;

  // Determine padding based on nesting level
  const paddingLeft = `${16 + level * 16}px`; // Base 16px + 16px per level

  // Determine if this item or any of its children are the currently active path
  // This helps highlight parent menus when a child page is active
  const isActivePath = isClient && pathname.startsWith(item.href) && item.href !== "/";

  // Determine the text color based on level and active state
  const textColorClass = cn(
    isClient && pathname === item.href // If it's the exact active page
      ? "text-blue-600"
      : level === 0 // Top-level main menu items
        ? item.name === "Home"
          ? "text-purple-800" // Dark violet for Home
          : "text-gray-900" // Black for other main menus
        : level === 1 // First-level sub-menus
          ? "text-orange-600 hover:text-blue-600"
          : "text-green-600 hover:text-blue-600", // Second-level and deeper sub-menus
    isActivePath && level > 0 && "font-bold" // Make parent items bold if their child is active
  );

  return (
    <div className="border-b border-gray-100 pb-2">
      <div className="flex justify-between items-center">
        {item.external ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "py-2 text-base font-medium flex-grow flex items-center gap-1",
              textColorClass
            )}
            style={{ paddingLeft }}
            onClick={closeMobileMenu}
          >
            {item.name}
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "py-2 text-base font-medium flex-grow",
              textColorClass
            )}
            style={{ paddingLeft }}
            onClick={() => {
              // If it has sub-items, toggle the dropdown instead of navigating directly
              // If it's a leaf node or external link, close the whole menu
              if (!hasSubItems || item.external) {
                closeMobileMenu();
              } else {
                toggleMobileDropdown(item.name);
              }
            }}
          >
            {item.name}
          </Link>
        )}
        {hasSubItems && (
          <button
            onClick={() => toggleMobileDropdown(item.name)}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-expanded={isOpen}
          >
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
            >
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </motion.span>
          </button>
        )}
      </div>

      {hasSubItems && isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          {isMegamenuParent ? (
            // This block handles the "Courses" megamenu specifically for mobile
            // It iterates through the columns of the *first* subItem (which is the megamenu itself)
            <div className="grid grid-cols-1 gap-4 py-2">
              {(item.subItems[0] as MegamenuItem).columns.map((column, colIndex) => (
                <div key={colIndex}>
                  <h4 className="font-semibold text-gray-800 mb-2" style={{ paddingLeft: `${paddingLeft}` }}>{column.title}</h4>
                  <div className="space-y-1">
                    {column.items.map((subItem) => (
                      <MobileMenuItem
                        key={subItem.href}
                        item={subItem}
                        level={level + 2} // These items are two levels deep from the main menu
                        currentMobileDropdowns={currentMobileDropdowns}
                        toggleMobileDropdown={toggleMobileDropdown}
                        closeMobileMenu={closeMobileMenu}
                        isClient={isClient}
                        pathname={pathname}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // This block handles regular nested sub-menus (e.g., under Study Materials -> SQL)
            item.subItems?.map((subItem) => (
              <MobileMenuItem
                key={subItem.href}
                item={subItem}
                level={level + 1} // Regular nesting level increase
                currentMobileDropdowns={currentMobileDropdowns}
                toggleMobileDropdown={toggleMobileDropdown}
                closeMobileMenu={closeMobileMenu}
                isClient={isClient}
                pathname={pathname}
              />
            ))
          )}
        </motion.div>
      )}
    </div>
  );
};


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // For desktop
  const [mobileDropdowns, setMobileDropdowns] = useState<string[]>([]); // For mobile, tracks open paths
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Ref for mobile menu container

  useEffect(() => setIsClient(true), []);

  // Close mobile menu and all dropdowns when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdowns([]);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [mobileMenuOpen]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Ensure the click is outside the mobile menu ref AND not on the menu toggle button itself
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) &&
          !(event.target as HTMLElement).closest('button[aria-label="Open menu"]')) {
        closeMobileMenu();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]); // Re-run when mobileMenuOpen changes


  // Toggles a mobile dropdown. If already open, closes it and its children.
  const toggleMobileDropdown = (itemName: string) => {
    setMobileDropdowns(prev => {
      if (prev.includes(itemName)) {
        // Find the index of the item to close
        const index = prev.indexOf(itemName);
        // Return only the part of the array before this item (closing it and all subsequent children)
        return prev.slice(0, index);
      } else {
        // Open this item (add it to the end of the open path)
        return [...prev, itemName];
      }
    });
  };

  // Helper function to close the entire mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdowns([]); // Also close all mobile dropdowns
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
        <nav className="hidden md:flex items-center gap-1 bg-white px-4 py-2 rounded-md shadow-sm">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1"
              >
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "px-3 py-2 text-sm font-semibold rounded-md transition-colors flex items-center gap-1",
                      isClient && pathname === item.href
                        ? "text-blue-600"
                        : "text-orange-600 hover:text-blue-600 hover:bg-orange-50"
                    )}
                  >
                    {item.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-semibold rounded-md transition-colors",
                      isClient && pathname === item.href
                        ? "text-blue-600"
                        : "text-orange-600 hover:text-blue-600 hover:bg-orange-50"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
                {item.subItems && (
                  <motion.span
                    animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
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
                      visible: { opacity: 1, y: 0 },
                    }}
                    className={cn(
                      "absolute left-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-50",
                      item.subItems.some((sub) => (sub as MegamenuItem).isMegamenu)
                        ? "w-[600px] p-4"
                        : "min-w-[220px] py-2"
                    )}
                  >
                    {item.subItems.some((sub) => (sub as MegamenuItem).isMegamenu) ? (
                      <div className="grid grid-cols-2 gap-6">
                        {(item.subItems[0] as MegamenuItem).columns.map((column, colIndex) => (
                          <div key={colIndex}>
                            <h4 className="font-bold mb-3 text-gray-800">{column.title}</h4>
                            <ul className="space-y-2">
                              {column.items.map((subItem) => (
                                <li key={subItem.href}>
                                  {subItem.external ? (
                                    <a
                                      href={subItem.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={cn(
                                        "block px-4 py-2 text-sm font-semibold transition-colors",
                                        "text-orange-600 hover:text-blue-600 flex items-center gap-1"
                                      )}
                                    >
                                      {subItem.name}
                                      <ExternalLink className="w-3 h-3 ml-1" />
                                    </a>
                                  ) : (
                                    <Link
                                      href={subItem.href}
                                      className={cn(
                                        "block px-4 py-2 text-sm font-semibold transition-colors",
                                        isClient && pathname === subItem.href
                                          ? "text-blue-600"
                                          : "text-orange-600 hover:text-blue-600 hover:bg-orange-50"
                                      )}
                                    >
                                      {subItem.name}
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Regular dropdown items (can have nested sub-items)
                      item.subItems.map((subItem, index) => (
                        <motion.div // Added motion for smoother transition
                          key={subItem.href}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.15, delay: index * 0.05 }} // Staggered delay for effect
                          className="relative group/sub"
                          style={{ marginTop: index > 0 ? '-1px' : '0' }} // removes gap
                        >
                          <div className="hover:bg-orange-50 rounded-md">
                            {subItem.external ? (
                              <a
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                  "block px-4 py-2 text-sm font-semibold transition-colors",
                                  "text-orange-600 hover:text-blue-600 flex items-center gap-1"
                                )}
                              >
                                {subItem.name}
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            ) : (
                              <Link
                                href={subItem.href}
                                className={cn(
                                  "block px-4 py-2 text-sm font-semibold transition-colors",
                                  isClient && pathname === subItem.href
                                    ? "text-blue-600"
                                    : "text-orange-600 hover:text-blue-600 hover:bg-orange-50"
                                )}
                              >
                                {subItem.name}
                              </Link>
                            )}
                          </div>

                          {/* Desktop nested sub-sub-menus */}
                          {subItem.subItems && (
                            <motion.div // Added motion for smoother transition
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-full top-0 ml-[1px] bg-white shadow-lg rounded-xl border border-gray-100 w-60 z-50 p-2 opacity-0 group-hover/sub:opacity-100 group-hover/sub:block hidden transition-opacity"
                            >
                              {subItem.subItems.map((deepItem) => (
                                <div key={deepItem.href}>
                                  {deepItem.external ? (
                                    <a
                                      href={deepItem.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={cn(
                                        "block px-4 py-2 text-sm font-semibold transition-colors",
                                        "text-orange-600 hover:text-blue-600 flex items-center gap-1"
                                      )}
                                    >
                                      {deepItem.name}
                                      <ExternalLink className="w-3 h-3 ml-1" />
                                    </a>
                                  ) : (
                                    <Link
                                      href={deepItem.href}
                                      className={cn(
                                        "block px-4 py-2 text-sm font-semibold transition-colors",
                                        isClient && pathname === deepItem.href
                                          ? "text-blue-600"
                                          : "text-orange-600 hover:text-blue-600 hover:bg-orange-50"
                                      )}
                                    >
                                      {deepItem.name}
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
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
              ref={mobileMenuRef} // Attach ref for outside click detection
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed inset-0 bg-white z-50 md:hidden pt-20 px-4 overflow-y-auto"
            >
              <div className="flex flex-col space-y-4">
                {MENU_ITEMS.map((item) => (
                  <MobileMenuItem
                    key={item.name} // Use name for top-level keys
                    item={item}
                    level={0} // Top-level item
                    currentMobileDropdowns={mobileDropdowns}
                    toggleMobileDropdown={toggleMobileDropdown}
                    closeMobileMenu={closeMobileMenu}
                    isClient={isClient}
                    pathname={pathname}
                  />
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
