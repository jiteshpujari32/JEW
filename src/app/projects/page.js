import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import ProjectsGallery from '@/components/ProjectsGallery';

export const metadata = {
  title: 'Our Projects & Gallery | CNC Machined Parts, Fabrication Work - Boisar, Palghar',
  description: 'View our completed projects including CNC machined components, lathe turned parts, and textile loom spares. Quality work from our Boisar, Palghar workshop.',
};

const projects = [
  { title: 'CNC Machined Components', category: 'CNC Machining', description: 'High-precision CNC turning and milling of complex industrial components on our VMC.', material: 'MS / SS / Aluminium', industry: 'Industrial', image: '/images/parts/cnc-1.jpg' },
  { title: 'Precision CNC Parts', category: 'CNC Machining', description: 'Tight-tolerance machined parts produced to customer drawings.', material: 'Steel / Brass', industry: 'Machinery', image: '/images/parts/cnc-4.jpg' },
  { title: 'Complex CNC Work', category: 'CNC Machining', description: 'Multi-feature components machined with repeatable accuracy.', material: 'Alloy Steel', industry: 'Manufacturing', image: '/images/parts/cnc-7.jpg' },
  { title: 'Lathe Turned Components', category: 'Lathe Machining', description: 'Precision turning of shafts, bushings and rotational parts.', material: 'EN8 / EN24', industry: 'Automotive', image: '/images/parts/lathe-1.jpg' },
  { title: 'Turned Shaft Work', category: 'Lathe Machining', description: 'Shafts and spindles turned to exact dimensions and finish.', material: 'Mild Steel', industry: 'Pumps & Valves', image: '/images/parts/lathe-4.jpg' },
  { title: 'Bushings & Rotational Parts', category: 'Lathe Machining', description: 'Bushings, pulleys and bearing housings on conventional and CNC lathes.', material: 'Bronze / Steel', industry: 'Machinery', image: '/images/parts/lathe-8.jpg' },
  { title: 'Drilling Loom Spares', category: 'Textile Parts', description: 'Specialist machining of drilling loom spares for the textile industry.', material: 'EN8 Steel', industry: 'Textile', image: '/images/parts/textile-1.jpg' },
  { title: 'Textile Machine Components', category: 'Textile Parts', description: 'All types of textile machine parts machined to exact specifications.', material: 'Various Metals', industry: 'Textile', image: '/images/parts/textile-6.jpg' },
  { title: 'Loom Spare Parts', category: 'Textile Parts', description: 'Replacement loom spares manufactured from samples or drawings.', material: 'Alloy Steel', industry: 'Textile', image: '/images/parts/textile-12.jpg' },
  { title: 'Fabricated Assembly', category: 'Fabrication', description: 'Metal fabrication and welding of industrial assemblies and structures.', material: 'MS / SS', industry: 'Industrial Equipment', image: '/images/parts/fabrication-1.jpg' },
  { title: 'Welded Steel Structure', category: 'Fabrication', description: 'MIG, TIG and arc welded frames and structural components.', material: 'Structural Steel', industry: 'Construction', image: '/images/parts/fabrication-2.jpg' },
  { title: 'Custom Fabrication Work', category: 'Fabrication', description: 'Made-to-order fabricated equipment built to customer specification.', material: 'MS / SS', industry: 'Machinery', image: '/images/parts/fabrication-3.jpg' },
];

const categories = ['All', 'CNC Machining', 'Lathe Machining', 'Textile Parts', 'Fabrication'];

const galleryImages = [
  ...Array.from({ length: 11 }, (_, i) => `cnc-${i + 1}.jpg`),
  ...Array.from({ length: 10 }, (_, i) => `lathe-${i + 1}.jpg`),
  ...Array.from({ length: 15 }, (_, i) => `textile-${i + 1}.jpg`),
  ...Array.from({ length: 3 }, (_, i) => `fabrication-${i + 1}.jpg`),
];

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-steel-800 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects & Work Gallery</h1>
          <p className="text-steel-300 max-w-2xl mx-auto text-lg">
            Showcasing our precision engineering work across CNC machining, lathe turning, and textile parts.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <ProjectsGallery projects={projects} categories={categories} galleryImages={galleryImages} />
        </div>
      </section>

      <section className="section-padding bg-primary-600 text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-4">Have a Similar Project?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Send us your requirements or drawings and get a competitive quote. We handle projects of all sizes.
          </p>
          <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-steel-50 transition-colors text-lg">
            Request a Quote <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}

