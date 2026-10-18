import Link from 'next/link';
import { FiCheckCircle, FiArrowRight, FiPhone } from 'react-icons/fi';
import { FaWhatsapp, FaCog, FaIndustry, FaTools, FaCut, FaWrench, FaDraftingCompass } from 'react-icons/fa';
import InquiryFormPreview from '@/components/InquiryFormPreview';
import IndustriesSection from '@/components/IndustriesSection';

export const metadata = {
  title: 'Jitesh Engineering Works | Milling, Drilling, Turning & Fabrication in Boisar, Palghar',
  description: 'Jitesh Engineering Works - All Milling, Drilling, Turning Machine & Fabrication. Specialist in Drilling Loom Spares & Textile Parts. M.I.D.C. Tarapur, Boisar, Palghar. Call +91 93233 97961.',
};

const services = [
  {
    icon: FaCog,
    title: 'CNC Machining',
    description: 'High-precision CNC turning and milling for complex parts with tight tolerances.',
    href: '/services/cnc-machining',
    image: '/images/cnc-millingwebp.jpg',
  },
  {
    icon: FaTools,
    title: 'Lathe & Turning',
    description: 'Expert lathe operations for shafts, bushings, and rotational components.',
    href: '/services/lathe-machining',
    image: '/images/lathe.jpg',
  },
  {
    icon: FaCut,
    title: 'Milling & Drilling',
    description: 'Precision milling and drilling operations for industrial components and spares.',
    href: '/services/sheet-metal-cutting',
    image: '/images/drilling.jpg',
  },
  {
    icon: FaWrench,
    title: 'Metal Fabrication',
    description: 'Complete fabrication and welding services for structural and industrial projects.',
    href: '/services/metal-fabrication',
    image: '/images/Metal_Fabrication.jpeg',
  },
  {
    icon: FaDraftingCompass,
    title: 'Textile Parts & Loom Spares',
    description: 'Specialist in drilling loom spares and all textile parts machining.',
    href: '/services/custom-parts',
    image: '/images/textile.jpg',
  },
  {
    icon: FaIndustry,
    title: 'Custom Parts',
    description: 'Prototype to production custom manufacturing for any industry requirement.',
    href: '/services/custom-parts',
    image: '/images/custom.jpg',
  },
];

const trustPoints = [
  '20+ Years of Experience',
  'ISO Quality Standards',
  '500+ Satisfied Clients',
  'On-Time Delivery Guarantee',
  'Advanced VMC Machines',
  'Competitive Pricing',
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Engineering workshop machines - welding, milling, lathe, grinding, buffing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-steel-900/75"></div>
        </div>
        <div className="container-custom section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-primary-200">Accepting New Orders</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Jitesh Engineering Works
              </h1>
              <p className="text-lg text-steel-300 mb-8 max-w-xl">
                All Milling, Drilling, Turning Machine, For Fabrication Etc.
                Specialist in Drilling Loom Spares & Textile Parts. 
                All Textile Parts Machining. Serving industries since 2005.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  Get Instant Quote
                  <FiArrowRight className="ml-2" />
                </Link>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  className="btn-whatsapp text-lg px-8 py-4"
                >
                  <FaWhatsapp className="mr-2" size={22} />
                  WhatsApp Us
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-steel-400">
                <a href="tel:+919323397961" className="flex items-center gap-2 hover:text-white">
                  <FiPhone /> +91 93233 97961
                </a>
                <span>|</span>
                <span>Boisar, Palghar</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-steel-700/50 rounded-2xl p-8 backdrop-blur-sm border border-steel-600/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-steel-800/80 rounded-xl p-6 text-center">
                      <p className="text-3xl font-bold text-primary-400">500+</p>
                      <p className="text-sm text-steel-400 mt-1">Projects Done</p>
                    </div>
                    <div className="bg-steel-800/80 rounded-xl p-6 text-center">
                      <p className="text-3xl font-bold text-primary-400">20+</p>
                      <p className="text-sm text-steel-400 mt-1">Years Experience</p>
                    </div>
                    <div className="bg-steel-800/80 rounded-xl p-6 text-center">
                      <p className="text-3xl font-bold text-primary-400">20+</p>
                      <p className="text-sm text-steel-400 mt-1">Machines</p>
                    </div>
                    <div className="bg-steel-800/80 rounded-xl p-6 text-center">
                      <p className="text-3xl font-bold text-primary-400">99%</p>
                      <p className="text-sm text-steel-400 mt-1">On-Time Delivery</p>
                    </div>
                    <div className="bg-steel-800/80 rounded-xl p-6 text-center col-span-2">
                      <p className="text-3xl font-bold text-primary-400">Â±0.01mm</p>
                      <p className="text-sm text-steel-400 mt-1">Accuracy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-steel-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-800 mb-4">
              Our Engineering Services
            </h2>
            <p className="text-steel-500 max-w-2xl mx-auto">
              Comprehensive machining and fabrication solutions for all your industrial needs. 
              From prototypes to batch production.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-steel-100 h-64"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-steel-900/90 via-steel-900/50 to-steel-900/20 group-hover:from-primary-900/90 group-hover:via-primary-900/50 transition-all duration-300"></div>
                </div>
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-3">
                    <service.icon className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-sm">{service.description}</p>
                  <span className="inline-flex items-center text-primary-300 text-sm font-medium mt-3 group-hover:text-white group-hover:gap-2 transition-all">
                    Learn More <FiArrowRight className="ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-steel-800 mb-6">
                Why Choose Jitesh Engineering Works?
              </h2>
              <p className="text-steel-500 mb-8">
                With over 20 years of experience in precision machining and metal fabrication, 
                we deliver high-quality components that meet exact specifications. Our state-of-the-art 
                workshop in Boisar, Palghar is equipped with advanced VMC machines and skilled technicians.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trustPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-steel-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/about" className="btn-secondary">
                  Learn More About Us
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="bg-steel-100 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-steel-800">Workshop Area</h4>
                  <p className="text-steel-500 text-sm">2000+ sq. ft. fully equipped facility</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-steel-800">Machines</h4>
                  <p className="text-steel-500 text-sm">Milling, Drilling, Turning & Fabrication</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-steel-800">Material Handling</h4>
                  <p className="text-steel-500 text-sm">MS, SS, Aluminium, Brass, Copper & more</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-steel-800">Specialist</h4>
                  <p className="text-steel-500 text-sm">Drilling Loom Spares & Textile Parts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <IndustriesSection />

      {/* CTA + Inquiry Form */}
      <section className="section-padding bg-steel-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-steel-800 mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-steel-500 mb-6">
                Send us your requirements or technical drawings and get a competitive quote within 24 hours. 
                We handle everything from single prototypes to batch production.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-steel-700">
                  <FiCheckCircle className="text-green-500" />
                  <span>Free quotation within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-steel-700">
                  <FiCheckCircle className="text-green-500" />
                  <span>Upload drawings (PDF, DWG, STEP, IGES)</span>
                </div>
                <div className="flex items-center gap-3 text-steel-700">
                  <FiCheckCircle className="text-green-500" />
                  <span>No minimum order quantity</span>
                </div>
                <div className="flex items-center gap-3 text-steel-700">
                  <FiCheckCircle className="text-green-500" />
                  <span>Competitive pricing guaranteed</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+919323397961" className="btn-primary">
                  <FiPhone className="mr-2" /> Call Now
                </a>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} className="btn-whatsapp">
                  <FaWhatsapp className="mr-2" /> WhatsApp
                </a>
              </div>
            </div>
            <InquiryFormPreview />
          </div>
        </div>
      </section>
    </>
  );
}






