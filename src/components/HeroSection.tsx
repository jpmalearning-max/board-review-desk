import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { SITE_DETAILS } from '../data/siteDetails';
import {
  BottomClipWipe,
  MagneticButtonLink,
  MaskedLines,
  RichMediaSlot,
} from './VisualPrimitives';

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroRef }) => {
  const shouldReduceMotion = useReducedMotion();
  const localRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ['start start', 'end start'],
  });

  const archParallaxY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative bg-[#F6F1E7] pt-24 pb-[68px] lg:pt-36 lg:pb-[132px]"
    >
      <div
        ref={localRef}
        className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Right on laptop, above words on phone */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <motion.div
              style={shouldReduceMotion ? undefined : { y: archParallaxY }}
              className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
            >
              <BottomClipWipe className="w-full">
                <RichMediaSlot
                  src={SITE_DETAILS.images.me}
                  alt={`${SITE_DETAILS.founderName}, founder of ${SITE_DETAILS.businessName}`}
                  fallbackGlyph={SITE_DETAILS.founderInitials}
                  gradientClass="rich-panel-me"
                  className="aspect-[4/5] w-full rounded-t-full rounded-b-none border border-[#1E2A2E]/12"
                />
              </BottomClipWipe>

              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[300px] z-20 rounded-[22px] bg-[#F6F1E7] border border-[#1E2A2E]/12 px-4 py-3">
                <p className="text-[14px] sm:text-[15px] leading-snug font-medium text-[#1E2A2E]">
                  {SITE_DETAILS.founderName}, founder of {SITE_DETAILS.businessName}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Left on laptop, below arch on phone */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-start">
            <p className="text-[15px] sm:text-[16px] leading-[1.5] text-[#4A5A63] max-w-[54ch] mb-5 lg:mb-7">
              {SITE_DETAILS.whoIHelpLine}
            </p>

            <MaskedLines
              as="h1"
              className="font-serif text-[46px] sm:text-[62px] lg:text-[78px] xl:text-[88px] leading-[1.0] tracking-[-0.02em] text-[#1E2A2E] mb-6 lg:mb-8"
              lines={[
                'Less tracing,',
                <>
                  more <em className="italic text-[#0F6B6B]">boards</em>
                </>,
                'out the door.',
              ]}
            />

            <p className="text-[18px] leading-[1.6] text-[#1E2A2E]/90 max-w-[56ch] mb-8 lg:mb-10">
              {SITE_DETAILS.heroSetupSentence}
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <MagneticButtonLink
                href={SITE_DETAILS.bookingUrl}
                variant="accent"
              >
                Book a 20 minute call
              </MagneticButtonLink>

              <MagneticButtonLink
                href={SITE_DETAILS.whatsappUrl}
                variant="plain"
                className="text-[#1E2A2E]"
              >
                Message me on WhatsApp
              </MagneticButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
