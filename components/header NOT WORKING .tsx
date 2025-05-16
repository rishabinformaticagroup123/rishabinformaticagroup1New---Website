'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import Image from 'next/image';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const courses = [
    { name: 'All Courses', href: '/courses' },
    { name: 'IICS Course', href: '/courses/iics' },
    { name: 'Azure Data Engineering', href: '/courses/azure' },
    { name: 'Informatica PowerCenter', href: '/courses/powercenter' },
    { name: 'Snowflake', href: '/courses/snowflake' }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Rishab Informatica Group Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-bold text-xl text-gray-800">Rishab Informatica Group</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center relative">
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Home
          </Link>

          {/* Courses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={`text-sm font-medium ${
                pathname.startsWith('/courses') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Courses
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border shadow-md rounded-md w-48 z-50">
                {courses.map(course => (
                  <Link
                    key={course.name}
                    href={course.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    {course.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link
            href="/blog"
            className={`text-sm font-medium ${
              pathname === '/blog' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Blog
          </Link>
          <Link
            href="/testimonials"
            className={`text-sm font-medium ${
              pathname === '/testimonials' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Testimonials
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium ${
              pathname === '/about' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium ${
              pathname === '/contact' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="text-gray-700 text-2xl"
            aria-label="Toggle Menu"
          >
            {toggleMenu ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {toggleMenu && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col space-y-4 px-4 py-4">
            <Link href="/" onClick={() => setToggleMenu(false)} className="text-gray-700">
              Home
            </Link>
            {/* Mobile Courses Dropdown */}
            <details>
              <summary className="cursor-pointer text-gray-700">Courses</summary>
              <div className="pl-4 flex flex-col space-y-2 mt-2">
                {courses.map(course => (
                  <Link
                    key={course.name}
                    href={course.href}
                    onClick={() => setToggleMenu(false)}
                    className="text-sm text-gray-700"
                  >
                    {course.name}
                  </Link>
                ))}
              </div>
            </details>
            <Link href="/blog" onClick={() => setToggleMenu(false)} className="text-gray-700">
              Blog
            </Link>
            <Link href="/testimonials" onClick={() => setToggleMenu(false)} className="text-gray-700">
              Testimonials
            </Link>
            <Link href="/about" onClick={() => setToggleMenu(false)} className="text-gray-700">
              About
            </Link>
            <Link href="/contact" onClick={() => setToggleMenu(false)} className="text-gray-700">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
