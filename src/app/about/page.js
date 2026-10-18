import Link from 'next/link';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export const metadata = {
  title: 'About Us | Jitesh Engineering Works - Engineering Workshop in Boisar, Palghar',
  description: 'Learn about Jitesh Engineering Works - 20+ years of experience in VMC machining, metal fabrication, and custom parts manufacturing in Boisar, Palghar, Maharashtra. ISO quality standards.',
};

const milestones = [
  { year: '2005', event: 'Founded in Boisar, Palghar with conventional lathe machines' },
  { year: '2013', event: 'Added sheet metal cutting and fabrication division' },
  { year: '2016', event: 'Expanded workshop, added milling machines' },
  { year: '2019', event: 'ISO quality standards adopted' },
  { year: '2022', event: 'Added more 100+ active clients' },
  { year: '2024', event: 'Advanced inspection and quality control setup' },
  { year: '2026', event: 'VMC Machine Loading' },
];

const machines = [
  { name: 'VMC Machines', count: '1', brand: 'Haas / BFW' },
  { name: 'Conventional Lathes', count: '7', brand: 'HMT / All Geared' },
  { name: 'Buffing Machine', count: '7', brand: '100T & 60T' },
  { name: 'Spot Welding Machine', count: '2', brand: 'MIG / TIG / Arc' },
  { name: 'Surface Grinders', count: '1', brand: 'Precision grade' },
  { name: 'Milling Machines', count: '2', brand: 'Radial & Pillar' },

];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-steel-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Jitesh Engineering Works</h1>
            <p className="text-steel-300 text-lg">
              A trusted name in precision machining and industrial fabrication in Boisar, Palghar since 2005.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-steel-800 mb-6">Our Story</h2>
              <div className="space-y-4 text-steel-600">
                <p>
                  Jitesh Engineering Works was founded in 2005 in M.I.D.C. Tarapur, Boisar, Palghar, 
                  with a vision to provide high-quality machining services to the growing industrial sector of Maharashtra.
                </p>
                <p>
                  Starting with just 2 conventional lathes and a small team of 5 skilled machinists, 
                  we have grown into a full-service engineering workshop spanning over 2,000 sq. ft. 
                  with 20+ advanced machines and a team of 30+ trained professionals.
                </p>
                <p>
                  Today, we serve 500+ clients across automotive, construction, machinery manufacturing, 
                  and industrial equipment sectors. Our commitment to quality, precision, and on-time delivery 
                  has made us one of the most trusted engineering workshops in Boisar, Palghar.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">20+</p>
                  <p className="text-xs text-steel-500 mt-1">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">500+</p>
                  <p className="text-xs text-steel-500 mt-1">Clients Served</p>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">30+</p>
                  <p className="text-xs text-steel-500 mt-1">Team Members</p>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <p className="text-2xl font-bold text-primary-600">20+</p>
                  <p className="text-xs text-steel-500 mt-1">Machines</p>
                </div>
              </div>
            </div>
            <div className="bg-steel-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-steel-800 mb-6">Our Journey</h3>
              <div className="space-y-4">
                {milestones.map((milestone, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-16 text-sm font-bold text-primary-600">{milestone.year}</div>
                    <div className="flex-grow text-sm text-steel-600 pb-4 border-b border-steel-200 last:border-0">
                      {milestone.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-steel-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-steel-800 mb-4 text-center">Workshop Capabilities</h2>
          <p className="text-steel-500 text-center mb-12 max-w-2xl mx-auto">
            Our 2000+ sq ft workshop houses 20+ machines for complete machining and fabrication capabilities.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {machines.map((machine, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-steel-100">
                <p className="text-3xl font-bold text-primary-600">{machine.count}</p>
                <p className="text-steel-800 font-semibold mt-1">{machine.name}</p>
                <p className="text-sm text-steel-500 mt-1">{machine.brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-steel-800 mb-8 text-center">Why Clients Trust Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-steel-800 mb-2">Quality Assured</h3>
              <p className="text-steel-500 text-sm">
                ISO 9001:2015 certified processes. Every component undergoes strict quality inspection before delivery.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-steel-800 mb-2">On-Time Delivery</h3>
              <p className="text-steel-500 text-sm">
                99% on-time delivery record. We understand the importance of timelines in manufacturing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-primary-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-steel-800 mb-2">Competitive Pricing</h3>
              <p className="text-steel-500 text-sm">
                Direct workshop pricing without middlemen. We offer the best value for precision machining in Boisar, Palghar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-steel-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Located in Palghar&apos;s Industrial Belt</h2>
          <p className="text-steel-300 mb-8 max-w-xl mx-auto">
            Conveniently located in M.I.D.C. Tarapur, Boisar - well connected to Mumbai and all major industrial areas of Maharashtra.
          </p>
          <p className="text-steel-400 mb-8">
            Plot No. W/12, Near Custom Capsule, Camlin Naka, M.I.D.C. Tarapur, Boisar, Dist. Palghar - 401 506
          </p>
          <Link href="/contact" className="btn-primary text-lg">
            Visit Our Workshop <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}


