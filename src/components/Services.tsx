"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    number: "01",
    title: "랜딩페이지",
    description: "전환율을 극대화하는 강력한 원페이지. 방문자를 고객으로 만듭니다.",
    features: ["전환 최적화", "A/B 테스트", "빠른 로딩"],
  },
  {
    number: "02",
    title: "기업 홈페이지",
    description: "브랜드의 신뢰도를 높이는 프리미엄 기업 웹사이트.",
    features: ["반응형 디자인", "SEO 최적화", "관리자 페이지"],
  },
  {
    number: "03",
    title: "포트폴리오",
    description: "당신의 작업을 가장 돋보이게 하는 쇼케이스 사이트.",
    features: ["갤러리 시스템", "프로젝트 관리", "인터랙티브 UI"],
  },
  {
    number: "04",
    title: "쇼핑몰",
    description: "매출을 만드는 이커머스 솔루션. 결제부터 배송까지.",
    features: ["결제 연동", "재고 관리", "주문 시스템"],
  },
  {
    number: "05",
    title: "예약 시스템",
    description: "병원, 미용실, 레스토랑 등 예약이 필요한 모든 비즈니스.",
    features: ["실시간 예약", "알림 발송", "일정 관리"],
  },
  {
    number: "06",
    title: "블로그 / 매거진",
    description: "콘텐츠 마케팅을 위한 SEO 최적화된 블로그 플랫폼.",
    features: ["CMS 연동", "SEO 최적화", "뉴스레터"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        position: 'relative',
        padding: '128px 0',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      {/* Background */}
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '50%',
        height: '400px',
        background: 'rgba(57, 255, 20, 0.05)',
        borderRadius: '50%',
        filter: 'blur(150px)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span style={{ color: '#39FF14', fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Services
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 'bold', marginTop: '16px', color: '#fff' }}>
            무엇이든 만들어 드립니다
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', marginTop: '24px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
            비즈니스 목표에 맞는 최적의 웹사이트를 제작합니다.
            <br />
            모든 사이트는 SEO 최적화와 반응형 디자인이 기본입니다.
          </p>
        </motion.div>

        {/* Services Grid - 6 items, 3 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-hover"
              style={{
                position: 'relative',
                padding: '32px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              {/* Number */}
              <span style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'rgba(57, 255, 20, 0.1)',
              }}>
                {service.number}
              </span>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px', color: '#fff' }}>
                  {service.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '20px', fontSize: '15px', lineHeight: 1.6 }}>{service.description}</p>

                {/* Features */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      style={{
                        padding: '6px 12px',
                        background: 'rgba(57, 255, 20, 0.1)',
                        border: '1px solid rgba(57, 255, 20, 0.2)',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        color: '#39FF14',
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
