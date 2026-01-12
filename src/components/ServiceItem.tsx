'use client'

import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import MagneticButton from '@/components/ui/MagneticButton'
import Link from 'next/link'
import type { Service } from '@/payload-types'

export default function ServiceItem({ service, index }: { service: Service; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Animate height when isOpen changes
  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: 'auto', duration: 0.5, ease: 'power3.out' })
      gsap.to(contentRef.current, { opacity: 1, duration: 0.4, delay: 0.1 })
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: 'power3.in' })
      gsap.to(contentRef.current, { opacity: 0, duration: 0.3 })
    }
  }, [isOpen])

  return (
    <div className="border-b border-black/10">
      {/* HEADER (Clickable) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-10 flex justify-between items-center text-left group hover:px-4 transition-all duration-300"
      >
        <div className="flex items-center gap-8">
          <span className="text-xs font-bold uppercase tracking-widest opacity-40">
            0{index + 1}
          </span>
          <h2 className="font-serif text-4xl md:text-6xl group-hover:-skew-x-12 group-hover:scale-105 transition-all duration-300">
            {service.title}
          </h2>
        </div>

        {/* Animated Plus/Minus Icon */}
        <div className="relative w-4 h-4">
          <span className="absolute top-1/2 left-0 w-full h-[1px] bg-black" />
          <span
            className={`absolute top-1/2 left-0 w-full h-[1px] bg-black transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-90'}`}
          />
        </div>
      </button>

      {/* CONTENT (Hidden by default) */}
      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden">
        <div className="pb-12 pl-0 md:pl-16 max-w-3xl">
          <p className="text-xl font-light opacity-70 mb-8 leading-relaxed">
            {service.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {service.features?.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                <span className="text-sm uppercase tracking-wide opacity-60">{f.item}</span>
              </div>
            ))}
          </div>

          <Link href="/contact">
            <MagneticButton className="border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest">
                Consult this Service
              </span>
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
