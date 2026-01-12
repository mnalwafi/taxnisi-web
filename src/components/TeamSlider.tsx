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
      // Calculate how far to move: (Total Width of Slides - Viewport Width)
      const totalWidth = sliderRef.current?.scrollWidth || 0
      const viewportWidth = window.innerWidth
      const xMove = -(totalWidth - viewportWidth + 100) // +100 for padding

      if (window.innerWidth > 768) {
        // Only enable on Desktop
        gsap.to(sliderRef.current, {
          x: xMove,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true, // PIN THE PAGE
            scrub: 1, // SMOOTH SCROLL LINK
            start: 'top top',
            end: '+=50%', // The scroll distance (longer = slower slide)
          },
        })
      }
    }, containerRef)
    return () => ctx.revert()
  }, [team])

  return (
    // This container gets PINNED
    <div
      ref={containerRef}
      className="h-screen w-full bg-[#111] text-white flex flex-col justify-center overflow-hidden"
    >
      <div className="px-10 mb-10 md:absolute md:top-10 md:left-0 w-full z-10">
        <p className="text-sm uppercase tracking-widest opacity-50 font-bold">{label}</p>
      </div>

      {/* The Sliding Strip */}
      <div ref={sliderRef} className="flex gap-10 px-10 md:gap-20 md:px-20 w-fit">
        {team.map((member, i) => (
          <div key={i} className="group relative w-[300px] md:w-[400px] flex-shrink-0">
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
