"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
  {
    question: "정말 마음에 안 들면 돈 안 내도 되나요?",
    answer: "네, 정말입니다. 저희는 결과물에 자신이 있기 때문에 먼저 완성된 사이트를 보여드리고, 마음에 드실 경우에만 결제를 받습니다. 마음에 들지 않으시면 결제하실 필요 없습니다.",
  },
  {
    question: "정말 하루 만에 제작이 가능한가요?",
    answer: "네, 가능합니다. 전담 팀이 배정되어 집중적으로 작업하기 때문에 대부분의 프로젝트는 24시간 이내에 완성됩니다. 복잡한 기능이 필요한 경우 추가 시간이 소요될 수 있습니다.",
  },
  {
    question: "월 구독인데, 해지하면 사이트는 어떻게 되나요?",
    answer: "해지 후에도 제작된 코드와 디자인 파일은 모두 소유권이 고객님께 있습니다. 다른 호스팅 서비스로 이전하실 수 있도록 모든 파일을 전달해 드립니다.",
  },
  {
    question: "수정은 몇 번까지 가능한가요?",
    answer: "플랜에 따라 다릅니다. Starter는 1회, Basic은 3회, Pro 이상은 무제한 수정이 가능합니다.",
  },
  {
    question: "호스팅은 어떻게 되나요?",
    answer: "모든 플랜에 고성능 호스팅이 포함되어 있습니다. SSL 인증서도 무료로 제공됩니다.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '128px 0',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ color: '#39FF14', fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '2px' }}>
            FAQ
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 'bold', marginTop: '16px', color: '#fff' }}>
            자주 묻는 질문
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                <span style={{ paddingRight: '16px' }}>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ flexShrink: 0 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2">
                    <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{
                      padding: '0 24px 20px',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.6,
                    }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
