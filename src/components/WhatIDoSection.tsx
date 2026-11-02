import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { SITE_DETAILS, WORK_CARDS, WorkCardItem } from '../data/siteDetails';
import { BottomClipWipe, MaskedLines, RichMediaSlot } from './VisualPrimitives';

interface ServiceCardProps {
  card: WorkCardItem;
  className?: string;
  wipeImage?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  card,
  className = '',
  wipeImage = false,
}) => {
  const media = (
    <RichMediaSlot
      src={card.image}
      alt={card.title}
      fallbackGlyph={card.number}
      gradientClass={card.gradientClass}
      className="h-full w-full"
    />
  );

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-[28px] border border-[#1E2A2E]/12 bg-[#F6F1E7] ${className}`}
    >
      <div className="h-[58%] min-h-[210px] sm:min-h-[260px] lg:min-h-[300px] w-full overflow-hidden border-b border-[#1E2A2E]/12">
        {wipeImage ? (
          <BottomClipWipe className="h-full w-full">{media}</BottomClipWipe>
        ) : (
          media
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-9">
        <div className="flex items-baseline gap-3.5 mb-4">
          <span className="font-serif text-[28px] leading-none tabular-nums text-[#0F6B6B]">
            {card.number}
          </span>
          <h3 className="font-serif text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.02] text-[#1E2A2E]">
            {card.title}
          </h3>
        </div>

        <div className="space-y-3 text-[17px] sm:text-[18px] leading-[1.55] max-w-[66ch]">
          <p className="text-[#4A5A63]">
            <span className="font-semibold text-[#1E2A2E]">Today: </span>
            {card.today}
          </p>
          <p className="text-[#1E2A2E]">
            <span className="font-semibold text-[#1E2A2E]">
              With {SITE_DETAILS.businessName}:{' '}
            </span>
            {card.withBrand}
          </p>
        </div>
      </div>
    </article>
  );
};

export const WhatIDoSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const viewportFrameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const measure = () => {
      if (!trackRef.current || !viewportFrameRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const frameWidth = viewportFrameRef.current.clientWidth;
      const delta = Math.max(0, trackWidth - frameWidth);
      setMaxShift(delta);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    if (trackRef.current) resizeObserver.observe(trackRef.current);
    if (viewportFrameRef.current) resizeObserver.observe(viewportFrameRef.current);
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({
    target: pinSectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);

  if (shouldReduceMotion) {
    return (
      <section
        id="what-i-do"
        className="bg-[#F6F1E7] py-[68px] lg:py-[132px]"
      >
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <h2 className="font-serif text-[44px] lg:text-[72px] leading-[1.0] tracking-[-0.02em] text-[#1E2A2E] mb-10 lg:mb-14">
            What I do
          </h2>
          <div className="flex flex-col gap-8 lg:gap-12">
            {WORK_CARDS.map((card) => (
              <ServiceCard
                key={card.number}
                card={card}
                className="w-full h-auto"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="what-i-do" className="bg-[#F6F1E7]">
      {/* Mobile & Tablet (< lg): stacked heading + sideways swipe cards */}
      <div className="lg:hidden py-[68px]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 mb-8">
          <MaskedLines
            as="h2"
            className="font-serif text-[44px] sm:text-[56px] leading-[1.0] tracking-[-0.02em] text-[#1E2A2E]"
            lines={['What I do']}
          />
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 sm:px-8 pb-2">
          {WORK_CARDS.map((card) => (
            <ServiceCard
              key={card.number}
              card={card}
              wipeImage
              className="w-[86vw] max-w-[520px] min-h-[500px] shrink-0 snap-center"
            />
          ))}
        </div>
      </div>

      {/* Desktop (lg+): pinned heading + scroll-linked sideways sliding 70vw cards */}
      <div ref={pinSectionRef} className="hidden lg:block relative h-[300vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16 pb-8">
          <div
            ref={viewportFrameRef}
            className="mx-auto w-full max-w-[1280px] px-10"
          >
            <MaskedLines
              as="h2"
              className="font-serif text-[72px] leading-[1.0] tracking-[-0.02em] text-[#1E2A2E] mb-8"
              lines={['What I do']}
            />

            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex items-stretch gap-8 w-max pr-10"
            >
              {WORK_CARDS.map((card) => (
                <ServiceCard
                  key={card.number}
                  card={card}
                  className="w-[70vw] max-w-[920px] h-[66vh] min-h-[470px] max-h-[620px] shrink-0"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
