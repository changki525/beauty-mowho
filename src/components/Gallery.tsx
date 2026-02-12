'use client';

import { motion } from 'framer-motion';

const images = [
  { src: '/images/577a30e4d3.jpeg', alt: '세종입술문신 워터풀시럽립' },
  { src: '/images/afe2193328.jpeg', alt: '세종시입술문신 입매교정' },
  { src: '/images/4dd512fa9d.jpeg', alt: '세종시눈썹문신 남자눈썹' },
  { src: '/images/df21356d04.jpeg', alt: '세종아이라인문신' },
  { src: '/images/diamond-feathering.jpeg', alt: '다이아페더링 시술' },
];

export default function Gallery() {
  return (
    <section className="section" id="gallery" style={{ background: 'var(--bg-dark)' }}>
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label" style={{ color: 'var(--accent-light)' }}>Portfolio</p>
          <h2 className="section-title" style={{ color: '#fff' }}>Our Work</h2>
          <div className="section-divider" style={{ background: 'var(--accent-light)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }} className="gallery-grid">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '1',
                cursor: 'pointer',
                ...(i === 0 ? { gridColumn: 'span 2', gridRow: 'span 2' } : {}),
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s var(--ease)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </motion.div>
          ))}
        </div>

        <style jsx global>{`
          @media (max-width: 1024px) {
            .gallery-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .gallery-grid > div:first-child {
              grid-column: span 2 !important;
              grid-row: span 1 !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
