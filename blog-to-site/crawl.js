const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BLOG_ID = process.argv[2] || 'mipoomdal';
const MAX_POSTS = 20;
const OUTPUT_FILE = path.resolve(__dirname, 'data.json');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function crawlBlog(blogId) {
  console.log(`\n[1/5] 브라우저 시작...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=ko-KR']
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  );
  await page.setViewport({ width: 1280, height: 900 });

  const result = {
    blogId,
    blogName: '',
    blogDescription: '',
    profileImage: '',
    categories: [],
    posts: [],
    galleryImages: [],
    crawledAt: new Date().toISOString()
  };

  try {
    // ═══ 1단계: 블로그 메타 정보 수집 ═══
    console.log(`[2/5] 블로그 메타 정보 수집: https://blog.naver.com/${blogId}`);

    // 데스크톱 블로그 접속하여 iframe 내부 탐색
    await page.goto(`https://blog.naver.com/${blogId}`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await delay(2000);

    // iframe 내부에서 메타 정보 추출 (네이버 블로그는 iframe 구조)
    const frames = page.frames();
    for (const frame of frames) {
      const url = frame.url();
      if (url.includes('PostList') || url.includes('prologue')) {
        try {
          const frameMeta = await frame.evaluate(() => {
            const d = {};
            // 닉네임/블로그명
            const nick = document.querySelector('.nick, .blog_name, .nickNameArea, .area_name .ell');
            d.blogName = nick ? nick.textContent.trim() : '';
            // 소개
            const desc = document.querySelector('.m_intro, .blog_desc, .description, .intro');
            d.blogDescription = desc ? desc.textContent.trim() : '';
            // 프로필 이미지
            const img = document.querySelector('.thumb img, .buddy_thumb img, .profile_thumb img');
            d.profileImage = img ? img.src : '';
            return d;
          });
          if (frameMeta.blogName) result.blogName = frameMeta.blogName;
          if (frameMeta.blogDescription) result.blogDescription = frameMeta.blogDescription;
          if (frameMeta.profileImage) result.profileImage = frameMeta.profileImage;
        } catch (e) { /* skip frame errors */ }
      }
    }

    // 메인 페이지에서도 시도
    const mainMeta = await page.evaluate(() => {
      const d = {};
      const nick = document.querySelector('.nick, .blog_name');
      d.blogName = nick ? nick.textContent.trim() : '';
      const desc = document.querySelector('.blog_desc, .description');
      d.blogDescription = desc ? desc.textContent.trim() : '';
      const img = document.querySelector('.thumb img, .profile_thumb img');
      d.profileImage = img ? img.src : '';
      return d;
    });
    if (!result.blogName && mainMeta.blogName) result.blogName = mainMeta.blogName;
    if (!result.blogDescription && mainMeta.blogDescription) result.blogDescription = mainMeta.blogDescription;
    if (!result.profileImage && mainMeta.profileImage) result.profileImage = mainMeta.profileImage;

    // OG 메타태그에서 보완
    const ogMeta = await page.evaluate(() => {
      const d = {};
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const ogImg = document.querySelector('meta[property="og:image"]');
      d.blogName = ogTitle ? ogTitle.content : '';
      d.blogDescription = ogDesc ? ogDesc.content : '';
      d.profileImage = ogImg ? ogImg.content : '';
      return d;
    });
    if (!result.blogName && ogMeta.blogName) result.blogName = ogMeta.blogName;
    if (!result.blogDescription && ogMeta.blogDescription) result.blogDescription = ogMeta.blogDescription;
    if (!result.profileImage && ogMeta.profileImage) result.profileImage = ogMeta.profileImage;

    // 블로그명 정리 (" : 네이버 블로그" 제거)
    result.blogName = result.blogName
      .replace(/\s*:\s*네이버\s*블로그\s*$/i, '')
      .replace(/^\s*네이버\s*블로그\s*$/i, blogId)
      .trim() || blogId;

    // 프로필 이미지 고해상도로 변환
    if (result.profileImage) {
      result.profileImage = result.profileImage.replace(/\?type=s\d+/, '?type=w200');
    }

    console.log(`  ✓ 블로그명: ${result.blogName}`);
    console.log(`  ✓ 소개: ${(result.blogDescription || '(없음)').substring(0, 80)}`);

    // ═══ 2단계: 포스트 목록 수집 (PostTitleListAsync API) ═══
    console.log(`[3/5] 포스팅 목록 수집 중...`);

    // 방법 1: PostTitleListAsync API (데스크톱용, 가장 안정적)
    const postListApiUrl = `https://blog.naver.com/PostTitleListAsync.naver?blogId=${blogId}&viewdate=&currentPage=1&categoryNo=0&parentCategoryNo=0&countPerPage=${MAX_POSTS}`;

    try {
      const response = await page.goto(postListApiUrl, {
        waitUntil: 'networkidle2',
        timeout: 15000
      });
      const rawText = await response.text();

      // PostTitleListAsync는 JavaScript 변수 할당 형식으로 응답
      // JSON 부분만 추출
      let jsonText = rawText;
      // "var postTitleList = { ... };" 형식이면 JSON 추출
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonText = jsonMatch[0];
      }

      const postListData = JSON.parse(jsonText);

      // postList 항목 추출
      let postItems = postListData.postList || postListData.result?.items || [];

      if (postItems.length > 0) {
        console.log(`  ✓ ${postItems.length}개 포스팅 발견 (PostTitleListAsync API)`);
        for (const item of postItems.slice(0, MAX_POSTS)) {
          result.posts.push({
            title: item.title || item.titleWithInspectMessage || '',
            date: item.addDate || item.modifyDate || '',
            thumbnail: '',
            summary: '',
            url: `https://blog.naver.com/${blogId}/${item.logNo}`,
            logNo: String(item.logNo),
            images: []
          });
        }
      }
    } catch (e) {
      console.log(`  → PostTitleListAsync API 실패: ${e.message}`);
    }

    // 방법 2: 모바일 블로그 페이지 HTML 파싱
    if (result.posts.length === 0) {
      console.log('  → 모바일 블로그에서 포스트 목록 파싱...');
      await page.goto(`https://m.blog.naver.com/${blogId}`, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      await delay(3000);

      // 스크롤하여 더 많은 포스트 로드
      for (let s = 0; s < 5; s++) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await delay(1500);
      }

      const mPosts = await page.evaluate((blogId) => {
        const posts = [];

        // 포스트 링크에서 logNo 추출하여 수집
        const allLinks = document.querySelectorAll('a[href]');
        const seen = new Set();

        allLinks.forEach(a => {
          const href = a.href || '';
          // /blogId/숫자 패턴 찾기
          const match = href.match(new RegExp(`/${blogId}/(\\d{10,})`));
          if (!match) return;
          const logNo = match[1];
          if (seen.has(logNo)) return;
          seen.add(logNo);

          // 가장 가까운 컨테이너에서 정보 추출
          const container = a.closest('[class*="item"], [class*="post"], [class*="card"], li, article') || a;
          const titleEl = container.querySelector('strong, h3, h2, [class*="title"], [class*="tit"]');
          const imgEl = container.querySelector('img[src*="blogpfthumb"], img[src*="postfiles"], img[src*="pstatic"]');
          const dateEl = container.querySelector('[class*="date"], time, [class*="time"]');
          const summaryEl = container.querySelector('[class*="text"], [class*="summary"], [class*="desc"]');

          posts.push({
            title: titleEl ? titleEl.textContent.trim() : (a.textContent.trim().substring(0, 100) || ''),
            date: dateEl ? dateEl.textContent.trim() : '',
            thumbnail: imgEl ? imgEl.src : '',
            summary: summaryEl ? summaryEl.textContent.trim().substring(0, 200) : '',
            url: `https://blog.naver.com/${blogId}/${logNo}`,
            logNo,
            images: []
          });
        });

        return posts;
      }, blogId);

      if (mPosts.length > 0) {
        result.posts = mPosts.slice(0, MAX_POSTS);
        console.log(`  ✓ ${result.posts.length}개 포스팅 발견 (모바일 HTML)`);
      }
    }

    // 방법 3: 데스크톱 iframe 내부에서 포스트 목록 추출
    if (result.posts.length === 0) {
      console.log('  → 데스크톱 iframe에서 포스트 목록 추출...');
      await page.goto(`https://blog.naver.com/PostList.naver?blogId=${blogId}&from=postList&categoryNo=0`, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      await delay(2000);

      for (const frame of page.frames()) {
        try {
          const framePosts = await frame.evaluate((blogId) => {
            const posts = [];
            // 포스트 영역 탐색
            const postEls = document.querySelectorAll('.post-item, .lst_feed .item, .se-viewer, [class*="post_"]');
            postEls.forEach(el => {
              const titleEl = el.querySelector('.title, .se-title-text, h3, .tit_post');
              const dateEl = el.querySelector('.date, time, .se_publishDate');
              const logNoEl = el.querySelector('a[href*="logNo="]') || el.closest('a[href*="logNo="]');
              let logNo = '';
              if (logNoEl) {
                const m = logNoEl.href.match(/logNo=(\d+)/);
                if (m) logNo = m[1];
              }
              if (titleEl && logNo) {
                posts.push({
                  title: titleEl.textContent.trim(),
                  date: dateEl ? dateEl.textContent.trim() : '',
                  url: `https://blog.naver.com/${blogId}/${logNo}`,
                  logNo,
                  thumbnail: '', summary: '', images: []
                });
              }
            });
            return posts;
          }, blogId);

          if (framePosts.length > 0) {
            result.posts = framePosts.slice(0, MAX_POSTS);
            console.log(`  ✓ ${result.posts.length}개 포스팅 발견 (iframe)`);
            break;
          }
        } catch (e) { /* skip frame errors */ }
      }
    }

    // 유효하지 않은 포스트 필터링
    result.posts = result.posts.filter(p =>
      p.logNo && p.title && !p.title.includes('전체글사진만') && !p.title.includes('목록형 보기')
    );

    console.log(`  → 유효 포스팅: ${result.posts.length}개`);

    // ═══ 3단계: 개별 포스트 상세 크롤링 ═══
    console.log(`[4/5] 포스팅 상세 크롤링 중...`);
    const detailedPosts = [];
    const limit = Math.min(result.posts.length, 12);

    for (let i = 0; i < limit; i++) {
      const post = result.posts[i];

      try {
        // 모바일 포스트 뷰가 파싱이 더 쉬움
        const postUrl = `https://m.blog.naver.com/${blogId}/${post.logNo}`;
        await page.goto(postUrl, {
          waitUntil: 'networkidle2',
          timeout: 15000
        });
        await delay(1500);

        const detail = await page.evaluate(() => {
          const d = {};

          // 제목 (여러 선택자 시도)
          const titleSels = ['.se-title-text', '.tit_h3', '.post_title', 'h3.se_textarea', '.tit_view'];
          for (const sel of titleSels) {
            const el = document.querySelector(sel);
            if (el && el.textContent.trim()) { d.title = el.textContent.trim(); break; }
          }
          // OG 제목 fallback
          if (!d.title) {
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) d.title = ogTitle.content.replace(/\s*:\s*네이버\s*블로그\s*$/, '').trim();
          }

          // 본문 텍스트
          const textSels = '.se-text-paragraph, .se_textarea, .post_ct, .__se_module_data, .se-module-text p';
          const textEls = document.querySelectorAll(textSels);
          const texts = [];
          textEls.forEach(el => {
            const t = el.textContent.trim();
            if (t && t.length > 5) texts.push(t);
          });
          d.content = texts.join(' ').substring(0, 500);

          // 날짜
          const dateSels = ['.se_publishDate', '.blog_date', '.date', 'time', '.se_date', '[class*="date"]'];
          for (const sel of dateSels) {
            const el = document.querySelector(sel);
            if (el && el.textContent.trim()) { d.date = el.textContent.trim(); break; }
          }

          // 이미지
          const images = [];
          const imgSels = '.se-image-resource, .se_mediaArea img, img[id*="img"], .__se_module_data img';
          document.querySelectorAll(imgSels).forEach(img => {
            const src = img.src || img.dataset.src || img.dataset.lazyImg || '';
            if (src && src.includes('pstatic.net') && !src.includes('static.') && !src.includes('icon')) {
              images.push(src.replace(/\?type=.*$/, '?type=w966'));
            }
          });
          // OG 이미지 추가
          const ogImg = document.querySelector('meta[property="og:image"]');
          if (ogImg && ogImg.content) {
            const ogSrc = ogImg.content.replace(/\?type=.*$/, '?type=w966');
            if (!images.includes(ogSrc)) images.unshift(ogSrc);
          }
          d.images = images.slice(0, 6);

          // 대표 이미지 (OG)
          d.ogImage = ogImg ? ogImg.content : '';

          return d;
        });

        const updated = {
          ...post,
          title: detail.title || post.title,
          summary: detail.content || post.summary,
          date: detail.date || post.date,
          thumbnail: detail.ogImage || post.thumbnail,
          images: detail.images || []
        };

        // 제목 정리
        updated.title = updated.title.replace(/\s*:\s*네이버\s*블로그\s*$/i, '').trim();

        detailedPosts.push(updated);
        const shortTitle = updated.title.length > 35 ? updated.title.substring(0, 35) + '...' : updated.title;
        console.log(`  ✓ [${i + 1}/${limit}] ${shortTitle}`);
      } catch (e) {
        detailedPosts.push(post);
        console.log(`  ✗ [${i + 1}/${limit}] 실패: ${e.message}`);
      }
    }

    result.posts = detailedPosts;

    // ═══ 4단계: 갤러리 이미지 수집 ═══
    console.log(`[5/5] 갤러리 이미지 정리 중...`);
    result.galleryImages = [];
    const seenImages = new Set();

    for (const post of result.posts) {
      const imgs = post.images || [];
      for (const img of imgs) {
        const normalized = img.replace(/\?type=.*$/, '');
        if (!seenImages.has(normalized) && result.galleryImages.length < 12) {
          seenImages.add(normalized);
          result.galleryImages.push({ src: img, postTitle: post.title });
        }
      }
    }
    // 썸네일도 추가
    for (const post of result.posts) {
      if (post.thumbnail) {
        const normalized = post.thumbnail.replace(/\?type=.*$/, '');
        if (!seenImages.has(normalized) && result.galleryImages.length < 12) {
          seenImages.add(normalized);
          result.galleryImages.push({ src: post.thumbnail, postTitle: post.title });
        }
      }
    }

    console.log(`  ✓ 갤러리 이미지 ${result.galleryImages.length}개 수집`);

  } catch (err) {
    console.error('크롤링 중 오류:', err.message);
  } finally {
    await browser.close();
  }

  return result;
}

// 실행
(async () => {
  console.log('========================================');
  console.log(' 네이버 블로그 크롤러');
  console.log('========================================');

  const data = await crawlBlog(BLOG_ID);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`\n✅ 크롤링 완료! ${OUTPUT_FILE} 저장됨`);
  console.log(`   - 블로그명: ${data.blogName}`);
  console.log(`   - 포스팅: ${data.posts.length}개`);
  console.log(`   - 갤러리 이미지: ${data.galleryImages.length}개`);
})();

module.exports = { crawlBlog };
