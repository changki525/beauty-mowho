const { execSync } = require('child_process');
const path = require('path');

const blogId = process.argv[2] || 'mipoomdal';

console.log('╔════════════════════════════════════════╗');
console.log('║   Blog → Site Generator                ║');
console.log('╚════════════════════════════════════════╝');
console.log(`\n대상 블로그: https://blog.naver.com/${blogId}\n`);

const dir = __dirname;

try {
  // Step 1: 크롤링
  console.log('━━━ STEP 1: 블로그 크롤링 ━━━\n');
  execSync(`node "${path.join(dir, 'crawl.js')}" ${blogId}`, {
    stdio: 'inherit',
    cwd: dir
  });

  // Step 2: 홈페이지 생성
  console.log('\n━━━ STEP 2: 홈페이지 생성 ━━━\n');
  execSync(`node "${path.join(dir, 'generate.js')}"`, {
    stdio: 'inherit',
    cwd: dir
  });

  // Step 3: 결과 열기
  const outputFile = path.join(dir, 'output', 'index.html');
  console.log('\n━━━ 완료 ━━━');
  console.log(`\n📁 결과 파일: ${outputFile}`);
  console.log('🌐 브라우저에서 열기...\n');

  try {
    execSync(`open "${outputFile}"`);
  } catch {
    console.log(`직접 열어주세요: file://${outputFile}`);
  }

} catch (err) {
  console.error('\n❌ 오류 발생:', err.message);
  process.exit(1);
}
