"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "김민수",
    role: "스타트업 대표",
    content: "300만원 예상하고 있었는데 5만원에 이런 퀄리티가 나올 줄 몰랐습니다. 진짜 하루 만에 왔어요.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "이지현",
    role: "프리랜서 디자이너",
    content: "포트폴리오 사이트가 필요했는데, 직접 만들기엔 시간이 없었어요. freemaker 덕분에 이틀만에 멋진 사이트 완성!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "박준혁",
    role: "카페 운영",
    content: "예약 시스템까지 포함된 사이트를 이 가격에? 처음엔 의심했는데 결과물 보고 바로 결제했습니다.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    name: "최서연",
    role: "온라인 쇼핑몰 운영",
    content: "다른 곳에서 견적 받으니까 500만원이었는데, 여기서 15만원에 더 좋은 결과가 나왔어요.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '128px 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)',
      }}
    >
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ color: '#39FF14', fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Testimonials
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 'bold', marginTop: '16px', color: '#fff' }}>
            고객들의 솔직한 후기
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-hover"
              style={{
                padding: '32px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
              }}
            >
              {/* Rating */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#39FF14">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px', lineHeight: 1.6 }}>
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(57, 255, 20, 0.3)',
                }}>
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: '500', color: '#fff' }}>{testimonial.name}</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
