'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiPhone, FiMenu, FiX, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services', children: [
    { name: 'CNC Machining', href: '/services/cnc-machining' },
    { name: 'Lathe Machining', href: '/services/lathe-machining' },
    { name: 'VMC Milling & Drilling', href: '/services/sheet-metal-cutting' },
    { name: 'Metal Fabrication', href: '/services/metal-fabrication' },
    { name: 'Custom Parts', href: '/services/custom-parts' },
  ]},
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-steel-800 text-white py-2 px-4 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="flex items-center gap-2 hover:text-primary-300">
              <FiPhone size={14} />
              <span>+91 93233 97961</span>
            </a>
            <a href="mailto:jiteshengineeringworks20@gmail.com" className="flex items-center gap-2 hover:text-primary-300">
              <FiMail size={14} />
              <span>jiteshengineeringworks20@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-steel-300">Open Daily: 9:00 AM - 9:00 PM</span>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-400 hover:text-green-300"
            >
              <FaWhatsapp size={16} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container-custom py-4 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">JE</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-steel-800 leading-tight">Jitesh Engineering Works</h1>
            <p className="text-sm text-steel-500">Milling | Drilling | Turning | Fabrication</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className="text-steel-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
              {item.children && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-steel-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-steel-600 hover:bg-primary-50 hover:text-primary-600"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact" className="btn-primary text-sm">
            Get Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 lg:hidden">
          <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="text-primary-600">
            <FiPhone size={22} />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-steel-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-steel-100 py-4 px-4">
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className="block py-3 text-steel-700 font-medium border-b border-steel-50"
                onClick={() => {
                  if (!item.children) setMobileMenuOpen(false);
                  else setServicesOpen(!servicesOpen);
                }}
              >
                {item.name}
              </Link>
              {item.children && servicesOpen && (
                <div className="pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block py-2 text-sm text-steel-500 hover:text-primary-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 flex gap-3">
            <Link href="/contact" className="btn-primary text-sm flex-1 text-center" onClick={() => setMobileMenuOpen(false)}>
              Get Quote
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              className="btn-whatsapp text-sm flex-1 text-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


