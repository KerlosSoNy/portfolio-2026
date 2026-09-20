'use client'

import { useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useRef } from 'react'
import { ImagesScrollingAnimation } from '@/components/scrolling'
import { PrismaHero } from '@/components/shared/NewHero'
import AboutSection from '@/components/shared/AboutSection'
import { LetsWorkTogether } from '@/components/shared/LetsTalk'

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
        const progress = scrollYProgress.get()
        const time = progress * video.duration

        video.currentTime = time
        lastTimeRef.current = time
      }
    }

    const primePlayback = () => {
      const playResult = video.play()
      if (playResult && typeof playResult.then === 'function') {
        playResult.then(() => video.pause()).catch(() => { })
      } else {
        video.pause()
      }
    }

    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('loadedmetadata', primePlayback)

    // In case metadata is already loaded
    if (video.readyState >= 1) {
      updateDuration()
      primePlayback()
    }

    return () => {
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('loadedmetadata', primePlayback)

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
      <div className="w-screen h-screen backdrop-blur-lg fixed top-0" />
      <PrismaHero />
      <AboutSection />
      <LetsWorkTogether />
    </main>
  )
}