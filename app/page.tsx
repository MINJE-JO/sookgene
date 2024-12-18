import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import TypesSection from '@/components/sections/TypesSection';
import SolutionSection from '@/components/sections/SolutionSection';
import ProductSection from '@/components/sections/ProductSection';
import DotNavigation from '@/components/navigation/DotNavigation';

export default function Home() {
  return (
    <main className="relative">
      <DotNavigation />
      <HeroSection />
      <ProblemSection />
      <TypesSection />
      <SolutionSection />
      <ProductSection />
    </main>
  );
}
