import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";

const courses = [
  { name: "IICS Combo", href: "/courses/iics-combo" },
  { name: "IICS", href: "/courses/iics" },
  { name: "PowerCenter", href: "/courses/powercenter" },
  { name: "SQL", href: "/courses/sql" },
  { name: "Snowflake", href: "/courses/snowflake" },
  { name: "Azure", href: "/courses/azure" },
  { name: "Talend", href: "/courses/talend" },
  { name: "Performance Engineering", href: "/courses/performance-engineering" },
];

const interviewQuestions = [
  { name: "PowerCenter", href: "/interview-questions/powercenter" },
  { name: "IICS", href: "/interview-questions/iics" },
  { name: "SQL", href: "/interview-questions/sql" },
  { name: "Snowflake", href: "/interview-questions/snowflake" },
];

const studyMaterials = [
  { name: "PowerCenter", href: "/study-materials/powercenter" },
  { name: "IICS", href: "/study-materials/iics" },
  { name: "SQL", href: "/study-materials/sql" },
  { name: "Snowflake", href: "/study-materials/snowflake" },
];

const internship = [
  { name: "Internship Details", href: "/internship/details" },
  { name: "Real Projects", href: "/internship/projects" },
];

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold text-blue-600">Rishab Informatica Group</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">Home</Link>

              <Link href="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">About</Link>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                      Courses
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {courses.map((item) => (
                            <Link key={item.name} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                      Interview Q&A
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {interviewQuestions.map((item) => (
                            <Link key={item.name} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                      Study Materials
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {studyMaterials.map((item) => (
                            <Link key={item.name} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                      Internship
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {internship.map((item) => (
                            <Link key={item.name} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Link href="/testimonials" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">Testimonials</Link>

              <Link href="/blog" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">Blog</Link>

              <Link href="/contact" className="inline-flex items-center px-4 py-2 ml-4 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white text-sm font-semibold">
                Contact
              </Link>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
