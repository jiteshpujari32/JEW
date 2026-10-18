'use client';

import { useState, useEffect, useRef } from 'react';

const industriesData = {
  Pharmaceutical: {
    companies: [
      'Hindustan Unilever Limited',
      'Custom Capsule',
      'Welex Laboratories Pvt. Ltd.',
    ],
  },
  Textile: {
    companies: [
      'Siyaram Silk Mills Ltd',
      'Sumangal Silk Mills Pvt Ltd',
      'Sanskruti Fabrics',
      'Shree Reyon P Ltd',
      'Wavelink Fabric LLP',
      'Olive Tex Silk Mills Pvt. Ltd',
    ],
  },
  Food: {
    companies: [
      'Vasudhara Dairy',
      'M/s Kaira District Co-operative Milk Producers Union Ltd',
      'Heritage Foods Ltd',
      'Heritage Novandie Foods Pvt. Ltd.',
    ],
  },
  Automotive: {
    companies: [
    ],
  },
  Construction: {
    companies: [
      
    ],
  },
  'Machinery Manufacturing': {
    companies: [
      
    ],
  },
  'Industrial Equipment': {
    companies: [
      
    ],
  },
  Agriculture: {
    companies: [
      
    ],
  },
};

export default function IndustriesSection() {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (selectedIndustry) {
      // Auto-close after 5 seconds
      timerRef.current = setTimeout(() => {
        setSelectedIndustry(null);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [selectedIndustry]);

  const handleClick = (industry) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setSelectedIndustry(selectedIndustry === industry ? null : industry);
  };

  const industries = Object.keys(industriesData);

  return (
    <section className="section-padding bg-primary-600 text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
        <p className="text-primary-100 mb-10 max-w-2xl mx-auto">
          Trusted by leading companies across multiple industries. Click on any industry to see our clients.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((industry, index) => (
            <button
              key={index}
              onClick={() => handleClick(industry)}
              className={`border rounded-full px-6 py-3 text-sm font-medium transition-all cursor-pointer ${
                selectedIndustry === industry
                  ? 'bg-white text-primary-600 border-white shadow-lg'
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Companies - Horizontal scrolling strip */}
        {selectedIndustry && (
          <div className="mt-8">
            <p className="text-primary-200 text-sm mb-4">{selectedIndustry} — Our Clients</p>
            <div className="flex flex-wrap justify-center gap-3">
              {industriesData[selectedIndustry].companies.map((company, i) => (
                <span
                  key={i}
                  className="bg-white text-primary-700 rounded-full px-5 py-2 text-sm font-semibold shadow-md"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
