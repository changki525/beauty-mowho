'use client';

export default function Footer() {
  return (
    <footer style={{ padding: '48px', textAlign: 'center', borderTop: '1px solid var(--border)', background: '#fff' }}>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-light)', letterSpacing: 2 }}>
        &copy; 2026 beauty mowho. All Rights Reserved.
      </p>
      <p style={{ marginTop: 8 }}>
        <a
          href="https://blog.naver.com/mipoomdal"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: 2, transition: 'color 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent)'}
        >
          Blog
        </a>
      </p>
    </footer>
  );
}
