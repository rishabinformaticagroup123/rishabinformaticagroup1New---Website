"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

// DEBUG: Test menu items
const DEBUG_MENU_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" }
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // DEBUG: Mount confirmation
  useEffect(() => {
    console.log("DEBUG: Header mounted")
  }, [])

  return (
    <>
      {/* DEBUG BANNER (always visible) */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center p-1 z-[1000]">
        DEBUG MODE ACTIVE
      </div>

      {/* MAIN HEADER */}
      <header className="sticky top-[24px] z-50 bg-white shadow-sm dark:bg-background border-2 border-green-500">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center bg-yellow-50">
          
          {/* DEBUG LOGO */}
          <Link href="/" className="bg-blue-100 p-2 rounded-md border border-blue-500">
            <span className="font-bold">LOGO_DEBUG</span>
          </Link>

          {/* DEBUG MENU - CORE FIX */}
          <nav className={cn(
            "flex items-center space-x-4",
            "!mx-0 !bg-white dark:!bg-background",
            "!visible !opacity-100",
            "border-2 border-red-500 p-2 rounded-md"
          )}>
            {DEBUG_MENU_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="!text-black dark:!text-white px-3 py-1 hover:bg-gray-100 rounded"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* MOBILE TOGGLE */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-cyan-100 border border-cyan-500"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* MOBILE MENU */}
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