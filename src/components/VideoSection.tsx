"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '128px 0',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ color: '#39FF14', fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '2px' }}>
            How We Work
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 'bold', marginTop: '16px', color: '#fff' }}>
            이렇게 만들어집니다
          </h2>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}
        >
          {[
            { step: "01", title: "신청", desc: "폼 작성 후 제출", detail: "간단한 정보만 입력하세요" },
            { step: "02", title: "상담", desc: "전담팀 배정 및 미팅", detail: "요구사항을 정확히 파악합니다" },
            { step: "03", title: "제작", desc: "24시간 내 완성", detail: "전문 팀이 집중 제작합니다" },
            { step: "04", title: "확인", desc: "마음에 들면 결제", detail: "불만족시 비용 없음" },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              style={{
                position: 'relative',
                padding: '32px 24px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                textAlign: 'center',
              }}
            >
              <span style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'rgba(57, 255, 20, 0.2)',
              }}>
                {item.step}
              </span>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px', color: '#fff' }}>{item.title}</h3>
              <p style={{ color: '#39FF14', fontSize: '14px', marginTop: '8px' }}>{item.desc}</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '4px' }}>{item.detail}</p>

              {/* Connector */}
              {index < 3 && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-12px',
                  width: '24px',
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(57, 255, 20, 0.3), transparent)',
                  display: 'none',
                }} className="md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
