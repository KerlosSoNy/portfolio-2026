'use client'

import { useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useRef } from 'react'
import { ImagesScrollingAnimation } from '@/components/scrolling'
import { PrismaHero } from '@/components/shared/NewHero'
import { AboutSection } from '@/components/shared/AboutSection'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const durationRef = useRef(0)
  const progressRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef(-1)

  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    const updateDuration = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        durationRef.current = video.duration

        // Sync video immediately with current scroll position
        const progress = scrollYProgress.get()
        const time = progress * video.duration

        video.currentTime = time
        lastTimeRef.current = time
      }
    }

    video.addEventListener('loadedmetadata', updateDuration)

    // In case metadata is already loaded
    if (video.readyState >= 1) {
      updateDuration()
    }

    return () => {
      video.removeEventListener('loadedmetadata', updateDuration)

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [scrollYProgress])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    progressRef.current = progress

    if (rafRef.current !== null) return

    rafRef.current = requestAnimationFrame(() => {
      const video = videoRef.current
      const duration = durationRef.current

      if (!video || !duration) {
        rafRef.current = null
        return
      }

      const targetTime = progressRef.current * duration

      // Only seek when there is a meaningful change
      if (Math.abs(targetTime - lastTimeRef.current) > 0.005) {
        video.currentTime = targetTime
        lastTimeRef.current = targetTime
      }

      rafRef.current = null
    })
  })

  return (
    <main className="relative gap-6 flex min-h-screen w-screen max-w-screen flex-col items-center justify-center overflow-x-hidden font-sans">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen object-cover"
      >
        <source
          src="/videos/new-scroll.mp4"
          type="video/mp4"
        />
      </video>

      <PrismaHero />
      <ImagesScrollingAnimation />
    </main>
  )
}