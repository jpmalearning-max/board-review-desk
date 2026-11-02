import React, { useRef } from 'react';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { WhatIDoSection } from './components/WhatIDoSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { HowWeStartSection } from './components/HowWeStartSection';
import { AboutSection } from './components/AboutSection';
import { QuestionsSection } from './components/QuestionsSection';
import { FinalAndFooter } from './components/FinalAndFooter';

export function App() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#1E2A2E]">
      <TopBar />
      <main>
        <HeroSection heroRef={heroRef} />
        <ProblemSection />
        <WhatIDoSection />
        <BeforeAfterSection />
        <HowWeStartSection />
        <AboutSection />
        <QuestionsSection />
      </main>
      <FinalAndFooter heroRef={heroRef} />
    </div>
  );
}

export default App;
