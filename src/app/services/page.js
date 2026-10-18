import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { FaCog, FaTools, FaCut, FaWrench, FaDraftingCompass } from 'react-icons/fa';

export const metadata = {
  title: 'Engineering Services | CNC Machining, Metal Fabrication, Lathe Work - Boisar, Palghar',
  description: 'Complete engineering services including CNC machining, lathe work, VMC milling & drilling, metal fabrication & welding, and custom parts manufacturing in Boisar, Palghar, Maharashtra.',
};

const services = [
  {
    icon: FaCog,
    title: 'CNC Machining Services',
    slug: 'cnc-machining',
    image: '/images/cnc-millingwebp.jpg',
    description: 'Precision CNC turning and milling operations for complex industrial components. We hold tight tolerances on our VMC for demanding parts.',
    features: ['CNC turning & milling', 'Tight tolerances', 'VMC machining', 'Complex geometries'],
  },
  {
    icon: FaTools,
    title: 'Lathe Machining Services',
    slug: 'lathe-machining',
    image: '/images/lathe.jpg',
    description: 'Expert conventional and CNC lathe operations for shafts, bushings, pulleys, and all rotational components. Single piece to batch production.',
    features: ['Shaft machining', 'Bushings & bearings', 'Threading operations', 'Batch production'],
  },
  {
    icon: FaCut,
    title: 'VMC Milling & Drilling',
    slug: 'sheet-metal-cutting',
    image: '/images/drilling.jpg',
    description: 'Vertical Machining Centre milling and precision drilling for flat and prismatic parts, slots, pockets, and tapped holes with VMC repeatability.',
    features: ['VMC milling', 'Precision drilling & tapping', 'Slots & pockets', 'Jigs & fixtures'],
  },
  {
    icon: FaWrench,
    title: 'Metal Fabrication & Welding',
    slug: 'metal-fabrication',
    image: '/images/Metal_Fabrication.jpeg',
    description: 'Complete metal fabrication services including MIG, TIG, and arc welding. From structural frameworks to custom assemblies and industrial equipment.',
    features: ['MIG / TIG / arc welding', 'Structural fabrication', 'Custom assemblies', 'Surface finishing'],
  },
  {
    icon: FaDraftingCompass,
    title: 'Custom Parts Manufacturing',
    slug: 'custom-parts',
    image: '/images/custom.jpg',
    description: 'End-to-end custom parts manufacturing from your drawings or samples. Prototype development to production runs with inspected quality.',
    features: ['Prototype development', 'Reverse engineering', 'Small batch production', 'Quality inspection'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-steel-800 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Engineering Services</h1>
          <p className="text-steel-300 max-w-2xl mx-auto text-lg">
            Comprehensive machining and fabrication solutions for automotive, construction, and industrial manufacturing sectors in Boisar, Palghar.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom space-y-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.slug}`}
              className="group relative block rounded-2xl p-8 shadow-sm border border-steel-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Hover image background (hidden until hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <img
                  src={service.image}
                  alt={`${service.title} at Jitesh Engineering Works, Boisar`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-steel-900/80"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-50 group-hover:bg-white/15 rounded-lg flex items-center justify-center transition-colors">
                      <service.icon className="text-primary-600 group-hover:text-white transition-colors" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-steel-800 group-hover:text-white transition-colors">{service.title}</h2>
                  </div>
                  <p className="text-steel-500 group-hover:text-steel-200 mb-4 transition-colors">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, i) => (
                      <span key={i} className="bg-steel-50 text-steel-600 group-hover:bg-white/15 group-hover:text-white px-3 py-1 rounded-full text-sm transition-colors">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <span className="btn-primary group-hover:bg-white group-hover:text-primary-600">
                    Learn More <FiArrowRight className="ml-2" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-padding bg-primary-600 text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Send us your drawings or requirements and get a detailed quote within 24 hours.
          </p>
          <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-steel-50 transition-colors text-lg">
            Get a Free Quote <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}






