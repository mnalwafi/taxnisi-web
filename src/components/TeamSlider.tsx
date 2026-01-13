'use client'

import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import type { Team, Media } from '@/payload-types'

gsap.registerPlugin(ScrollTrigger)

export default function TeamSlider({ team, label }: { team: Team[]; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // We use matchMedia so GSAP ONLY runs on Desktop (min-width: 768px)
      ScrollTrigger.matchMedia({
        '(min-width: 768px)': function () {
          const totalWidth = sliderRef.current?.scrollWidth || 0
          const viewportWidth = window.innerWidth
          const xMove = -(totalWidth - viewportWidth + 10)

          gsap.to(sliderRef.current, {
            x: xMove,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: '+=50%', // Increased slightly for smoother desktop feel
              invalidateOnRefresh: true,
            },
          })
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [team])

  return (
    <div
      ref={containerRef}
      // CHANGED: On mobile, we remove 'h-screen' and 'overflow-hidden' so it flows naturally
      className="min-h-screen w-full bg-[#111] text-white flex flex-col justify-center py-20 md:py-0 md:h-screen md:overflow-hidden relative"
    >
      <div className="px-4 md:px-10 mb-10 md:absolute md:top-10 md:left-0 w-full z-10">
        <p className="text-sm uppercase tracking-widest opacity-50 font-bold">{label}</p>
      </div>

      {/* The Sliding Strip */}
      <div
        ref={sliderRef}
        // CHANGED: Added mobile scroll classes (overflow-x-auto, snap-x)
        // and reset them on desktop (md:overflow-visible)
        className="flex gap-4 px-4 w-full overflow-x-auto snap-x snap-mandatory no-scrollbar md:gap-20 md:px-20 md:w-fit md:overflow-visible"
      >
        {team.map((member, i) => (
          // CHANGED: Added min-w-[85vw] for mobile sizing
          <div key={i} className="group relative w-[85vw] md:w-[400px] flex-shrink-0 snap-center">
            {/* Image Card */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 mb-8">
              <Image
                src={(member.photo as Media)?.url || ''}
                alt={member.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Text */}
            <h3 className="font-serif text-3xl md:text-4xl">{member.name}</h3>
            <p className="text-sm uppercase tracking-widest opacity-50 mt-2">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
