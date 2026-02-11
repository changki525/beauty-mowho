"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "3",
    annualPrice: "2.5",
    description: "처음 시작하는 분들에게",
    features: ["원페이지 랜딩", "반응형 디자인", "기본 SEO", "1회 수정", "호스팅 포함"],
    popular: false,
  },
  {
    name: "Basic",
    price: "5",
    annualPrice: "4",
    description: "가장 많이 선택하는 플랜",
    features: ["5페이지 구성", "반응형 디자인", "SEO 최적화", "3회 수정", "호스팅 포함", "기본 애니메이션", "문의 폼"],
    popular: true,
    badge: "BEST",
  },
  {
    name: "Pro",
    price: "8",
    annualPrice: "6.5",
    description: "비즈니스 확장을 위한",
    features: ["10페이지 구성", "반응형 디자인", "SEO 최적화", "무제한 수정", "호스팅 포함", "고급 애니메이션", "관리자 페이지"],
    popular: false,
  },
  {
    name: "Business",
    price: "15",
    annualPrice: "12",
    description: "중견 기업을 위한",
    features: ["무제한 페이지", "반응형 디자인", "SEO 최적화", "무제한 수정", "호스팅 포함", "프리미엄 애니메이션", "결제/예약 시스템", "전담 매니저"],
    popular: false,
  },
  {
    name: "Enterprise",
    price: "30",
    annualPrice: "25",
    description: "대기업 맞춤 솔루션",
    features: ["맞춤형 설계", "무제한 페이지", "완전 맞춤 기능", "API 연동", "보안 강화", "24/7 지원", "전담 팀 배정", "SLA 보장"],
    popular: false,
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="pricing"
      style={{
        position: 'relative',
        padding: '128px 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000 0%, #050505 50%, #000 100%)',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'rgba(57, 255, 20, 0.05)',
        borderRadius: '50%',
        filter: 'blur(150px)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ color: '#39FF14', fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Pricing
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 'bold', marginTop: '16px', color: '#fff' }}>
            투명한 가격 정책
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', marginTop: '24px' }}>
            하루 2,000원, 커피 한 잔 값으로 나만의 홈페이지를 가지세요.
            <br />
            <span style={{ color: '#39FF14', fontWeight: '500' }}>마음에 안 들면 돈 안 내도 됩니다.</span>
          </p>

          {/* Billing Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
            <span style={{ fontSize: '14px', color: !isAnnual ? '#fff' : 'rgba(255,255,255,0.4)' }}>월간 결제</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              style={{
                position: 'relative',
                width: '56px',
                height: '28px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: isAnnual ? '#39FF14' : 'rgba(255,255,255,0.2)',
                transition: 'background-color 0.3s',
              }}
            >
              <motion.div
                animate={{ x: isAnnual ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  position: 'absolute',
                  top: '4px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                }}
              />
            </button>
            <span style={{ fontSize: '14px', color: isAnnual ? '#fff' : 'rgba(255,255,255,0.4)' }}>
              연간 결제 <span style={{ color: '#39FF14' }}>(20% 할인)</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                position: 'relative',
                padding: '24px',
                borderRadius: '16px',
                background: plan.popular
                  ? 'linear-gradient(180deg, rgba(57, 255, 20, 0.1) 0%, transparent 100%)'
                  : 'rgba(255,255,255,0.02)',
                border: plan.popular ? '2px solid rgba(57, 255, 20, 0.5)' : '1px solid rgba(255,255,255,0.05)',
                transform: plan.popular ? 'scale(1.02)' : 'none',
              }}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '4px 16px',
                  backgroundColor: '#39FF14',
                  color: '#000',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '9999px',
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan Name */}
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{plan.name}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>{plan.description}</p>

              {/* Price */}
              <div style={{ marginTop: '24px' }}>
                <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff' }}>
                  {isAnnual ? plan.annualPrice : plan.price}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>만원</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>/월</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '4px' }}>VAT 별도</p>

              {/* CTA Button */}
              <button
                style={{
                  width: '100%',
                  marginTop: '24px',
                  padding: '12px',
                  borderRadius: '9999px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  backgroundColor: plan.popular ? '#39FF14' : 'rgba(255,255,255,0.05)',
                  color: plan.popular ? '#000' : '#fff',
                }}
              >
                무료로 신청하기
              </button>

              {/* Features */}
              <ul style={{ marginTop: '24px', listStyle: 'none', padding: 0 }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '48px', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}
        >
          신용카드 정보 필요 없음 / 일단 제작받고 마음에 들면 결제
        </motion.p>
      </div>
    </section>
  );
}
