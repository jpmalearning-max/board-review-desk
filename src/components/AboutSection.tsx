import React from 'react';
import { SITE_DETAILS } from '../data/siteDetails';
import {
  BottomClipWipe,
  MagneticButtonLink,
  MaskedLines,
  RichMediaSlot,
} from './VisualPrimitives';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="border-t border-[#1E2A2E]/12 bg-[#F6F1E7] py-[68px] lg:py-[136px]"
    >
      <div className="mx-auto max-w-[880px] px-5 sm:px-8 lg:px-10">
        <div className="rounded-[28px] border border-[#1E2A2E]/12 p-7 sm:p-12 lg:p-16">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-8 lg:mb-10">
            <BottomClipWipe className="shrink-0">
              <RichMediaSlot
                src={SITE_DETAILS.images.me}
                alt={SITE_DETAILS.founderName}
                fallbackGlyph={SITE_DETAILS.founderInitials}
                gradientClass="rich-panel-me"
                sizeVariant="avatar"
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border border-[#1E2A2E]/12"
              />
            </BottomClipWipe>

            <MaskedLines
              as="h2"
              className="font-serif text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.0] tracking-[-0.02em] text-[#1E2A2E]"
              lines={[`A note from ${SITE_DETAILS.founderName}`]}
            />
          </div>

          <p className="text-[20px] sm:text-[22px] leading-[1.65] text-[#1E2A2E] max-w-[62ch] mb-8">
            {SITE_DETAILS.aboutLetter}
          </p>

          <p
            aria-label={`Signed ${SITE_DETAILS.founderFirstName}`}
            className="font-signature text-[44px] sm:text-[50px] leading-none text-[#1E2A2E] mb-9"
          >
            {SITE_DETAILS.founderFirstName}
          </p>

          <MagneticButtonLink href={SITE_DETAILS.bookingUrl} variant="accent">
            Book a 20 minute call with {SITE_DETAILS.founderFirstName}
          </MagneticButtonLink>
        </div>
      </div>
    </section>
  );
};
