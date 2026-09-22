import { PrismaHero } from '@/components/shared/NewHero'
import AboutSection from '@/components/shared/AboutSection'
import { LetsWorkTogether } from '@/components/shared/LetsTalk'
import { TimeLine } from '@/components/atoms/TimeLine/TimeLine'
import { ProjectsSection } from '@/components/shared/ProjectsSection'
import Skills from '@/components/shared/Skills/Skills'

export default function Home() {

  return (
    <main className="relative gap-6 flex min-h-screen w-screen max-w-screen flex-col items-center justify-center overflow-x-hidden font-sans">
      <PrismaHero />
      <AboutSection />
      <TimeLine />
      <ProjectsSection />
      <Skills />
      <LetsWorkTogether />
    </main>
  )
}