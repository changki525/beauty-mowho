'use client';

import { motion } from 'framer-motion';

const buttons = [
  { label: '전화 예약', href: 'tel:010-7316-7783', primary: true, icon: 'M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z' },
  { label: '카카오톡', href: 'https://open.kakao.com/o/szj8Qwob', icon: 'M12 3C6.48 3 2 6.58 2 11c0 2.83 1.88 5.31 4.7 6.72-.16.58-.58 2.12-.67 2.45-.1.41.15.4.32.29.13-.09 2.09-1.4 2.94-1.97.88.13 1.78.2 2.71.2 5.52 0 10-3.58 10-8S17.52 3 12 3z' },
  { label: 'Instagram', href: 'https://www.instagram.com/p/Crx8J6xLEvP/', icon: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2zm-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z' },
  { label: 'Blog', href: 'https://blog.naver.com/mipoomdal', icon: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2h5v8H6V8zm7 0h5v3h-5V8zm0 5h5v3h-5v-3z' },
];

export default function Hero() {
  return (
    <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="/images/hero-bg.jpeg" alt="beauty mowho" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.2)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)' }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff', maxWidth: 800, padding: '0 24px' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: 6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
          Semi-Permanent Makeup Studio
        </p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, letterSpacing: 8, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: 24 }}>
          beauty mowho
        </h1>
        <p style={{ fontSize: '0.95rem', fontWeight: 200, letterSpacing: 3, color: 'rgba(255,255,255,0.6)', marginBottom: 48 }}>
          미대출신 원장의 섬세한 맞춤 디자인
        </p>
        {/* Service shortcut buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 36 }} className="service-shortcuts">
          {[
            { label: 'Eyebrow', ko: '눈썹', index: 0 },
            { label: 'Lip', ko: '입술', index: 1 },
            { label: 'Eyeliner', ko: '아이라인', index: 2 },
          ].map((item) => (
            <button
              key={item.label}
              className="service-shortcut-btn"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('selectService', { detail: item.index }));
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 40,
                padding: '14px 32px',
                cursor: 'pointer',
                transition: 'all 0.4s var(--ease)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(196,168,130,0.3)';
                e.currentTarget.style.borderColor = 'var(--accent-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              }}
            >
              <span style={{ fontSize: '0.85rem', letterSpacing: 3, textTransform: 'uppercase', color: '#fff', fontWeight: 500 }}>
                {item.label}
              </span>
              <span style={{ fontSize: '0.7rem', letterSpacing: 2, color: 'var(--accent-light)', fontWeight: 300 }}>
                {item.ko}
              </span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }} className="hero-buttons">
          {buttons.map((btn) => (
            <a key={btn.label} href={btn.href} target={btn.href.startsWith('tel') ? undefined : '_blank'} rel={btn.href.startsWith('tel') ? undefined : 'noopener noreferrer'}
              className="hero-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px',
                border: btn.primary ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.4)',
                background: btn.primary ? 'var(--accent)' : 'transparent',
                fontSize: '0.85rem', letterSpacing: 2, textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap' as const,
                transition: 'all 0.4s var(--ease)', fontFamily: 'var(--sans)', fontWeight: 400,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = btn.primary ? 'var(--accent)' : 'var(--bg-dark)'; if (btn.primary) e.currentTarget.style.borderColor = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = btn.primary ? 'var(--accent)' : 'transparent'; e.currentTarget.style.color = '#fff'; if (btn.primary) e.currentTarget.style.borderColor = 'var(--accent)'; }}
            >
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: 'currentColor', flexShrink: 0 }}><path d={btn.icon} /></svg>
              {btn.label}
            </a>
          ))}
        </div>
      </motion.div>

      <div style={{ position: 'absolute', bottom: 40, left: '50%', width: 1, height: 60, background: 'rgba(255,255,255,0.2)' }}>
        <div style={{ position: 'absolute', top: 0, width: 1, height: 20, background: 'rgba(255,255,255,0.8)', animation: 'scrollDown 2s infinite' }} />
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .service-shortcuts {
            gap: 10px !important;
          }
          .service-shortcut-btn {
            padding: 10px 20px !important;
          }
          .service-shortcut-btn span:first-child {
            font-size: 0.75rem !important;
          }
          .hero-buttons {
            gap: 8px !important;
          }
          .hero-btn {
            padding: 12px 16px !important;
            font-size: 0.72rem !important;
            gap: 6px !important;
            letter-spacing: 1px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-buttons {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .hero-btn {
            justify-content: center !important;
            padding: 12px 8px !important;
            font-size: 0.68rem !important;
          }
        }
      `}</style>
    </section>
  );
}
