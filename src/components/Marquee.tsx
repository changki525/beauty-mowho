"use client";

const items = [
  "랜딩페이지",
  "기업 홈페이지",
  "포트폴리오",
  "쇼핑몰",
  "예약 사이트",
  "브랜드 사이트",
  "반응형 디자인",
  "SEO 최적화",
  "빠른 로딩",
  "모바일 최적화",
];

export default function Marquee() {
  return (
    <section style={{
      padding: '48px 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      overflow: 'hidden',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}>
      <div className="animate-marquee" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            style={{
              margin: '0 32px',
              fontSize: '28px',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.2)',
              transition: 'color 0.3s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#39FF14'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
