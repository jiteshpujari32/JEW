import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-steel-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">JE</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Jitesh Engineering Works</h3>
                <p className="text-xs text-steel-400">Boisar, Palghar</p>
              </div>
            </div>
            <p className="text-steel-300 text-sm leading-relaxed mb-4">
              All Milling, Drilling, Turning Machine, For Fabrication Etc.
              Specialist in Drilling Loom Spares & Textile Parts. All Textile Parts Machining.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-steel-400 hover:text-primary-400 transition-colors" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-steel-400 hover:text-primary-400 transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-steel-400 hover:text-primary-400 transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/cnc-machining" className="text-steel-300 hover:text-white text-sm">CNC Machining</Link></li>
              <li><Link href="/services/lathe-machining" className="text-steel-300 hover:text-white text-sm">Lathe Machining</Link></li>
              <li><Link href="/services/sheet-metal-cutting" className="text-steel-300 hover:text-white text-sm">VMC Milling & Drilling</Link></li>
              <li><Link href="/services/metal-fabrication" className="text-steel-300 hover:text-white text-sm">Metal Fabrication & Welding</Link></li>
              <li><Link href="/services/custom-parts" className="text-steel-300 hover:text-white text-sm">Custom Parts Manufacturing</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-steel-300 hover:text-white text-sm">About Us</Link></li>
              <li><Link href="/projects" className="text-steel-300 hover:text-white text-sm">Our Projects</Link></li>
              <li><Link href="/contact" className="text-steel-300 hover:text-white text-sm">Get a Quote</Link></li>
              <li><Link href="/contact" className="text-steel-300 hover:text-white text-sm">Upload Drawing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <p className="text-steel-400 text-xs mb-3">Rajesh Pujari (Proprietor)</p>
            <ul className="space-y-3">
              <li>
                <a href="tel:+919323397961" className="flex items-start gap-3 text-steel-300 hover:text-white text-sm">
                  <FiPhone className="mt-0.5 flex-shrink-0" />
                  <span>+91 93233 97961</span>
                </a>
              </li>
              <li>
                <a href="tel:+918308383673" className="flex items-start gap-3 text-steel-300 hover:text-white text-sm">
                  <FiPhone className="mt-0.5 flex-shrink-0" />
                  <span>+91 83083 83673</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/918308383673" className="flex items-start gap-3 text-green-400 hover:text-green-300 text-sm">
                  <FaWhatsapp className="mt-0.5 flex-shrink-0" />
                  <span>WhatsApp Us</span>
                </a>
              </li>
              <li>
                <a href="mailto:jiteshengineeringworks20@gmail.com" className="flex items-start gap-3 text-steel-300 hover:text-white text-sm">
                  <FiMail className="mt-0.5 flex-shrink-0" />
                  <span>jiteshengineeringworks20@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-steel-300 text-sm">
                  <FiMapPin className="mt-0.5 flex-shrink-0" />
                  <span>Plot No. W/12, Near Custom Capsule, Camlin Naka, M.I.D.C. Tarapur, Boisar, Dist. Palghar - 401 506</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-steel-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-steel-400 text-sm">
            &copy; {new Date().getFullYear()} Jitesh Engineering Works. All rights reserved.
          </p>
          <p className="text-steel-500 text-xs">
            Milling | Drilling | Turning | Fabrication | Textile Parts | Boisar, Palghar, Maharashtra
          </p>
        </div>
      </div>
    </footer>
  );
}


