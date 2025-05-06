"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Image from "next/image"

// DEBUG: Test menu items if yours aren't loading
const DEBUG_MENU_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // DEBUG: Add console logs
  useEffect(() => {
    console.log("Header mounted - Mobile menu state:", mobileMenuOpen)
  }, [])

  return (
    <>
      {/* DEBUG BANNER - Fixed at top of screen */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center p-1 z-[1000]">
        DEBUG MODE ACTIVE - Header rendering correctly
      </div>

      {/* ORIGINAL HEADER WITH DEBUG ELEMENTS */}
      <header className="sticky top-[24px] z-50 bg-white shadow-sm dark:bg-background border-2 border-green-500">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center bg-yellow-50">
          
          {/* DEBUG: Simplified logo */}
          <Link href="/" className="bg-blue-100 p-2 rounded-md border border-blue-500">
            <span className="font-bold">LOGO_DEBUG</span>
          </Link>

          {/* DEBUG: Always visible menu */}
          <nav className="flex space-x-4 bg-purple-100 p-2 rounded-md border border-purple-500">
            {DEBUG_MENU_ITEMS.map(item => (
              <Link 
                key={item.name} 
                href={item.href}
                className="px-3 py-1 bg-white rounded-md border"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle with debug styling */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-cyan-100 border border-cyan-500"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile menu debug version */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-50">
            <div className="absolute right-0 top-0 h-full w-64 bg-white p-4 border-4 border-orange-500">
              {DEBUG_MENU_ITEMS.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block p-2 m-1 bg-gray-100 rounded-md border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}