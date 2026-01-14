'use client'

import React, { useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import MagneticButton from '@/components/ui/MagneticButton'
import { useLanguage } from '@/context/LanguageContext'

export default function NotFoundClient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { content } = useLanguage()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Reveal the "404" code
      tl.from('.error-code span', {
        y: '100%',
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        delay: 0.2,
      })
        // 2. Reveal the title and description
        .from(
          '.error-content',
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.8',
        )
        // 3. Reveal the button
        .from(
          '.error-btn',
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.6',
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white text-black overflow-hidden px-4"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gray-50 rounded-full -z-10 blur-3xl opacity-50" />

      <div className="text-center flex flex-col items-center z-10">
        {/* Massive 404 Typography */}
        <h1 className="error-code font-serif text-[30vw] leading-[0.8] tracking-tighter mix-blend-difference overflow-hidden">
          <span className="inline-block">4</span>
          <span className="inline-block text-gray-300 italic">0</span>
          <span className="inline-block">4</span>
        </h1>

        {/* Text Content */}
        <div className="error-content mt-8 md:mt-0 max-w-md mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl">{content.not_found.title}</h2>
          <p className="text-black/60 font-sans leading-relaxed">{content.not_found.description}</p>
        </div>

        {/* Magnetic Button CTA */}
        <div className="error-btn mt-12">
          <Link href="/">
            <MagneticButton className="px-10 py-5 rounded-full bg-black text-white hover:bg-black/90 transition-colors flex items-center gap-4 group">
              <span className="text-lg font-medium">{content.not_found.button}</span>
              <div className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform" />
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* Footer minimal info */}
      <div className="absolute bottom-10 left-0 w-full text-center opacity-30 text-xs uppercase tracking-widest font-bold">
        Taxnisi Agency &copy; 2026
      </div>
    </main>
  )
}
