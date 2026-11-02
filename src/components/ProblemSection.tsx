import React, { useMemo, useRef } from 'react';
import {
  MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { SITE_DETAILS } from '../data/siteDetails';
import { FilmGrain } from './VisualPrimitives';

interface WordTokenProps {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  reduced: boolean;
}

const WordToken: React.FC<WordTokenProps> = ({
  word,
  progress,
  start,
  end,
  reduced,
}) => {
  const opacity = useTransform(progress, [start, end], [0.22, 1]);

  if (reduced) {
    return <span className="inline text-[#F6F1E7]">{word} </span>;
  }

  return (
    <motion.span style={{ opacity }} className="inline text-[#F6F1E7]">
      {word}{' '}
    </motion.span>
  );
};

export const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.38'],
  });

  const words = useMemo(
    () => SITE_DETAILS.problemSentence.split(' '),
    []
  );

  return (
    <section
      ref={sectionRef}
      data-surface="ink"
      aria-label="The problem"
      className="relative overflow-hidden bg-[#1E2A2E] text-[#F6F1E7] py-[76px] lg:py-[148px]"
    >
      <FilmGrain />
      <div className="relative z-10 mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-10">
        <p className="font-serif text-[34px] sm:text-[46px] lg:text-[62px] leading-[1.14] tracking-[-0.01em]">
          {words.map((word, idx) => {
            const total = words.length;
            const start = idx / total;
            const end = Math.min(1, (idx + 1.6) / total);
            return (
              <WordToken
                key={`${word}-${idx}`}
                word={word}
                progress={scrollYProgress}
                start={start}
                end={end}
                reduced={Boolean(shouldReduceMotion)}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
};
