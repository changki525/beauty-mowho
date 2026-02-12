'use client';

import { motion } from 'framer-motion';

const posts = [
  { date: '2026.02.11', title: '눈썹 메이크업 그리기 힘드시죠? 세미아치 디자인으로 영해지는 마법 (ft. 고객님 찐 후기)', image: 'https://blogthumb.pstatic.net/MjAyNjAyMTFfNCAg/MDAxNzcwNzk3ODMxMTc2.5AidX6lV-EgAXbtALZQEHH_Bitk-RX25cGQWmm_WpPog.Rxf5YCOaUAtiuEcpYBIZSbUmxl1ukzksDO1pTgFXjSgg.JPEG/KakaoTalk_Photo_2026-02-11-15-49-35_007.jpeg?type=s3', url: 'https://blog.naver.com/mipoomdal/224180315732' },
  { date: '2026.02.10', title: '남자눈썹 처진눈썹도 자연스럽게, 다이아페더링 작업후기', image: 'https://blogthumb.pstatic.net/MjAyNjAyMTBfNjkg/MDAxNzcwNzI4MDc5NzI0.z38g96y12eMQrQTcXaGsVoi-qemKyTj13Aihb46VuE4g.KcoIXGHDXsQ1jeXE7-6Fhch25kIWmXhbPOt7utSHgDog.JPEG/KakaoTalk_Photo_2026-02-10-21-38-20_007.jpeg?type=s3', url: 'https://blog.naver.com/mipoomdal/224179263923' },
  { date: '2026.02.09', title: '세종눈썹반영구 다이아페더링 워터풀시럽립 눈썹입술 세트시술 잔흔커버 입술톤업 후기', image: 'https://blogthumb.pstatic.net/MjAyNjAyMDlfNCAg/MDAxNzcwNjE0MTc3OTEz.6SsFo60oM0B1r_BuPm3Cb6ibIw6qy6eXPmb7chKnS4wg.lQyij-hDqyYOwGGmuOh82rpIGLCcJuDsrL8j4WU5YSwg.JPEG/KakaoTalk_20260209_133727076_08.jpg?type=s3', url: 'https://blog.naver.com/mipoomdal/224177359141' },
  { date: '2026.02.06', title: '세종시입술문신 칙칙하고 어두운 입술을 워터풀시럽립 기법으로 밝고 화사하게 톤업', image: '/images/c721ce2906.jpeg', url: 'https://blog.naver.com/mipoomdal/224174406004' },
  { date: '2026.02.05', title: '세종입술문신 통증없이 맑고 화사하게 바꾸는 워터풀시럽립 기법', image: '/images/577a30e4d3.jpeg', url: 'https://blog.naver.com/mipoomdal/224173138358' },
  { date: '2026.02.04', title: '세종눈썹문신 탈각 과정 없고, 당일 세안 가능한 다이아페더링 기법 너무 자연스럽죠?', image: '/images/1442b6726f.jpeg', url: 'https://blog.naver.com/mipoomdal/224171669955' },
  { date: '2026.02.03', title: '세종눈썹문신 자연스럽게 잘하는 곳 미대출신 뷰티모후', image: '/images/0e9c402539.jpeg', url: 'https://blog.naver.com/mipoomdal/224170693431' },
  { date: '2025.11.21', title: '세종시반영구수강 미대출신 대표원장 직강, 1인샵 창업까지 한 번에 준비하기', image: '/images/c4d3592cb8.jpg', url: 'https://blog.naver.com/mipoomdal/224083585702' },
  { date: '2025.11.06', title: '[공지] 세종눈썹문신 반영구 수강생 모집(정규반/단과반) 미대출신 원장 직강, 실무 중심 커리큘럼 공개!', image: '/images/da5e1e1a8c.jpeg', url: 'https://blog.naver.com/mipoomdal/224066205298' },
];

export default function Journal() {
  return (
    <section className="section" id="journal">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-label">Journal</p>
          <h2 className="section-title">Latest Stories</h2>
          <div className="section-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="journal-grid">
          {posts.map((post, i) => (
            <motion.a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              style={{ display: 'block', transition: 'transform 0.4s var(--ease)' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ overflow: 'hidden', marginBottom: 20, aspectRatio: '4/3' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s var(--ease)' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', letterSpacing: 2, color: 'var(--text-light)', marginBottom: 8, display: 'block' }}>{post.date}</span>
                <h3 style={{
                  fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.7,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                }}>{post.title}</h3>
              </div>
            </motion.a>
          ))}
        </div>

        <style jsx global>{`
          @media (max-width: 1024px) {
            .journal-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 768px) {
            .journal-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
