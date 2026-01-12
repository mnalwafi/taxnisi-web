'use client'

import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { useLanguage } from '@/context/LanguageContext'
import ServiceItem from '@/components/ServiceItem'
import type { Service } from '@/payload-types'

export default function ServicesClient({ services }: { services: Service[] }) {
  const { content } = useLanguage() // <--- Hooks into translation
  const containerRef = useRef<HTMLDivElement>(null)

  // Optional: Add entrance animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-header',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-white text-black min-h-screen pt-40 px-4 md:px-10 pb-20">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-20">
        <h1 className="service-header font-serif text-[12vw] leading-[0.8] mb-8">
          {content.services_page.title} {/* Translated Title */}
        </h1>
        <p className="service-header text-xl md:text-2xl opacity-60 max-w-2xl">
          {content.services_page.subtitle} {/* Translated Subtitle */}
        </p>
      </div>

      {/* SERVICE LIST */}
      <div className="max-w-7xl mx-auto border-t border-black/10">
        {services.length > 0 ? (
          services.map((service, index) => (
            <ServiceItem key={service.id} service={service} index={index} />
          ))
        ) : (
          <div className="py-20 opacity-40">{content.services_page.empty}</div>
        )}
      </div>
    </div>
  )
}
