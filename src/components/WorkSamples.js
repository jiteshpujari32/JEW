'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 * Work-samples gallery for a service page.
 *
 * Shows the first `initial` images, then a "Load More" button reveals the rest.
 * Clicking any image opens it enlarged in a lightbox overlay with prev/next and
 * close (click outside, X button, or Escape). Client component: the reveal and
 * the lightbox both need state. Image list is passed from the server component.
 */
export default function WorkSamples({ images, title, initial = 6 }) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState(null); // index of open image, or null

  const visible = expanded ? images : (images || []).slice(0, initial);
  const hasMore = (images || []).length > initial;

  const close = useCallback(() => setLightbox(null), []);
  const show = useCallback(
    (delta) => setLightbox((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images]
  );

  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') show(1);
      else if (e.key === 'ArrowLeft') show(-1);
    };
    window.addEventListener('keydown', onKey);
    // Prevent the page behind from scrolling while the lightbox is open.
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, show]);

  if (!images || images.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-steel-800 mb-8 text-center">Our Work Samples</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {visible.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`View ${title} sample ${i + 1} larger`}
              className="group rounded-xl overflow-hidden shadow-sm border border-steel-100 bg-steel-50 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <img
                src={img}
                alt={`${title} sample work ${i + 1} - Jitesh Engineering Works`}
                loading={i < initial ? 'eager' : 'lazy'}
                className="w-full h-56 md:h-64 object-contain group-hover:opacity-90 transition-opacity duration-200"
              />
            </button>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="btn-primary"
            >
              {expanded ? 'Show Less' : `Load More (${images.length - initial} more)`}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox overlay */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 text-white/90 hover:text-white p-2"
          >
            <FiX size={32} />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); show(-1); }}
              aria-label="Previous image"
              className="absolute left-2 md:left-6 text-white/80 hover:text-white p-2"
            >
              <FiChevronLeft size={40} />
            </button>
          )}

          <img
            src={images[lightbox]}
            alt={`${title} sample work ${lightbox + 1} - Jitesh Engineering Works`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); show(1); }}
              aria-label="Next image"
              className="absolute right-2 md:right-6 text-white/80 hover:text-white p-2"
            >
              <FiChevronRight size={40} />
            </button>
          )}

          {images.length > 1 && (
            <span className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
              {lightbox + 1} / {images.length}
            </span>
          )}
        </div>
      )}
    </section>
  );
}
