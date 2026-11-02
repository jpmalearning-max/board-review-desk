import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SITE_DETAILS } from '../data/siteDetails';
import {
  BrandLogo,
  FilmGrain,
  MagneticButtonLink,
  MaskedLines,
} from './VisualPrimitives';

interface FinalAndFooterProps {
  heroRef: React.RefObject<HTMLElement | null>;
}

export const FinalAndFooter: React.FC<FinalAndFooterProps> = ({ heroRef }) => {
  const [showStickyMobileBar, setShowStickyMobileBar] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let rafId = 0;

    const checkHeroScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setShowStickyMobileBar(rect.bottom <= 80);
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkHeroScroll);
    };

    checkHeroScroll();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [heroRef]);

  return (
    <>
      {/* 9. Final invitation, on ink */}
      <section
        data-surface="ink"
        className="relative overflow-hidden bg-[#1E2A2E] text-[#F6F1E7] py-[80px] lg:py-[148px]"
      >
        <FilmGrain />
        <div className="relative z-10 mx-auto max-w-[1040px] px-5 sm:px-8 lg:px-10">
          <MaskedLines
            as="h2"
            className="font-serif text-[46px] sm:text-[62px] lg:text-[78px] leading-[1.0] tracking-[-0.02em] text-[#F6F1E7] max-w-[16ch] mb-10"
            lines={["Let's clear your bench", 'and get more boards', 'out the door.']}
          />

          <div className="flex flex-col items-start gap-6">
            <MagneticButtonLink href={SITE_DETAILS.bookingUrl} variant="accent">
              Book a 20 minute call
            </MagneticButtonLink>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[#F6F1E7]/85">
              <a
                href={SITE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[17px] underline underline-offset-4 decoration-[#F6F1E7]/35 hover:text-[#F6F1E7] hover:decoration-[#F6F1E7] transition-colors"
              >
                Message me on WhatsApp
              </a>
              <a
                href={SITE_DETAILS.emailUrl}
                className="text-[17px] underline underline-offset-4 decoration-[#F6F1E7]/35 hover:text-[#F6F1E7] hover:decoration-[#F6F1E7] transition-colors"
              >
                {SITE_DETAILS.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Footer on ink */}
      <footer
        data-surface="ink"
        className="relative overflow-hidden border-t border-[#F6F1E7]/12 bg-[#1E2A2E] text-[#F6F1E7] pt-12 pb-28 md:pb-14"
      >
        <FilmGrain />
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-[#F6F1E7]/12">
            <div className="flex flex-wrap items-center gap-4">
              <BrandLogo onInk />
              <span aria-hidden="true" className="text-[#F6F1E7]/35">
                ·
              </span>
              <span className="text-[16px] text-[#F6F1E7]/85">
                {SITE_DETAILS.city}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[16px] text-[#F6F1E7]/85">
              <a
                href={SITE_DETAILS.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap hover:text-[#F6F1E7] underline-offset-4 hover:underline transition-colors"
              >
                Book a 20 minute call
              </a>
              <a
                href={SITE_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap hover:text-[#F6F1E7] underline-offset-4 hover:underline transition-colors"
              >
                Message me on WhatsApp
              </a>
              <a
                href={SITE_DETAILS.emailUrl}
                className="whitespace-nowrap hover:text-[#F6F1E7] underline-offset-4 hover:underline transition-colors"
              >
                {SITE_DETAILS.email}
              </a>
            </div>
          </div>

          <div className="pt-8 text-[15px] text-[#F6F1E7]/70">
            {SITE_DETAILS.year} {SITE_DETAILS.businessName}
          </div>
        </div>
      </footer>

      {/* Slim phone bottom bar after Hero scrolls away */}
      <AnimatePresence>
        {showStickyMobileBar && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-[#1E2A2E]/12 bg-[#F6F1E7] px-4 py-2.5"
          >
            <a
              href={SITE_DETAILS.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#0F6B6B] px-5 py-2.5 text-[15px] font-medium text-[#F6F1E7] whitespace-nowrap"
            >
              Book a 20 minute call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
