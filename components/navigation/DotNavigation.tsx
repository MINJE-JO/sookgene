'use client';

import { useState, useEffect } from 'react';

const sections = ['hero', 'problem', 'types', 'solution', 'product'];

const useScrollSpy = (sections: string[]) => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return activeSection;
};

export default function DotNavigation() {
  const activeSection = useScrollSpy(sections);

  const handleDotClick = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-row space-x-2">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => handleDotClick(section)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSection === section
              ? 'bg-[#FF6B6B] scale-125'
              : 'bg-[#9DC6FF] hover:bg-[#2C5282]'
          }`}
          aria-label={`Scroll to ${section} section`}
        />
      ))}
    </div>
  );
} 