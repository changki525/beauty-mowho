'use client';

import { motion } from 'framer-motion';

const contactInfo = [
  { label: 'Location', value: '세종특별자치시 다솜1로 21' },
  { label: 'Phone', value: '010-7316-7783' },
  { label: 'Hours', value: 'AM 10:00 - PM 8:00' },
];

export default function Contact() {
  return (
    <section className="section" id="contact" style={{ background: 'var(--bg-warm)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="/images/da5e1e1a8c.jpeg" alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08 }} />
      </div>

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="section-header">
            <p className="section-label">Reservation</p>
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-divider" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 80, marginTop: 60 }} className="contact-info">
            {contactInfo.map((item) => (
              <div key={item.label}>
                <p style={{ fontSize: '0.65rem', letterSpacing: 4, textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 8 }}>{item.label}</p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, letterSpacing: 1 }}>{item.value}</p>
              </div>
            ))}
          </div>

          <a
            href="tel:010-7316-7783"
            style={{
              display: 'inline-block', marginTop: 60, padding: '18px 56px',
              background: 'var(--bg-dark)', color: '#fff',
              fontSize: '0.72rem', letterSpacing: 3, textTransform: 'uppercase',
              transition: 'all 0.4s var(--ease)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-dark)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Book Now
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .contact-info { flex-direction: column !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
