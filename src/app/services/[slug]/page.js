import Link from 'next/link';
import { FiCheckCircle, FiArrowRight, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import WorkSamples from '@/components/WorkSamples';

const servicesData = {
  'cnc-machining': {
    title: 'CNC Machining Services in Boisar, Palghar',
    metaTitle: 'CNC Machining Services Boisar Palghar | Precision CNC Turning & Milling',
    metaDescription: 'Professional CNC machining services in Boisar, Palghar. High-precision CNC turning and milling for automotive, industrial, and custom parts. Tolerances up to Â±0.01mm. Get a free quote.',
    hero: 'Precision CNC Machining Services',
    description: 'Our state-of-the-art CNC machining center delivers high-precision components with tolerances as tight as Â±0.01mm. We specialize in both CNC turning and milling operations for complex industrial parts.',
    images: ['/images/parts/cnc-1.jpg', '/images/parts/cnc-2.jpg', '/images/parts/cnc-3.jpg', '/images/parts/cnc-4.jpg', '/images/parts/cnc-5.jpg', '/images/parts/cnc-6.jpg', '/images/parts/cnc-7.jpg', '/images/parts/cnc-8.jpg', '/images/parts/cnc-9.jpg', '/images/parts/cnc-10.jpg', '/images/parts/cnc-11.jpg'],
    features: [
      'Tolerances up to Â±0.01mm',
      'Complex geometry machining',
      'Thread cutting and tapping',
      'Surface finishing (grinding, polishing)',
      'Batch production capability',
      'Quick turnaround times',
    ],
    materials: ['Mild Steel (MS)', 'Stainless Steel (SS 304, 316)', 'Aluminium (6061, 7075)', 'Brass', 'Copper', 'Nylon & Delrin', 'Cast Iron', 'Tool Steel'],
    industries: ['Automotive', 'Aerospace', 'Industrial Machinery', 'Oil & Gas', 'Medical Equipment', 'Electronics'],
    machines: [ 'Haas VF-2 Milling Machine', 'Lathe Machine', 'VMC with 3rd Axis'],
  },
  'lathe-machining': {
    title: 'Lathe Machining Services in Boisar, Palghar',
    metaTitle: 'Lathe Machining Services Boisar Palghar | Expert Turning & Boring Work',
    metaDescription: 'Expert lathe machining services in Boisar, Palghar for shafts, bushings, pulleys, and rotational parts. Conventional and CNC lathe operations. Competitive rates. Get a quote.',
    hero: 'Expert Lathe Machining Services',
    description: 'Our experienced machinists deliver precise lathe work for all types of rotational components. From single prototypes to high-volume production, we handle shafts, bushings, pulleys, and complex turned parts.',
    images: ['/images/parts/lathe-1.jpg', '/images/parts/lathe-2.jpg', '/images/parts/lathe-3.jpg', '/images/parts/lathe-4.jpg', '/images/parts/lathe-5.jpg', '/images/parts/lathe-6.jpg', '/images/parts/lathe-7.jpg', '/images/parts/lathe-8.jpg', '/images/parts/lathe-9.jpg', '/images/parts/lathe-10.jpg'],
    features: [
      'Conventional lathe operations',
      'lathe turning',
      'Shaft machining up to 3m length',
      'Internal and external threading',
      'Boring and reaming',
      'Taper turning',
      'Knurling and grooving',
      'Face grinding',
    ],
    materials: ['Mild Steel', 'EN8 / EN24 / EN36 Steel', 'Stainless Steel', 'Aluminium', 'Brass', 'Bronze', 'Cast Iron', 'Plastic (Nylon, PTFE)'],
    industries: ['Automotive', 'Pumps & Valves', 'Textile Machinery', 'Agriculture Equipment', 'Construction'],
    machines: ['HMT NH-26 Lathe', 'All Geared Heavy Duty Lathe', 'CNC Turning Center', 'Turret Lathe'],
  },
  'sheet-metal-cutting': {
    title: 'VMC Milling & Drilling Services in Boisar, Palghar',
    metaTitle: 'VMC Milling & Drilling Boisar Palghar | CNC Vertical Machining Centre',
    metaDescription: 'VMC milling and drilling services in Boisar, Palghar, Maharashtra. Vertical machining centre work for flat and prismatic components, slots, pockets, holes and tapping with repeatable accuracy. Get a free quote.',
    hero: 'VMC Milling & Drilling',
    description: 'Vertical Machining Centre (VMC) milling and precision drilling for flat and prismatic components. We produce slots, pockets, faced surfaces, drilled and tapped holes, and multi-feature parts to your drawings, with the repeatability a CNC VMC gives over manual machines. Ideal for jigs, fixtures, base plates, housings, and batch production of machined parts.',
    images: ['/images/parts/cnc-1.jpg', '/images/parts/cnc-2.jpg', '/images/parts/cnc-3.jpg', '/images/parts/cnc-4.jpg', '/images/parts/cnc-5.jpg', '/images/parts/lathe-1.jpg', '/images/parts/lathe-2.jpg', '/images/parts/lathe-3.jpg'],
    features: [
      'VMC milling (flat & prismatic parts)',
      'Precision drilling & tapping',
      'Slots, pockets & facing',
      'Jigs, fixtures & base plates',
      'Multi-feature machined parts',
    ],
    materials: ['Mild Steel (MS)', 'Stainless Steel (SS 304, 316)', 'Aluminium (6061, 7075)', 'Brass', 'Cast Iron', 'Tool Steel'],
    industries: ['Industrial Machinery', 'Automotive', 'Textile Machinery', 'Tool Rooms', 'OEM Manufacturers', 'Maintenance & Repair'],
    machines: ['Vertical Machining Centre (CNC)', 'Radial Drilling Machine', 'Pillar Drilling Machine', 'Surface Grinder'],
  },
  'metal-fabrication': {
    title: 'Metal Fabrication & Welding Services in Boisar, Palghar',
    metaTitle: 'Metal Fabrication & Welding Boisar Palghar | MIG, TIG, Arc Welding Services',
    metaDescription: 'Complete metal fabrication and welding services in Boisar, Palghar. MIG, TIG, Arc welding for structural steel, frames, assemblies. ISO quality. Request a quote.',
    hero: 'Metal Fabrication & Welding',
    description: 'Our fabrication shop handles everything from simple brackets to complex structural assemblies. Certified welders with expertise in MIG, TIG, and arc welding ensure strong, clean welds every time.',
    images: ['/images/parts/fabrication-1.jpg', '/images/parts/fabrication-2.jpg', '/images/parts/fabrication-3.jpg'],
    features: [
      'MIG welding (all materials)',
      'TIG welding (SS, Aluminium)',
      'Arc welding (structural)',
      'Structural steel fabrication',
      'Frame and chassis building',
      'Pipe and tube fabrication',
      'Assembly and sub-assembly',
      'Surface treatment and painting',
    ],
    materials: ['Structural Steel', 'Stainless Steel', 'Aluminium', 'MS Angles & Channels', 'MS Pipes & Tubes', 'Square & Rectangular Tubes'],
    industries: ['Construction', 'Industrial Equipment', 'Material Handling', 'Automotive', 'Agriculture', 'Infrastructure'],
    machines: ['MIG Welding Machines', 'TIG Welding Set', 'Plasma Cutting', 'Drilling Machine', 'Grinding & Polishing'],
  },
  'custom-parts': {
    title: 'Custom Parts Manufacturing in Boisar, Palghar',
    metaTitle: 'Custom Parts Manufacturing Boisar Palghar | Prototype to Production',
    metaDescription: 'Custom industrial parts manufacturing in Boisar, Palghar. From prototype development to batch production. Send your drawings for a free quote. Quick turnaround.',
    hero: 'Custom Parts Manufacturing',
    description: 'We manufacture custom parts from your technical drawings, 3D models, or even physical samples. Whether you need a single prototype or production batches, we deliver precision-machined components on time.',
    images: ['/images/parts/textile-1.jpg', '/images/parts/textile-2.jpg', '/images/parts/textile-3.jpg', '/images/parts/textile-4.jpg', '/images/parts/textile-5.jpg', '/images/parts/textile-6.jpg', '/images/parts/textile-7.jpg', '/images/parts/textile-8.jpg', '/images/parts/textile-9.jpg', '/images/parts/textile-10.jpg', '/images/parts/textile-11.jpg', '/images/parts/textile-12.jpg', '/images/parts/textile-13.jpg', '/images/parts/textile-14.jpg', '/images/parts/textile-15.jpg'],
    features: [
      'Prototype development',
      'Reverse engineering from samples',
      'Small batch production (10-1000 pcs)',
      'Medium batch production',
      'Assembly services',
      'Quality inspection & documentation',
      'Material sourcing',
      'Design assistance (DFM)',
    ],
    materials: ['All Metals (Steel, SS, Aluminium, Brass)', 'Engineering Plastics', 'Composites', 'Rubber Parts', 'Castings (Sand, Die, Investment)'],
    industries: ['All Industries', 'R&D Labs', 'Startups', 'OEM Manufacturers', 'Maintenance & Repair'],
    machines: ['Full Machine Setup', 'Conventional Machines', 'Inspection Equipment (CMM)', 'Surface Finish Testers'],
  },
};

// Single source of truth for the service routes, derived from `servicesData` so
// the two can never drift. `src/app/sitemap.js` consumes this list instead of
// duplicating the slugs, so adding a service here also adds it to the sitemap.
export const SERVICE_SLUGS = Object.keys(servicesData);

export async function generateMetadata({ params }) {
  const service = servicesData[params.slug];
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export default function ServicePage({ params }) {
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-steel-800 to-primary-900 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.hero}</h1>
            <p className="text-steel-300 text-lg mb-8">{service.description}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary text-lg">
                Get Quote <FiArrowRight className="ml-2" />
              </Link>
              <a href="https://wa.me/918308383673" className="btn-whatsapp text-lg">
                <FaWhatsapp className="mr-2" /> WhatsApp
              </a>
              <a href="tel:+919323397961" className="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white rounded-lg hover:bg-white/10">
                <FiPhone className="mr-2" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Work Samples */}
      <WorkSamples images={service.images} title={service.title} initial={6} />

      {/* Features */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-steel-800 mb-6">What We Offer</h2>
              <div className="space-y-3">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-steel-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-steel-800 mb-6">Materials We Work With</h2>
              <div className="flex flex-wrap gap-3">
                {service.materials.map((material, i) => (
                  <span key={i} className="bg-steel-100 text-steel-700 px-4 py-2 rounded-lg text-sm font-medium">
                    {material}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-steel-800 mt-8 mb-4">Industries Served</h3>
              <div className="flex flex-wrap gap-2">
                {service.industries.map((industry, i) => (
                  <span key={i} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machines */}
      <section className="section-padding bg-steel-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-steel-800 mb-8 text-center">Our Machines & Equipment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.machines.map((machine, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border border-steel-100">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-600 font-bold">{i + 1}</span>
                </div>
                <p className="text-steel-700 font-medium text-sm">{machine}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-600 text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Upload your technical drawings and get a competitive quote within 24 hours. No minimum order quantity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-steel-50 transition-colors">
              Request a Quote <FiArrowRight className="ml-2" />
            </Link>
            <a href="https://wa.me/918308383673" className="inline-flex items-center px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
              <FaWhatsapp className="mr-2" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}









