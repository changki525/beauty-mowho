"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        padding: '128px 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000 0%, rgba(57, 255, 20, 0.05) 50%, #000 100%)',
      }}
    >
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            position: 'relative',
            textAlign: 'center',
            padding: '64px 48px',
            borderRadius: '24px',
            border: '1px solid rgba(57, 255, 20, 0.2)',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            background: 'rgba(57, 255, 20, 0.05)',
            filter: 'blur(40px)',
            zIndex: -1,
          }} />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 'bold', color: '#fff' }}
          >
            지금 바로 시작하세요
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', marginTop: '24px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            300만원씩 쓰면서 홈페이지 맡기지 마세요.
            <br />
            <span style={{ color: '#39FF14', fontWeight: '500' }}>일단 신청하고, 무료로 받아보세요.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', marginTop: '40px' }}
            className="sm:flex-row"
          >
            <a href="#pricing" className="btn-primary" style={{ fontSize: '18px', padding: '18px 40px' }}>
              무료로 신청하기
            </a>
            <a
              href="https://open.kakao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: '18px', padding: '18px 40px' }}
            >
              카카오톡 문의
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px', marginTop: '48px', fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              결제 정보 필요 없음
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              24시간 내 제작
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              마음에 안 들면 무료
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
