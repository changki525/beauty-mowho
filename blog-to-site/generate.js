const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

const DATA_FILE = path.resolve(__dirname, 'data.json');
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const IMG_DIR = path.resolve(OUTPUT_DIR, 'images');
const OUTPUT_FILE = path.resolve(OUTPUT_DIR, 'index.html');

// ===== 유틸 =====
function esc(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function cleanSummary(raw) {
  if (!raw) return '';
  return raw
    .replace(/본문\s*(기타\s*)?기능[\s\S]*/g, '')
    .replace(/이웃추가[\s\S]*/g, '')
    .replace(/(뷰티모후|beauty mowho)[\s\S]*?\d{4}\.\s*\d+\.\s*\d+[\s\S]*?:\d+/g, '')
    .replace(/본문\s*폰트[\s\S]*/g, '')
    .replace(/공유하기[\s\S]*/g, '')
    .replace(/\n{2,}/g, '\n').replace(/\t/g, ' ').replace(/\s{2,}/g, ' ')
    .trim().substring(0, 150);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const parts = dateStr.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/);
    if (parts) return `${parts[1]}.${parts[2].padStart(2,'0')}.${parts[3].padStart(2,'0')}`;
  } catch {}
  return dateStr;
}

// ===== 이미지 다운로드 =====
function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 100) { resolve(true); return; }
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location, destPath).then(resolve);
        return;
      }
      if (res.statusCode !== 200) { res.resume(); resolve(false); return; }
      const stream = fs.createWriteStream(destPath);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(true); });
      stream.on('error', () => resolve(false));
    });
    req.on('error', () => resolve(false));
    req.setTimeout(15000, () => { req.destroy(); resolve(false); });
  });
}

function urlToFilename(url) {
  const hash = crypto.createHash('md5').update(url.replace(/\?type=.*$/, '')).digest('hex').substring(0, 10);
  const ext = (url.match(/\.(jpe?g|png|gif|webp)/i) || [, 'jpg'])[1].toLowerCase();
  return `${hash}.${ext}`;
}

async function downloadAllImages(data) {
  if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

  const urls = new Set();
  for (const p of data.posts || []) {
    if (p.thumbnail) urls.add(p.thumbnail.replace(/\?type=w\d+/, '?type=w2'));
    for (const img of (p.images || [])) urls.add(img.replace(/\?type=w\d+/, '?type=w2'));
  }
  for (const g of data.galleryImages || []) {
    if (g.src) urls.add(g.src.replace(/\?type=w\d+/, '?type=w2'));
  }
  if (data.profileImage) urls.add(data.profileImage);

  const urlMap = {};
  const allUrls = [...urls];
  console.log(`  이미지 ${allUrls.length}개 다운로드 중...`);

  for (let i = 0; i < allUrls.length; i += 5) {
    const batch = allUrls.slice(i, i + 5);
    await Promise.all(batch.map(async (url) => {
      const filename = urlToFilename(url);
      const dest = path.join(IMG_DIR, filename);
      const ok = await downloadImage(url, dest);
      if (ok) urlMap[url] = `images/${filename}`;
    }));
    process.stdout.write(`  ✓ ${Math.min(i + 5, allUrls.length)}/${allUrls.length}\r`);
  }
  console.log(`  ✓ 다운로드 완료: ${Object.keys(urlMap).length}/${allUrls.length}개`);
  return urlMap;
}

function loc(url, urlMap) {
  if (!url) return '';
  const key = url.replace(/\?type=w\d+/, '?type=w2');
  return urlMap[key] || url;
}

// ===== HTML 생성 =====
function generateHTML(data, urlMap = {}) {
  const blogName = esc(data.blogName.replace(/\s+mipoomdal$/i, '').trim() || data.blogId);
  const posts = data.posts || [];
  const galleryImages = (data.galleryImages || []).filter(img => img.src);
  const L = (url) => loc(url, urlMap);

  // === 이미지 중복 방지: 각 섹션별 고유 이미지 배정 ===
  // posts[0]: 다이아페더링(눈썹) → About 전용
  // posts[1]: 콤보눈썹         → Services 눈썹
  // posts[2]: 입술문신 톤업     → Services 입술
  // posts[3]: 수강생모집(원장)  → Contact 배경
  // posts[4]: 워터풀시럽립      → Gallery
  // posts[5]: 아이라인문신      → Services 아이라인
  // posts[6]: 입매교정          → Gallery
  // posts[7]: 남자눈썹          → Gallery
  // posts[8]: 반영구수강        → Gallery
  // posts[9]: 아이라인 청순     → Gallery
  const services = [
    { name: 'Eyebrow', ko: '눈썹', desc: '자연스러운 결을 살리는 다이아페더링, 콤보눈썹 등 맞춤 디자인', img: 'images/eyebrow.png' },
    { name: 'Lip', ko: '입술', desc: '워터풀시럽립 기법으로 맑고 화사한 입술 톤업', img: L(posts[2]?.thumbnail) },
    { name: 'Eyeliner', ko: '아이라인', desc: '붓기 통증 없이 청순하고 또렷한 눈매 완성', img: 'images/eyeliner.png' }
  ];

  // 포스트 카드
  const postCards = posts.slice(0, 9).map(post => {
    const date = esc(formatDate(post.date));
    const url = esc(post.url);
    const thumb = L(post.thumbnail);
    return `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="post-card reveal">
            <div class="post-img">
              ${thumb ? `<img src="${esc(thumb)}" alt="${esc(post.title)}" loading="lazy" decoding="async" />` : ''}
            </div>
            <div class="post-info">
              <span class="post-date">${date}</span>
              <h3>${esc(post.title)}</h3>
            </div>
          </a>`;
  }).join('\n');

  // 갤러리: Services/About에서 안 쓴 이미지만 사용
  const galleryIndices = [4, 6, 7, 9, 8];
  const gallery = galleryIndices
    .filter(i => posts[i]?.thumbnail)
    .map(i => `
          <div class="gallery-item reveal">
            <img src="${esc(L(posts[i].thumbnail))}" alt="${esc(posts[i].title)}" loading="lazy" decoding="async" />
          </div>`).join('\n');

  // 히어로 배경: 로컬 스튜디오 이미지
  const heroBg = 'images/hero-bg.jpeg';

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blogName} | 세종 반영구 전문</title>
  <meta name="description" content="${blogName} - 세종시 반영구 화장 전문. 미대출신 원장의 맞춤 디자인.">
  <meta property="og:title" content="${blogName}">
  <meta property="og:description" content="세종시 반영구 화장 전문 - 미대출신 원장의 맞춤 디자인">
  <meta name="referrer" content="no-referrer">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Sans+KR:wght@200;300;400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --bg: #FFFFFF; --bg-warm: #FAF8F5; --bg-dark: #1A1A1A;
      --text-primary: #1A1A1A; --text-secondary: #6B6B6B; --text-light: #9A9A9A;
      --accent: #8B6F5E; --accent-light: #C4A882; --border: #E8E4DF;
      --serif: 'Cormorant Garamond', 'Georgia', serif;
      --sans: 'Noto Sans KR', -apple-system, sans-serif;
      --ease: cubic-bezier(0.22, 1, 0.36, 1);
    }

    body { font-family: var(--sans); color: var(--text-primary); background: var(--bg); line-height: 1.8; overflow-x: hidden; font-weight: 300; }
    a { text-decoration: none; color: inherit; }
    img { max-width: 100%; height: auto; display: block; }

    /* Header */
    header { position: fixed; top: 0; width: 100%; z-index: 100; padding: 24px 48px; transition: all 0.4s var(--ease); }
    header.scrolled { background: rgba(255,255,255,0.98); padding: 16px 48px; border-bottom: 1px solid var(--border); }
    .header-inner { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-family: var(--serif); font-size: 1.6rem; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; }
    header:not(.scrolled) .logo { color: #fff; }
    nav { display: flex; gap: 36px; align-items: center; }
    nav a { font-size: 0.75rem; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; color: var(--text-secondary); transition: color 0.3s; }
    header:not(.scrolled) nav a { color: rgba(255,255,255,0.7); }
    nav a:hover { color: var(--accent); }
    .nav-cta { padding: 10px 28px; border: 1px solid var(--text-primary); font-size: 0.7rem; letter-spacing: 2px; transition: all 0.4s var(--ease); }
    header:not(.scrolled) .nav-cta { border-color: rgba(255,255,255,0.5); color: #fff; }
    .nav-cta:hover { background: var(--text-primary); color: #fff; }
    header:not(.scrolled) .nav-cta:hover { background: #fff; color: var(--text-primary); }

    /* Hero */
    .hero { height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; background: var(--bg-dark); }
    .hero-bg { position: absolute; inset: 0; }
    .hero-bg img { width: 100%; height: 100%; object-fit: cover; }
    .hero-bg::after { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.45); }
    .hero-content { position: relative; z-index: 2; text-align: center; color: #fff; max-width: 800px; padding: 0 24px; }
    .hero-label { font-size: 0.7rem; letter-spacing: 6px; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 24px; }
    .hero h1 { font-family: var(--serif); font-size: clamp(3rem, 8vw, 6rem); font-weight: 300; letter-spacing: 8px; line-height: 1.1; text-transform: uppercase; margin-bottom: 24px; }
    .hero-sub { font-size: 0.95rem; font-weight: 200; letter-spacing: 3px; color: rgba(255,255,255,0.6); margin-bottom: 48px; }
    .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .hero-btn { display: inline-flex; align-items: center; gap: 10px; padding: 16px 36px; border: 1px solid rgba(255,255,255,0.4); font-size: 0.72rem; letter-spacing: 2px; text-transform: uppercase; color: #fff; transition: all 0.4s var(--ease); font-family: var(--sans); font-weight: 400; }
    .hero-btn svg { width: 16px; height: 16px; fill: currentColor; flex-shrink: 0; }
    .hero-btn:hover { background: #fff; color: var(--bg-dark); }
    .hero-btn.primary { background: var(--accent); border-color: var(--accent); }
    .hero-btn.primary:hover { background: #fff; color: var(--accent); border-color: #fff; }
    .scroll-line { position: absolute; bottom: 40px; left: 50%; width: 1px; height: 60px; background: rgba(255,255,255,0.2); }
    .scroll-line::after { content: ''; position: absolute; top: 0; width: 1px; height: 20px; background: rgba(255,255,255,0.8); animation: scrollDown 2s infinite; }
    @keyframes scrollDown { 0% { top: 0; opacity: 1; } 100% { top: 40px; opacity: 0; } }

    /* Section Common */
    .section { padding: 140px 48px; content-visibility: auto; contain-intrinsic-size: auto 600px; }
    .section-inner { max-width: 1200px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 80px; }
    .section-label { font-size: 0.65rem; letter-spacing: 5px; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; font-weight: 500; }
    .section-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 300; letter-spacing: 3px; }
    .section-divider { width: 40px; height: 1px; background: var(--accent); margin: 24px auto 0; }

    /* Services */
    .services { background: var(--bg-warm); }
    .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .service-card { background: #fff; text-align: center; transition: transform 0.4s var(--ease); overflow: hidden; }
    .service-card:hover { transform: translateY(-4px); }
    .service-img { overflow: hidden; aspect-ratio: 3/4; }
    .service-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease); }
    .service-card:hover .service-img img { transform: scale(1.03); }
    .service-body { padding: 32px 24px; }
    .service-name { font-family: var(--serif); font-size: 1.6rem; font-weight: 300; letter-spacing: 2px; margin-bottom: 6px; }
    .service-ko { font-size: 0.72rem; letter-spacing: 3px; color: var(--text-light); text-transform: uppercase; margin-bottom: 16px; }
    .service-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.9; }

    /* About */
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .about-img { overflow: hidden; }
    .about-img img { width: 100%; aspect-ratio: 3/4; object-fit: cover; }
    .about-text .label { font-size: 0.65rem; letter-spacing: 5px; color: var(--accent); margin-bottom: 20px; font-weight: 500; }
    .about-text h2 { font-family: var(--serif); font-size: 2.4rem; font-weight: 300; letter-spacing: 2px; margin-bottom: 24px; line-height: 1.3; }
    .about-text p { font-size: 0.92rem; color: var(--text-secondary); line-height: 2; margin-bottom: 16px; }
    .about-info { margin-top: 40px; padding-top: 40px; border-top: 1px solid var(--border); display: flex; gap: 48px; }
    .about-info-item .num { font-family: var(--serif); font-size: 2.5rem; font-weight: 300; color: var(--accent); }
    .about-info-item .label2 { font-size: 0.7rem; letter-spacing: 2px; color: var(--text-light); margin-top: 4px; }

    /* Gallery */
    .gallery { background: var(--bg-dark); }
    .gallery .section-label { color: var(--accent-light); }
    .gallery .section-title { color: #fff; }
    .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
    .gallery-item { position: relative; overflow: hidden; aspect-ratio: 1; cursor: pointer; }
    .gallery-item:first-child { grid-column: span 2; grid-row: span 2; }
    .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease); }
    .gallery-item:hover img { transform: scale(1.04); }

    /* Posts */
    .posts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .post-card { display: block; transition: transform 0.4s var(--ease); }
    .post-card:hover { transform: translateY(-4px); }
    .post-img { overflow: hidden; margin-bottom: 20px; aspect-ratio: 4/3; }
    .post-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease); }
    .post-card:hover .post-img img { transform: scale(1.03); }
    .post-date { font-size: 0.7rem; letter-spacing: 2px; color: var(--text-light); margin-bottom: 8px; display: block; }
    .post-info h3 { font-size: 0.95rem; font-weight: 400; line-height: 1.7; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    /* Contact */
    .contact { background: var(--bg-warm); text-align: center; position: relative; overflow: hidden; }
    .contact-bg { position: absolute; inset: 0; z-index: 0; }
    .contact-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.08; }
    .contact .section-inner { position: relative; z-index: 1; }
    .contact-info { display: flex; justify-content: center; gap: 80px; margin-top: 60px; }
    .contact-item .ci-label { font-size: 0.65rem; letter-spacing: 4px; text-transform: uppercase; color: var(--text-light); margin-bottom: 8px; }
    .contact-item .ci-value { font-family: var(--serif); font-size: 1.3rem; font-weight: 400; letter-spacing: 1px; }
    .contact-btn { display: inline-block; margin-top: 60px; padding: 18px 56px; background: var(--bg-dark); color: #fff; font-size: 0.72rem; letter-spacing: 3px; text-transform: uppercase; transition: all 0.4s var(--ease); }
    .contact-btn:hover { background: var(--accent); transform: translateY(-2px); }

    /* Footer */
    footer { padding: 48px; text-align: center; border-top: 1px solid var(--border); background: #fff; }
    footer p { font-size: 0.72rem; color: var(--text-light); letter-spacing: 2px; }
    footer a { color: var(--accent); transition: color 0.3s; }
    footer a:hover { color: var(--text-primary); }

    /* Reveal */
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s var(--ease), transform 0.6s var(--ease); }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* Responsive */
    @media (max-width: 1024px) {
      .section { padding: 100px 32px; }
      .about-grid { grid-template-columns: 1fr; gap: 48px; }
      .services-grid { grid-template-columns: 1fr; gap: 16px; }
      .service-img { aspect-ratio: 4/3; }
      .posts-grid { grid-template-columns: repeat(2, 1fr); }
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .gallery-item:first-child { grid-column: span 2; grid-row: span 1; }
      .contact-info { flex-direction: column; gap: 32px; }
    }
    @media (max-width: 768px) {
      header { padding: 16px 20px; }
      header.scrolled { padding: 12px 20px; }
      nav a:not(.nav-cta) { display: none; }
      .section { padding: 80px 20px; }
      .section-header { margin-bottom: 48px; }
      .hero h1 { letter-spacing: 4px; }
      .hero-actions { gap: 10px; }
      .hero-btn { padding: 12px 20px; font-size: 0.65rem; letter-spacing: 1px; }
      .posts-grid { grid-template-columns: 1fr; gap: 40px; }
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .gallery-item:first-child { grid-column: span 2; }
      .about-info { gap: 32px; }
    }
  </style>
</head>
<body>

  <header id="header">
    <div class="header-inner">
      <div class="logo">${blogName}</div>
      <nav>
        <a href="#services">Services</a>
        <a href="#gallery">Gallery</a>
        <a href="#posts">Journal</a>
        <a href="#contact" class="nav-cta">Contact</a>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div class="hero-bg">
      <img src="${heroBg}" alt="${blogName}" />
    </div>
    <div class="hero-content">
      <p class="hero-label">Semi-Permanent Makeup Studio</p>
      <h1>${blogName}</h1>
      <p class="hero-sub">미대출신 원장의 섬세한 맞춤 디자인</p>
      <div class="hero-actions">
        <a href="tel:010-7316-7783" class="hero-btn primary">
          <svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/></svg>
          전화 예약
        </a>
        <a href="https://open.kakao.com/o/szj8Qwob" target="_blank" rel="noopener noreferrer" class="hero-btn">
          <svg viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.88 5.31 4.7 6.72-.16.58-.58 2.12-.67 2.45-.1.41.15.4.32.29.13-.09 2.09-1.4 2.94-1.97.88.13 1.78.2 2.71.2 5.52 0 10-3.58 10-8S17.52 3 12 3z"/></svg>
          카카오톡
        </a>
        <a href="https://www.instagram.com/p/Crx8J6xLEvP/" target="_blank" rel="noopener noreferrer" class="hero-btn">
          <svg viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2zm-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"/></svg>
          Instagram
        </a>
        <a href="https://blog.naver.com/${esc(data.blogId)}" target="_blank" rel="noopener noreferrer" class="hero-btn">
          <svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2h5v8H6V8zm7 0h5v3h-5V8zm0 5h5v3h-5v-3z"/></svg>
          Blog
        </a>
      </div>
    </div>
    <div class="scroll-line"></div>
  </section>

  <section class="section services" id="services">
    <div class="section-inner">
      <div class="section-header">
        <p class="section-label">Our Services</p>
        <h2 class="section-title">Artistry & Technique</h2>
        <div class="section-divider"></div>
      </div>
      <div class="services-grid">
${services.map(s => `
        <div class="service-card reveal">
          ${s.img ? `<div class="service-img"><img src="${esc(s.img)}" alt="${esc(s.ko)}" loading="lazy" decoding="async" /></div>` : ''}
          <div class="service-body">
            <h3 class="service-name">${s.name}</h3>
            <p class="service-ko">${esc(s.ko)}</p>
            <p class="service-desc">${esc(s.desc)}</p>
          </div>
        </div>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="section" id="about">
    <div class="section-inner">
      <div class="about-grid">
        <div class="about-img reveal">
          <video src="images/about-video.mp4" autoplay loop muted playsinline style="width:100%;aspect-ratio:3/4;object-fit:cover;"></video>
        </div>
        <div class="about-text reveal">
          <p class="label">SIGNATURE TECHNIQUE</p>
          <h2>Diamond<br>Feathering</h2>
          <p>다이아페더링은 한 올 한 올 자연스러운 눈썹결을 그려내는 최신 반영구 기법입니다. 기존 엠보 기법과 달리 탈각 과정이 없고, 시술 당일 세안이 가능하여 일상생활에 지장이 없습니다.</p>
          <p>피부 표면에 미세한 다이아몬드 패턴으로 색소를 주입하여 마치 실제 눈썹처럼 자연스러운 결과를 만들어냅니다. 미대 출신 원장이 고객의 얼굴형, 이미지, 피부톤을 정밀 분석하여 1:1 맞춤 디자인을 제공합니다.</p>
          <div class="about-info">
            <div class="about-info-item"><div class="num">No</div><div class="label2">탈각 과정 없음</div></div>
            <div class="about-info-item"><div class="num">Day 1</div><div class="label2">당일 세안 가능</div></div>
            <div class="about-info-item"><div class="num">1:1</div><div class="label2">맞춤 디자인</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${gallery.length > 0 ? `
  <section class="section gallery" id="gallery">
    <div class="section-inner">
      <div class="section-header">
        <p class="section-label">Portfolio</p>
        <h2 class="section-title">Our Work</h2>
        <div class="section-divider" style="background: var(--accent-light);"></div>
      </div>
      <div class="gallery-grid">
${gallery}
      </div>
    </div>
  </section>` : ''}

  <section class="section" id="posts">
    <div class="section-inner">
      <div class="section-header">
        <p class="section-label">Journal</p>
        <h2 class="section-title">Latest Stories</h2>
        <div class="section-divider"></div>
      </div>
      <div class="posts-grid">
${postCards}
      </div>
    </div>
  </section>

  <section class="section contact" id="contact">
    <div class="contact-bg">
      <img src="${esc(L(posts[3]?.thumbnail))}" alt="" loading="lazy" decoding="async" />
    </div>
    <div class="section-inner">
      <div class="section-header">
        <p class="section-label">Reservation</p>
        <h2 class="section-title">Get In Touch</h2>
        <div class="section-divider"></div>
      </div>
      <div class="contact-info">
        <div class="contact-item"><p class="ci-label">Location</p><p class="ci-value">세종특별자치시 다솜1로 21</p></div>
        <div class="contact-item"><p class="ci-label">Phone</p><p class="ci-value">010-7316-7783</p></div>
        <div class="contact-item"><p class="ci-label">Hours</p><p class="ci-value">AM 10:00 - PM 8:00</p></div>
      </div>
      <a href="tel:010-7316-7783" class="contact-btn">Book Now</a>
    </div>
  </section>

  <footer>
    <p>&copy; ${new Date().getFullYear()} ${blogName}. All Rights Reserved.</p>
    <p style="margin-top: 8px;">
      <a href="https://blog.naver.com/${esc(data.blogId)}" target="_blank" rel="noopener noreferrer">Blog</a>
    </p>
  </footer>

  <script>
    const header = document.getElementById('header');
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => { header.classList.toggle('scrolled', window.scrollY > 80); ticking = false; });
        ticking = true;
      }
    }, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  </script>
</body>
</html>`;
}

// ===== 실행 =====
(async function() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error('data.json이 없습니다. 먼저 crawl.js를 실행하세요.');
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('[1/2] 이미지 다운로드...');
  const urlMap = await downloadAllImages(data);

  console.log('[2/2] HTML 생성...');
  const html = generateHTML(data, urlMap);
  fs.writeFileSync(OUTPUT_FILE, html, 'utf-8');

  console.log('\u2705 완료! ' + OUTPUT_FILE);
  console.log('   포스트: ' + data.posts.length + '개 / 갤러리: ' + (data.galleryImages || []).length + '개 / 로컬이미지: ' + Object.keys(urlMap).length + '개');
})();

module.exports = { generateHTML };
