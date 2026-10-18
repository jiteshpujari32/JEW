'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 * Interactive projects gallery: category filtering + click-to-enlarge lightbox.
 *
 * Client component because both the filter and the lightbox need state. All
 * data (projects, categories, workshop gallery images) is passed in from the
 * server page so content stays in one place.
 */
export default function ProjectsGallery({ projects, categories, galleryImages }) {
  const [activeCat, setActiveCat] = useState('All');
  const [lightbox, setLightbox] = useState(null); // { list, index } or null

  const filteredProjects =
    activeCat === 'All' ? projects : projects.filter((p) => p.category === activeCat);

  // The lightbox can be opened from the project cards or the workshop grid, so
  // it carries its own image list and index.
  const openLightbox = (list, index) => setLightbox({ list, index });
  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (delta) =>
      setLightbox((lb) =>
        lb === null ? lb : { ...lb, index: (lb.index + delta + lb.list.length) % lb.list.length }
      ),
    []
  );

  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, step]);

  const projectImages = filteredProjects.map((p) => p.image);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCat === cat
                ? 'bg-primary-600 text-white'
                : 'bg-steel-100 text-steel-600 hover:bg-steel-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured project cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={project.title}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-steel-100 hover:shadow-lg transition-shadow"
          >
            <button
              type="button"
              onClick={() => openLightbox(projectImages, index)}
              aria-label={`View ${project.title} larger`}
              className="block w-full h-48 bg-steel-50 overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <img
                src={project.image}
                alt={`${project.title} - Jitesh Engineering Works`}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </button>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded-full font-medium">
                  {project.category}
                </span>
                <span className="bg-steel-50 text-steel-500 text-xs px-2 py-1 rounded-full">
                  {project.industry}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-steel-800 mb-2">{project.title}</h3>
              <p className="text-steel-500 text-sm mb-3">{project.description}</p>
              <p className="text-xs text-steel-400">
                <span className="font-medium">Material:</span> {project.material}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Full workshop gallery */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-steel-800 mb-6 text-center">More From Our Workshop</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryImages.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => openLightbox(galleryImages.map((g) => `/images/parts/${g}`), i)}
              aria-label={`View workshop photo ${i + 1} larger`}
              className="rounded-lg overflow-hidden aspect-square bg-steel-50 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <img
                src={`/images/parts/${img}`}
                alt={`Machined part ${i + 1} - Jitesh Engineering Works`}
                loading="lazy"
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button type="button" onClick={close} aria-label="Close" className="absolute top-4 right-4 text-white/90 hover:text-white p-2">
            <FiX size={32} />
          </button>
          {lightbox.list.length > 1 && (
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image" className="absolute left-2 md:left-6 text-white/80 hover:text-white p-2">
              <FiChevronLeft size={40} />
            </button>
          )}
          <img
            src={lightbox.list[lightbox.index]}
            alt={`Work sample ${lightbox.index + 1} - Jitesh Engineering Works`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />
          {lightbox.list.length > 1 && (
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image" className="absolute right-2 md:right-6 text-white/80 hover:text-white p-2">
              <FiChevronRight size={40} />
            </button>
          )}
          {lightbox.list.length > 1 && (
            <span className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
              {lightbox.index + 1} / {lightbox.list.length}
            </span>
          )}
        </div>
      )}
    </>
  );
}
