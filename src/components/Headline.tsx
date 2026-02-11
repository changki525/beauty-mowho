"use client";

import { motion } from "framer-motion";

export default function Headline() {
  return (
    <section style={{
      position: 'relative',
      padding: '120px 24px',
      backgroundColor: '#000',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(57, 255, 20, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '9999px',
            marginBottom: '32px',
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#39FF14',
            borderRadius: '50%',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>하루만에 배송</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: 'clamp(36px, 8vw, 72px)',
            fontWeight: 'bold',
            lineHeight: 1.1,
            marginBottom: '24px',
            color: '#fff',
          }}
        >
          홈페이지 제작,
          <br />
          <span className="gradient-text">더 이상 비싸지 않습니다</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '40px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
          }}
        >
          300만원씩 쓰지 마세요. 전담 팀이 하루 만에 완성해 드립니다.
          <br />
          <span style={{ color: '#fff', fontWeight: '500' }}>마음에 안 들면 돈 안 내도 됩니다.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '64px',
          }}
        >
          <a href="#pricing" className="btn-primary" style={{ fontSize: '16px', padding: '16px 32px' }}>
            무료로 시작하기
          </a>
          <a href="#portfolio" className="btn-secondary" style={{ fontSize: '16px', padding: '16px 32px' }}>
            포트폴리오 보기
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            flexWrap: 'wrap',
            paddingTop: '48px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#39FF14' }}>500+</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>제작 완료</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#39FF14' }}>24h</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>평균 제작 시간</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#39FF14' }}>98%</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>고객 만족도</div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
