'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '세종 눈썹문신(반영구) 시술은 어떤 방식인가요?',
    answer: 'beauty mowho에서는 다이아페더링 기법으로 눈썹 반영구 시술을 진행합니다. 다이아몬드 패턴으로 한 올 한 올 자연스러운 눈썹결을 표현하며, 기존 엠보 기법과 달리 탈각 과정이 없고 시술 당일 세안이 가능합니다.',
  },
  {
    question: '세종시 반영구 화장 시술 시간은 얼마나 걸리나요?',
    answer: '눈썹 반영구는 약 1시간 30분~2시간, 입술 반영구(워터풀시럽립)는 약 2시간, 아이라인은 약 1시간 정도 소요됩니다. 1:1 맞춤 디자인 상담 시간이 포함되어 있습니다.',
  },
  {
    question: '반영구 눈썹 유지 기간은 얼마나 되나요?',
    answer: '개인의 피부 타입과 관리에 따라 다르지만, 보통 1년~2년 정도 유지됩니다. 유지력을 높이기 위해 시술 후 관리법을 안내해 드리며, 리터치 시술도 가능합니다.',
  },
  {
    question: '세종 뷰티모후 위치와 영업시간이 어떻게 되나요?',
    answer: '세종특별자치시 다솜1로 21에 위치하고 있습니다. 영업시간은 매일 오전 10시~오후 8시이며, 예약제로 운영됩니다. 전화(010-7316-7783) 또는 카카오톡으로 예약하실 수 있습니다.',
  },
  {
    question: '눈썹문신 시술 시 통증이 있나요?',
    answer: '시술 전 마취 크림을 도포하여 통증을 최소화합니다. 대부분의 고객님들이 편안하게 시술을 받으시며, 시술 중에도 추가 마취가 가능합니다.',
  },
  {
    question: '세종 반영구 화장 예약은 어떻게 하나요?',
    answer: '전화(010-7316-7783) 또는 카카오톡 오픈채팅으로 예약하실 수 있습니다. 원하시는 시술과 날짜를 말씀해 주시면 미대출신 원장이 직접 1:1 맞춤 상담을 진행합니다.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section" id="faq" style={{ background: 'var(--bg)' }}>
      <div className="section-inner" style={{ maxWidth: 800 }}>
        <div className="section-header">
          <p className="section-label">자주 묻는 질문</p>
          <h2 className="section-title">세종 눈썹문신 FAQ</h2>
          <div className="section-divider" />
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid var(--border)',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '24px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  textAlign: 'left',
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  lineHeight: 1.6,
                }}>
                  {faq.question}
                </h3>
                <span style={{
                  fontSize: '1.2rem',
                  color: 'var(--accent)',
                  flexShrink: 0,
                  transition: 'transform 0.3s var(--ease)',
                  transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                }}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.9,
                      paddingBottom: 24,
                    }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
