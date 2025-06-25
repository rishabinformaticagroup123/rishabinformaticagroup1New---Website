import Link from "next/link"
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info & Socials */}
          <div>
            <h3 className="text-lg font-semibold">Rishab Informatica Group</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Leading training institute offering professional courses in Informatica IICS, Azure Data Engineering,
              Snowflake, and Performance Engineering.
            </p>

            {/* Official Social Media */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Follow Us (Official):</p>
              <div className="flex space-x-4">
                <Link
                  href="https://www.facebook.com/rishabinformaticagroup"
                  aria-label="Facebook"
                  title="Facebook (Official)"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/rishabinformaticagroup"
                  aria-label="Instagram"
                  title="Instagram (Official)"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com/rishab_informatica" // Replace with actual official Twitter if available
                  aria-label="Twitter"
                  title="Twitter (Official)"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/rishab-informatica-group"
                  aria-label="LinkedIn"
                  title="LinkedIn (Official)"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.youtube.com/@rishabinformaticagroup"
                  aria-label="YouTube"
                  title="YouTube (Official)"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Founder Personal Links */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Connect with Hari.A:</p>
              <div className="flex space-x-4">
                <Link
                  href="https://www.linkedin.com/in/hari-a"
                  aria-label="LinkedIn - Hari.A"
                  title="LinkedIn - Hari.A"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com/Harikri36470205"
                  aria-label="Twitter - Hari.A"
                  title="Twitter - Hari.A"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Student Stories", href: "/testimonials" },
                { name: "Blogs", href: "/blogs" },
                { name: "Our Top Courses", href: "/courses" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold">Policies</h3>
            <ul className="mt-4 space-y-2">
              {[
                { name: "Refund Policy", href: "/refund-policy" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookie-policy" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Rishab Informatica GROUP, No 7, 5th Main, 15th Cross, Subbaraju Layout, Lakkasandra, Bangalore - 560030
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  +91 8970853557 / 9448005273
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  support@rishabinformaticagroup.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Designed & Developed by{" "}
            <span className="font-medium text-primary">Rishab Informatica Group</span>
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Rishab Informatica Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
