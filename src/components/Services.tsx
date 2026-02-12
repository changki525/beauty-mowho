'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: string;
  tab: string;
  ko: string;
  video?: string;
  image?: string;
  headline: string;
  desc: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 'eyebrow',
    tab: 'Eyebrow',
    ko: '눈썹',
    video: '/images/diamond-feathering-eyebrow.mp4',
    headline: 'Diamond\nFeathering',
    desc: '한 올 한 올 자연스러운 결을 살리는\n다이아페더링·콤보 눈썹 맞춤 디자인',
    features: ['탈각 과정 없음', '당일 세안 가능', '1:1 맞춤 디자인'],
  },
  {
    id: 'lip',
    tab: 'Lip',
    ko: '입술',
    video: '/images/lip-touch-video.mp4',
    headline: 'Waterful\nSyrup Lip',
    desc: '워터풀시럽립 기법으로\n맑고 화사한 입술 톤업',
    features: ['자연스러운 발색', '통증 최소화', '촉촉한 마무리'],
  },
  {
    id: 'eyeliner',
    tab: 'Eyeliner',
    ko: '아이라인',
    video: '/images/eyeliner-video.mp4',
    headline: 'Natural\nEyeliner',
    desc: '붓기·통증 없이\n청순하고 또렷한 눈매 완성',
    features: ['무붓기 시술', '자연스러운 라인', '또렷한 눈매'],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)' }}>
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {current.video ? (
            <video
              src={current.video}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                ...(current.id === 'lip' ? { objectPosition: '50% 70%' } : {}),
              }}
            />
          ) : (
            <img
              src={current.image}
              alt={current.ko}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                ...(current.id === 'eyeliner' ? { transform: 'scale(1.8)', objectPosition: '50% 30%' } : {}),
              }}
            />
          )}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)',
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px', maxWidth: 1400, margin: '0 auto' }}
        className="services-content"
      >
        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 60 }} className="services-tabs">
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? 'rgba(196,168,130,0.2)' : 'rgba(255,255,255,0.08)',
                border: active === i ? '1.5px solid var(--accent-light)' : '1.5px solid rgba(255,255,255,0.2)',
                borderRadius: 40,
                cursor: 'pointer',
                padding: '16px 36px',
                position: 'relative',
                transition: 'all 0.4s var(--ease)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                if (active !== i) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (active !== i) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }
              }}
            >
              <span style={{
                fontSize: '0.9rem',
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: active === i ? '#fff' : 'rgba(255,255,255,0.6)',
                transition: 'color 0.4s',
                fontFamily: 'var(--sans)',
                fontWeight: active === i ? 600 : 400,
                display: 'block',
              }}>
                {s.tab}
              </span>
              <span style={{
                display: 'block',
                fontSize: '0.75rem',
                letterSpacing: 2,
                color: active === i ? 'var(--accent-light)' : 'rgba(255,255,255,0.4)',
                marginTop: 6,
                transition: 'color 0.4s',
                fontWeight: active === i ? 500 : 300,
              }}>
                {s.ko}
              </span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontSize: '0.65rem',
              letterSpacing: 5,
              textTransform: 'uppercase',
              color: 'var(--accent-light)',
              marginBottom: 20,
              fontWeight: 400,
            }}>
              Our Services
            </p>

            <h2 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 300,
              letterSpacing: 4,
              lineHeight: 1.15,
              color: '#fff',
              whiteSpace: 'pre-line',
              marginBottom: 32,
            }}>
              {current.headline}
            </h2>

            <p style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 2,
              whiteSpace: 'pre-line',
              marginBottom: 40,
              maxWidth: 420,
              fontWeight: 300,
            }}>
              {current.desc}
            </p>

            {/* Feature tags */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }} className="services-features">
              {current.features.map((f) => (
                <span
                  key={f}
                  style={{
                    padding: '8px 20px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: '0.72rem',
                    letterSpacing: 2,
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 300,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom: service number indicator */}
        <div style={{
          position: 'absolute',
          bottom: 48,
          right: 48,
          display: 'flex',
          alignItems: 'baseline',
          gap: 8,
          color: 'rgba(255,255,255,0.2)',
        }}
          className="services-indicator"
        >
          <span style={{ fontFamily: 'var(--serif)', fontSize: '3rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}>
            {String(active + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '0.75rem', letterSpacing: 2 }}>/</span>
          <span style={{ fontSize: '0.75rem', letterSpacing: 2 }}>
            {String(services.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .services-content {
            padding: 0 20px !important;
          }
          .services-tabs {
            margin-bottom: 40px !important;
          }
          .services-tabs button {
            padding: 14px 24px !important;
          }
          .services-tabs button span:first-child {
            font-size: 0.82rem !important;
          }
          .services-features {
            gap: 8px !important;
          }
          .services-features span {
            padding: 6px 14px !important;
            font-size: 0.65rem !important;
          }
          .services-indicator {
            bottom: 24px !important;
            right: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
