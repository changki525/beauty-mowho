"use client";

import Link from "next/link";

const footerLinks = {
  서비스: [
    { name: "랜딩페이지", href: "#" },
    { name: "기업 홈페이지", href: "#" },
    { name: "포트폴리오", href: "#" },
    { name: "쇼핑몰", href: "#" },
  ],
  회사: [
    { name: "회사 소개", href: "#" },
    { name: "포트폴리오", href: "#portfolio" },
    { name: "가격 정책", href: "#pricing" },
    { name: "문의하기", href: "#contact" },
  ],
  법적: [
    { name: "이용약관", href: "#" },
    { name: "개인정보처리방침", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      backgroundColor: '#000',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }} className="lg:col-span-2">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#39FF14',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: '#000', fontWeight: 'bold', fontSize: '18px' }}>F</span>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', letterSpacing: '-0.5px' }}>freemaker</span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '16px', maxWidth: '280px', lineHeight: 1.6 }}>
              하루만에 배송되는 프리미엄 홈페이지 제작 서비스.
              마음에 안 들면 돈 안 내도 됩니다.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              {["I", "Y", "X"].map((letter, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                  }}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>{category}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map((link) => (
                  <li key={link.name} style={{ marginBottom: '12px' }}>
                    <Link
                      href={link.href}
                      style={{
                        color: 'rgba(255,255,255,0.4)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.2s',
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          marginTop: '64px',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
            &copy; {new Date().getFullYear()} freemaker. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
            <span>Made with</span>
            <span style={{ color: '#39FF14' }}>{"</>"}</span>
            <span>by freemaker team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
