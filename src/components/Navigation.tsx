"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "서비스", href: "#services" },
  { name: "포트폴리오", href: "#portfolio" },
  { name: "가격", href: "#pricing" },
  { name: "문의", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s',
          backgroundColor: isScrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
            {/* Logo */}
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

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="#pricing" className="btn-primary" style={{ fontSize: '14px', padding: '12px 24px' }}>
                무료로 시작하기
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                style={{ width: '24px', height: '2px', backgroundColor: '#fff', display: 'block' }}
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                style={{ width: '24px', height: '2px', backgroundColor: '#fff', display: 'block' }}
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                style={{ width: '24px', height: '2px', backgroundColor: '#fff', display: 'block' }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              backgroundColor: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(20px)',
              paddingTop: '96px',
              paddingLeft: '24px',
              paddingRight: '24px',
            }}
            className="md:hidden"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      fontSize: '28px',
                      fontWeight: '500',
                      color: '#fff',
                      textDecoration: 'none',
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="#pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary"
                  style={{ display: 'inline-block', marginTop: '16px', textAlign: 'center' }}
                >
                  무료로 시작하기
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
