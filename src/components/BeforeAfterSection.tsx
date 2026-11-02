import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  EVENING_WITH,
  EVENING_WITHOUT,
  SITE_DETAILS,
} from '../data/siteDetails';
import { MaskedLines } from './VisualPrimitives';

type Mode = 'without' | 'with';

export const BeforeAfterSection: React.FC = () => {
  const [mode, setMode] = useState<Mode>('without');
  const shouldReduceMotion = useReducedMotion();

  const isWith = mode === 'with';

  return (
    <section className="border-t border-[#1E2A2E]/12 bg-[#F6F1E7] py-[68px] lg:py-[136px]">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8 lg:px-10">
        <div className="mb-10 lg:mb-12">
          <MaskedLines
            as="h2"
            className="font-serif text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.0] tracking-[-0.02em] text-[#1E2A2E] mb-8"
            lines={['Your evening on the bench']}
          />

          <div
            role="group"
            aria-label="Compare evening without and with Board Review Desk"
            className="inline-flex w-full sm:w-auto flex-col sm:flex-row rounded-[24px] sm:rounded-full border border-[#1E2A2E]/12 p-1.5 gap-1"
          >
            <button
              type="button"
              aria-pressed={!isWith}
              onClick={() => setMode('without')}
              className={`min-h-[44px] rounded-[18px] sm:rounded-full px-5 py-2.5 text-[15px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B6B] ${
                !isWith
                  ? 'bg-[#0F6B6B] text-[#F6F1E7]'
                  : 'text-[#4A5A63] hover:text-[#1E2A2E]'
              }`}
            >
              Without {SITE_DETAILS.businessName}
            </button>

            <button
              type="button"
              aria-pressed={isWith}
              onClick={() => setMode('with')}
              className={`min-h-[44px] rounded-[18px] sm:rounded-full px-5 py-2.5 text-[15px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B6B] ${
                isWith
                  ? 'bg-[#0F6B6B] text-[#F6F1E7]'
                  : 'text-[#4A5A63] hover:text-[#1E2A2E]'
              }`}
            >
              With {SITE_DETAILS.businessName}
            </button>
          </div>
        </div>

        {/* Stacked crossfade container: both lists share grid cell 1/1 */}
        <div className="grid rounded-[28px] border border-[#1E2A2E]/12 p-6 sm:p-10 lg:p-12">
          <motion.ul
            aria-hidden={isWith}
            initial={false}
            animate={{ opacity: isWith ? 0 : 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.36,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`col-start-1 row-start-1 divide-y divide-[#1E2A2E]/12 ${
              isWith ? 'pointer-events-none select-none' : ''
            }`}
          >
            {EVENING_WITHOUT.map((line, index) => (
              <li
                key={index}
                className="py-5 first:pt-0 last:pb-0 text-[18px] sm:text-[19px] leading-[1.6] text-[#1E2A2E] max-w-[66ch]"
              >
                {line}
              </li>
            ))}
          </motion.ul>

          <motion.ul
            aria-hidden={!isWith}
            initial={false}
            animate={{ opacity: isWith ? 1 : 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.36,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`col-start-1 row-start-1 divide-y divide-[#1E2A2E]/12 ${
              !isWith ? 'pointer-events-none select-none' : ''
            }`}
          >
            {EVENING_WITH.map((line, index) => (
              <li
                key={index}
                className="py-5 first:pt-0 last:pb-0 text-[18px] sm:text-[19px] leading-[1.6] text-[#1E2A2E] max-w-[66ch]"
              >
                {line}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};
