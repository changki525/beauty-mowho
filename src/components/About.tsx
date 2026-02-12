'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="section-inner">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ overflow: 'hidden' }}
          >
            <video
              src="/images/diamond-feathering-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p style={{ fontSize: '0.65rem', letterSpacing: 5, color: 'var(--accent)', marginBottom: 20, fontWeight: 500, textTransform: 'uppercase' }}>
              Signature Technique
            </p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '2.4rem', fontWeight: 300, letterSpacing: 2, marginBottom: 24, lineHeight: 1.3 }}>
              Diamond<br />Feathering
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 2, marginBottom: 16 }}>
              다이아페더링은 한 올 한 올 자연스러운 눈썹결을 그려내는 최신 반영구 기법입니다. 기존 엠보 기법과 달리 탈각 과정이 없고, 시술 당일 세안이 가능하여 일상생활에 지장이 없습니다.
            </p>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 2, marginBottom: 16 }}>
              피부 표면에 미세한 다이아몬드 패턴으로 색소를 주입하여 마치 실제 눈썹처럼 자연스러운 결과를 만들어냅니다. 미대 출신 원장이 고객의 얼굴형, 이미지, 피부톤을 정밀 분석하여 1:1 맞춤 디자인을 제공합니다.
            </p>

            <div style={{ marginTop: 40, paddingTop: 40, borderTop: '1px solid var(--border)', display: 'flex', gap: 48 }}>
              {[
                { num: 'No', label: '탈각 과정 없음' },
                { num: 'Day 1', label: '당일 세안 가능' },
                { num: '1:1', label: '맞춤 디자인' },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--accent)' }}>{item.num}</div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: 2, color: 'var(--text-light)', marginTop: 4 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <style jsx global>{`
          @media (max-width: 1024px) {
            .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
