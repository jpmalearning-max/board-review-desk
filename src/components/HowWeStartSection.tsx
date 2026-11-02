import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { HOW_WE_START_STEPS, SITE_DETAILS } from '../data/siteDetails';
import { MaskedLines } from './VisualPrimitives';

export const HowWeStartSection: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.72', 'end 0.55'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="how-we-start"
      className="border-t border-[#1E2A2E]/12 bg-[#F6F1E7] py-[68px] lg:py-[136px]"
    >
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8 lg:px-10">
        <MaskedLines
          as="h2"
          className="font-serif text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.02em] text-[#1E2A2E] mb-12 lg:mb-16"
          lines={['How we start']}
        />

        <div ref={timelineRef} className="relative pl-9 sm:pl-14">
          {/* Thin 1px vertical background track */}
          <div
            aria-hidden="true"
            className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-px bg-[#1E2A2E]/12"
          />

          {/* Accent vertical progress fill */}
          <motion.div
            aria-hidden="true"
            style={shouldReduceMotion ? undefined : { scaleY }}
            className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-[2px] -ml-[0.5px] origin-top bg-[#0F6B6B]"
          />

          <ol className="space-y-12 lg:space-y-16">
            {HOW_WE_START_STEPS.map((step, index) => {
              const isLast = index === HOW_WE_START_STEPS.length - 1;
              return (
                <li key={step.number} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-9 sm:-left-14 top-2 flex h-[23px] w-[23px] sm:h-[31px] sm:w-[31px] items-center justify-center rounded-full border border-[#1E2A2E]/20 bg-[#F6F1E7]"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0F6B6B]" />
                  </span>

                  <div className="flex flex-col">
                    <span className="font-serif text-[26px] leading-none tabular-nums text-[#0F6B6B] mb-2">
                      {step.number}
                    </span>

                    <h3 className="font-serif text-[32px] sm:text-[40px] leading-[1.05] text-[#1E2A2E] mb-3">
                      {step.title}
                    </h3>

                    <p className="text-[18px] leading-[1.6] text-[#4A5A63] max-w-[62ch]">
                      {step.description}
                    </p>

                    {isLast && SITE_DETAILS.price && (
                      <p className="mt-6 pt-5 border-t border-[#1E2A2E]/12 font-serif text-[28px] sm:text-[32px] leading-[1.15] text-[#1E2A2E]">
                        {SITE_DETAILS.price}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
