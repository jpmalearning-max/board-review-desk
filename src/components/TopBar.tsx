import React, { useEffect, useState } from 'react';
import { SITE_DETAILS } from '../data/siteDetails';
import { BrandLogo, MagneticButtonLink } from './VisualPrimitives';

type BarSurface = 'transparent' | 'cream' | 'ink';

export const TopBar: React.FC = () => {
  const [surface, setSurface] = useState<BarSurface>('transparent');

  useEffect(() => {
    let rafId = 0;

    const evaluateSurface = () => {
      const scrollY = window.scrollY;
      const sampleY = 34;
      const inkSections = document.querySelectorAll<HTMLElement>('[data-surface="ink"]');

      let overInk = false;
      for (let i = 0; i < inkSections.length; i += 1) {
        const rect = inkSections[i].getBoundingClientRect();
        if (rect.top <= sampleY && rect.bottom >= sampleY) {
          overInk = true;
          break;
        }
      }

      if (overInk) {
        setSurface('ink');
      } else if (scrollY > 20) {
        setSurface('cream');
      } else {
        setSurface('transparent');
      }
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(evaluateSurface);
    };

    evaluateSurface();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  const headerClasses =
    surface === 'ink'
      ? 'bg-[#1E2A2E] text-[#F6F1E7] border-b border-[#F6F1E7]/12'
      : surface === 'cream'
        ? 'bg-[#F6F1E7] text-[#1E2A2E] border-b border-[#1E2A2E]/12'
        : 'bg-transparent text-[#1E2A2E] border-b border-transparent';

  const navLinkClasses =
    surface === 'ink'
      ? 'text-[#F6F1E7]/85 hover:text-[#F6F1E7]'
      : 'text-[#1E2A2E]/80 hover:text-[#1E2A2E]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${headerClasses}`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-[1280px] items-center justify-between gap-4 md:gap-8 px-4 sm:px-6 lg:px-10">
        <BrandLogo onInk={surface === 'ink'} />

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8 text-[16px] font-medium"
        >
          <a
            href="#what-i-do"
            className={`whitespace-nowrap shrink-0 underline-offset-4 hover:underline transition-colors duration-150 ${navLinkClasses}`}
          >
            What I do
          </a>
          <a
            href="#how-we-start"
            className={`whitespace-nowrap shrink-0 underline-offset-4 hover:underline transition-colors duration-150 ${navLinkClasses}`}
          >
            How it works
          </a>
          <a
            href="#about"
            className={`whitespace-nowrap shrink-0 underline-offset-4 hover:underline transition-colors duration-150 ${navLinkClasses}`}
          >
            About
          </a>
        </nav>

        <MagneticButtonLink
          href={SITE_DETAILS.bookingUrl}
          variant="accent"
          className="!px-4 sm:!px-5 !py-2 sm:!py-2.5 !text-[14px] sm:!text-[15px]"
        >
          Book a call
        </MagneticButtonLink>
      </div>
    </header>
  );
};
