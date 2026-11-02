import React, { useId, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { SITE_DETAILS } from '../data/siteDetails';

export const FilmGrain: React.FC = () => {
  const filterId = useId();
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay select-none"
    >
      <filter id={filterId}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves={4}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  );
};

interface RichMediaSlotProps {
  src: string;
  alt: string;
  fallbackGlyph: string;
  gradientClass?: string;
  sizeVariant?: 'large' | 'avatar';
  className?: string;
}

export const RichMediaSlot: React.FC<RichMediaSlotProps> = ({
  src,
  alt,
  fallbackGlyph,
  gradientClass = 'rich-panel-me',
  sizeVariant = 'large',
  className = '',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${gradientClass} ${className}`}>
      {(!loaded || failed) && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center select-none"
        >
          <FilmGrain />
          <span
            className={
              sizeVariant === 'avatar'
                ? 'font-serif text-[36px] leading-none tracking-tight outline-serif-sm'
                : 'font-serif text-[124px] sm:text-[156px] lg:text-[184px] leading-none tracking-tight outline-serif'
            }
          >
            {fallbackGlyph}
          </span>
        </div>
      )}
      {!failed && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`relative z-10 h-full w-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

interface BrandLogoProps {
  onInk?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ onInk = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <a
      href="#top"
      aria-label={SITE_DETAILS.businessName}
      className={`inline-flex items-center shrink-0 whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F6B6B] ${
        onInk
          ? 'bg-[#F6F1E7] text-[#1E2A2E] rounded-2xl px-3.5 py-1.5'
          : 'text-[#1E2A2E] py-1'
      }`}
    >
      {!failed && (
        <img
          src={SITE_DETAILS.images.logo}
          alt={SITE_DETAILS.businessName}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-8 w-auto object-contain ${
            loaded ? 'block' : 'hidden'
          }`}
        />
      )}
      {(!loaded || failed) && (
        <span className="inline-flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg rich-panel-me"
          >
            <FilmGrain />
            <span className="font-serif text-[17px] leading-none outline-serif-sm">
              {SITE_DETAILS.founderInitials}
            </span>
          </span>
          <span className="font-serif text-[22px] sm:text-[24px] leading-none tracking-tight text-[#1E2A2E]">
            {SITE_DETAILS.businessName}
          </span>
        </span>
      )}
    </a>
  );
};

interface MagneticButtonLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: 'accent' | 'outline' | 'plain';
  className?: string;
}

export const MagneticButtonLink: React.FC<MagneticButtonLinkProps> = ({
  href,
  children,
  external = true,
  variant = 'accent',
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.4 });

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || e.pointerType === 'touch' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.16;
    const offsetY = (e.clientY - centerY) * 0.22;
    rawX.set(Math.max(-7, Math.min(7, offsetX)));
    rawY.set(Math.max(-5, Math.min(5, offsetY)));
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const variantClasses =
    variant === 'accent'
      ? 'rounded-full bg-[#0F6B6B] text-[#F6F1E7] px-6 py-3.5 text-[16px] font-medium hover:bg-[#0c5959] border border-[#F6F1E7]/12'
      : variant === 'outline'
        ? 'rounded-full border border-[#1E2A2E]/20 text-[#1E2A2E] px-6 py-3.5 text-[16px] font-medium hover:border-[#1E2A2E]/45'
        : 'text-[17px] font-medium underline underline-offset-4 decoration-current/35 hover:decoration-current py-2';

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={shouldReduceMotion ? undefined : { x, y }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      className={`inline-flex items-center justify-center whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F6B6B] ${variantClasses} ${className}`}
    >
      {children}
    </motion.a>
  );
};

interface MaskedLinesProps {
  lines: React.ReactNode[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export const MaskedLines: React.FC<MaskedLinesProps> = ({
  lines,
  as = 'h2',
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Tag = as;

  if (shouldReduceMotion) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.09em] -mb-[0.09em]">
          <motion.span
            className="block"
            initial={{ y: '105%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.72,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

interface BottomClipWipeProps {
  children: React.ReactNode;
  className?: string;
}

export const BottomClipWipe: React.FC<BottomClipWipeProps> = ({
  children,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.6 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};
