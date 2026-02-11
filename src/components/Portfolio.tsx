"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = ["전체", "랜딩페이지", "기업 홈페이지", "포트폴리오", "쇼핑몰"];

const portfolioItems = [
  {
    id: 1,
    title: "테크 스타트업 랜딩",
    category: "랜딩페이지",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description: "AI 솔루션 기업의 컨버전 최적화 랜딩페이지",
  },
  {
    id: 2,
    title: "프리미엄 레스토랑",
    category: "기업 홈페이지",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    description: "미쉐린 스타 레스토랑의 브랜딩 사이트",
  },
  {
    id: 3,
    title: "아키텍처 스튜디오",
    category: "포트폴리오",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    description: "건축 사무소의 프로젝트 쇼케이스",
  },
  {
    id: 4,
    title: "패션 이커머스",
    category: "쇼핑몰",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    description: "럭셔리 패션 브랜드 온라인 스토어",
  },
  {
    id: 5,
    title: "SaaS 플랫폼",
    category: "랜딩페이지",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    description: "B2B SaaS 제품 마케팅 페이지",
  },
  {
    id: 6,
    title: "법률 사무소",
    category: "기업 홈페이지",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    description: "신뢰감을 주는 로펌 웹사이트",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredItems =
    activeCategory === "전체"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      style={{
        position: 'relative',
        padding: '128px 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '33%',
        height: '100%',
        background: 'rgba(57, 255, 20, 0.03)',
        filter: 'blur(200px)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ color: '#39FF14', fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Portfolio
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 'bold', marginTop: '16px', color: '#fff' }}>
            최근 프로젝트
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', marginTop: '24px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
            500개 이상의 프로젝트를 성공적으로 완료했습니다.
            <br />
            당신의 비즈니스도 함께 성장할 수 있습니다.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '48px' }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                backgroundColor: activeCategory === category ? '#39FF14' : 'rgba(255,255,255,0.05)',
                color: activeCategory === category ? '#000' : 'rgba(255,255,255,0.5)',
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div layout style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
        }}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '256px', overflow: 'hidden' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                  }} />
                </div>

                {/* Content */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
                  <span style={{ color: '#39FF14', fontSize: '14px', fontWeight: '500' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px', color: '#fff' }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '8px' }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
