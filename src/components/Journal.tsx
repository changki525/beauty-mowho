'use client';

import { motion } from 'framer-motion';

const posts = [
  { date: '2026.03.04', title: '세종 어진동 눈썹샵 | 모녀가 함께 받은 다이아페더링', image: 'https://blogthumb.pstatic.net/MjAyNjAzMDRfMTQ0/MDAxNzcyNTk1MTAxODgz.8h9VSkz21YJAbYCGSCZd0etP6d3LKcrlyIB9zxyq-B8g.0cn53J0rQG0rmuJfOfezDwm5GkltjBPbZZ7ZDtUol0Eg.JPEG/KakaoTalk_Photo_2026-03-04-12-12-54_004.jpeg?type=w2', url: 'https://blog.naver.com/mipoomdal/224203802457' },
  { date: '2026.03.02', title: '세종 헤어라인 문신 | 전두부탈모·빈모 고민, 뷰티모후 다이아헤어라인으로 흑채 없이 출근해요', image: 'https://blogthumb.pstatic.net/MjAyNjAzMDJfMjgy/MDAxNzcyNDIyOTk4NjU0.L_1LDiOugVL7nRjhFuxE6JggRx7v0kmodT352Hk0-3Ug.SwZ0NAO4vIOiPfT_eWxq0BVgCMLAsZ7ySGJdvPrGijIg.JPEG/KakaoTalk_Photo_2026-03-02-12-22-00_003.jpeg?type=w2', url: 'https://blog.naver.com/mipoomdal/224201207913' },
  { date: '2026.02.26', title: '[세종 눈썹반영구] 대학 새내기의 생애 첫 눈썹반영구 다이아페더링으로 자연스럽게', image: 'https://blogthumb.pstatic.net/MjAyNjAyMjZfMjc3/MDAxNzcyMDgzNjY2OTEz.1vgT3u-AnkX7J-YDVgyZKtRPJFJuWFHjp5woIv-CbUsg.56kYpfgeNAWjojk9Y1Ualo8KRDfij2kJPdXvLuMg7SQg.JPEG/KakaoTalk_Photo_2026-02-26-14-08-14_003.jpeg?type=w2', url: 'https://blog.naver.com/mipoomdal/224196711618' },
  { date: '2026.02.25', title: '중년 남자 눈썹문신 반감 있으셨다면? 다이아페더링으로 자연스러운 눈썹 증모 효과 경험하세요', image: 'https://blogthumb.pstatic.net/MjAyNjAyMjVfMTY5/MDAxNzcxOTg1NDI5MzU3.i1rU2QrD_D_VYkKBdUbCi1rjNbddBcOA9RinUNrZKVMg.KZf5ZTPzHlfC5diCNVcB1yra6T22DxXVEH8TSz7xJ-Ag.JPEG/KakaoTalk_Photo_2026-02-25-11-01-17_006.jpeg?type=w2', url: 'https://blog.naver.com/mipoomdal/224195161513' },
  { date: '2026.02.24', title: '콤보눈썹 | 눈썹산 높은 분도 부드러운 세미아치로 이미지 체인지', image: 'https://blogthumb.pstatic.net/MjAyNjAzMDRfMTUw/MDAxNzcyNjE0NDgzNzc5.xdwCgMRI84KBk6Ev2CvwKd7m5TkFHdIAoSaWWgaoZdcg.nouK2o2UH7aDbw5mzNwg_3oU8S6O4e7s67INTKs3UJEg.PNG/%BA%E4%C6%BC%B8%F0%C8%C4_-_%C4%DE%BA%B8%B4%AB%BD%E7_%BD%E6%B3%D7%C0%CF.png?type=w2', url: 'https://blog.naver.com/mipoomdal/224193785917' },
  { date: '2026.02.23', title: '남자눈썹 짧고 흐릿한 눈썹, 다이아페더링으로 남성스럽게 완성 | 뷰티모후', image: 'https://blogthumb.pstatic.net/MjAyNjAzMDRfMTY5/MDAxNzcyNjE0MDk4MDA4.YzDG4Vim_FxLKDgfhtB-ArG3Tkc97Ftqqy1I69hPhb4g.1S8ccDKVfvUKR_gFjIfq8TFey3LNJDz0x_zeEtabYtgg.PNG/%BA%E4%C6%BC%B8%F0%C8%C4_-_%B3%B2%C0%DA%B4%AB%BD%E7_%C2%AA%B0%ED%C8%E5%B8%B4_%BD%E6%B3%D7%C0%CF.png?type=w2', url: 'https://blog.naver.com/mipoomdal/224193055156' },
  { date: '2026.02.19', title: '세종시 눈썹 | 남자 잔흔커버 다이아페더링, 모가 부족한 눈썹도 자연스럽게', image: 'https://blogthumb.pstatic.net/MjAyNjAzMDRfNjIg/MDAxNzcyNjEzMDAyMjk1.olULa-ywk2QD0XlVSfvL3Lf2Ov0_QclSzlslhH8YIXIg.qPaaIBpJrOlg-Kg9uM2gzFzVLi0RQqy_4fTZ5KkMU4Ug.PNG/%BA%E4%C6%BC%B8%F0%C8%C4_-_%C0%DC%C8%E7%C4%BF%B9%F6_%B4%D9%C0%CC%BE%C6%C6%E4%B4%F5%B8%B5_%BD%E6%B3%D7%C0%CF.png?type=w2', url: 'https://blog.naver.com/mipoomdal/224187980245' },
  { date: '2026.02.11', title: '눈썹 메이크업 그리기 힘드시죠? 세미아치 디자인으로 영해지는 마법 (ft. 고객님 찐 후기)', image: 'https://blogthumb.pstatic.net/MjAyNjAyMTFfNCAg/MDAxNzcwNzk3ODMxMTc2.5AidX6lV-EgAXbtALZQEHH_Bitk-RX25cGQWmm_WpPog.Rxf5YCOaUAtiuEcpYBIZSbUmxl1ukzksDO1pTgFXjSgg.JPEG/KakaoTalk_Photo_2026-02-11-15-49-35_007.jpeg?type=w2', url: 'https://blog.naver.com/mipoomdal/224180315732' },
  { date: '2026.02.10', title: '남자눈썹 처진눈썹도 자연스럽게, 다이아페더링 작업후기', image: 'https://blogthumb.pstatic.net/MjAyNjAyMTBfNjkg/MDAxNzcwNzI4MDc5NzI0.z38g96y12eMQrQTcXaGsVoi-qemKyTj13Aihb46VuE4g.KcoIXGHDXsQ1jeXE7-6Fhch25kIWmXhbPOt7utSHgDog.JPEG/KakaoTalk_Photo_2026-02-10-21-38-20_007.jpeg?type=w2', url: 'https://blog.naver.com/mipoomdal/224179263923' },
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
