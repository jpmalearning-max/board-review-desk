import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { FAQ_ITEMS } from '../data/siteDetails';
import { MaskedLines } from './VisualPrimitives';

export const QuestionsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="border-t border-[#1E2A2E]/12 bg-[#F6F1E7] py-[68px] lg:py-[136px]">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8 lg:px-10">
        <MaskedLines
          as="h2"
          className="font-serif text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.02em] text-[#1E2A2E] mb-10 lg:mb-14"
          lines={['Questions']}
        />

        <div className="border-t border-[#1E2A2E]/12">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-btn-${idx}`;

            return (
              <div
                key={item.question}
                className="border-b border-[#1E2A2E]/12"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-6 py-6 sm:py-7 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B6B]"
                >
                  <span className="font-serif text-[26px] sm:text-[30px] leading-[1.15] text-[#1E2A2E]">
                    {item.question}
                  </span>

                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1E2A2E]/15 text-[#1E2A2E]"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 3V15M3 9H15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : {
                              opacity: 0,
                              y: -6,
                              clipPath: 'inset(0% 0% 100% 0%)',
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                        clipPath: 'inset(0% 0% 0% 0%)',
                      }}
                      exit={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              y: -4,
                              clipPath: 'inset(0% 0% 100% 0%)',
                            }
                      }
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.24,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="pb-7 pr-8"
                    >
                      <p className="text-[18px] leading-[1.6] text-[#4A5A63] max-w-[65ch]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
