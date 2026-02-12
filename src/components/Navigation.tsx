'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Journal', href: '#journal' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <>
      <header className="nav-header" style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        padding: scrolled ? '16px 48px' : '24px 48px',
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.4s var(--ease)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{
            fontFamily: 'var(--serif)', fontSize: '1.6rem', fontWeight: 300,
            letterSpacing: 4, textTransform: 'uppercase' as const,
            color: scrolled ? 'var(--text-primary)' : '#fff', transition: 'color 0.3s',
          }}>
            beauty mowho
          </a>

          <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="hidden md:flex">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} onClick={(e) => handleClick(e, item.href)} style={{
                fontSize: '0.75rem', fontWeight: 400, letterSpacing: 2,
                textTransform: 'uppercase' as const,
                color: scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.7)',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.7)'}
              >{item.name}</a>
            ))}
            <a href="#contact" onClick={(e) => handleClick(e, '#contact')} style={{
              padding: '10px 28px',
              border: scrolled ? '1px solid var(--text-primary)' : '1px solid rgba(255,255,255,0.5)',
              fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase' as const,
              color: scrolled ? 'var(--text-primary)' : '#fff', transition: 'all 0.4s var(--ease)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = scrolled ? 'var(--text-primary)' : '#fff';
              e.currentTarget.style.color = scrolled ? '#fff' : 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = scrolled ? 'var(--text-primary)' : '#fff';
            }}
            >Contact</a>
          </nav>

          <button className="md:hidden block" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} aria-label="메뉴">
            <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: menuOpen ? 0 : 5 }}>
              <span style={{ display: 'block', width: 24, height: 1, background: scrolled ? 'var(--text-primary)' : '#fff', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(0.5px)' : 'none' }} />
              <span style={{ display: 'block', width: 24, height: 1, background: scrolled ? 'var(--text-primary)' : '#fff', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 24, height: 1, background: scrolled ? 'var(--text-primary)' : '#fff', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-0.5px)' : 'none' }} />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            style={{ position: 'fixed', top: 70, left: 0, right: 0, background: 'rgba(255,255,255,0.98)', zIndex: 99, padding: '32px 20px', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
            {navItems.map((item) => (
              <a key={item.name} href={item.href} onClick={(e) => handleClick(e, item.href)} style={{ fontSize: '0.85rem', fontWeight: 400, letterSpacing: 2, textTransform: 'uppercase' as const, color: 'var(--text-secondary)' }}>{item.name}</a>
            ))}
            <a href="#contact" onClick={(e) => handleClick(e, '#contact')} style={{ padding: '10px 28px', border: '1px solid var(--text-primary)', fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase' as const, color: 'var(--text-primary)' }}>Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 768px) {
          .nav-header {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>
    </>
  );
}
