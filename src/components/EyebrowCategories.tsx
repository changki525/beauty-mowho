'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

interface Category {
  num: string;
  title: string;
  en: string;
  image?: string;
  video?: string;
  desc: string;
  detail: string;
}

const categories: Category[] = [
  {
    num: '01',
    title: '콤보기법',
    en: 'Combo Technique',
    image: '/images/combo-technique.jpeg',
    desc: '자연눈썹과 메이크업의 장점을 결합한 복합 기법입니다.',
    detail: '앞머리는 자연스럽게, 꼬리는 또렷하게 입체감 있는 디자인',
  },
  {
    num: '02',
    title: '다이아헤어기법',
    en: 'Diamond Hair Technique',
    image: '/images/dia-hair-technique-new.jpeg',
    desc: '다이아몬드 패턴으로 한 올 한 올 섬세하게 표현하는 프리미엄 헤어스트로크 기법입니다.',
    detail: '실제 눈썹결처럼 자연스러운 결과를 만드는 시그니처 기법',
  },
  {
    num: '03',
    title: '메이크업기법',
    en: 'Makeup Technique',
    image: '/images/makeup-technique.jpeg',
    desc: '파우더를 바른 듯 은은하고 깔끔한 눈썹을 완성합니다.',
    detail: '매일 메이크업한 듯한 또렷하고 단정한 눈썹 표현',
  },
  {
    num: '04',
    title: '시술영상',
    en: 'Treatment Video',
    video: '/images/treatment-video.mp4',
    desc: '실제 시술 과정을 영상으로 확인하실 수 있습니다.',
    detail: '섬세하고 정확한 시술 과정을 직접 확인해보세요',
  },
];

function MediaCard({ cat }: { cat: Category }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div style={{ overflow: 'hidden', aspectRatio: '3/4', position: 'relative' }}>
      {cat.image ? (
        <img
          src={cat.image}
          alt={cat.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s var(--ease)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      ) : cat.video ? (
        <video
          ref={videoRef}
          src={cat.video}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : null}
    </div>
  );
}

export default function EyebrowCategories() {
  return (
    <section className="section" id="eyebrow" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label">Treatment Menu</p>
          <h2 className="section-title">Treatment Guide</h2>
          <div className="section-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="eyebrow-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                border: '1px solid var(--border)',
                transition: 'all 0.4s var(--ease)',
                overflow: 'hidden',
                background: '#fff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <MediaCard cat={cat} />

              {/* Text content */}
              <div style={{ padding: '32px 28px', position: 'relative' }}>
                <span style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '2.5rem',
                  fontWeight: 300,
                  color: 'var(--accent-light)',
                  opacity: 0.25,
                  position: 'absolute',
                  top: 20,
                  right: 24,
                  lineHeight: 1,
                }}>
                  {cat.num}
                </span>

                <h3 style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  marginBottom: 4,
                  color: 'var(--text-primary)',
                }}>
                  {cat.title}
                </h3>
                <p style={{
                  fontSize: '0.65rem',
                  letterSpacing: 3,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                  fontWeight: 400,
                }}>
                  {cat.en}
                </p>
                <div style={{ width: 24, height: 1, background: 'var(--accent-light)', marginBottom: 16 }} />
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: 8,
                }}>
                  {cat.desc}
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-light)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                }}>
                  {cat.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .eyebrow-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
