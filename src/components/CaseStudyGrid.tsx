'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import type { CaseStudy, Media } from '@/payload-types'
import { useLanguage } from '@/context/LanguageContext'

export default function CaseStudyGrid({ projects }: { projects: CaseStudy[] }) {
  const { content } = useLanguage()

  // 1. Extract Unique Sectors for Filter Buttons
  const sectors = [
    content.case_studies_page.filter_all,
    ...Array.from(new Set(projects.map((p) => p.sector))),
  ]
  const [activeFilter, setActiveFilter] = useState(content.case_studies_page.filter_all)

  const gridRef = useRef<HTMLDivElement>(null)

  // 2. Filter Logic
  const filteredProjects =
    activeFilter === content.case_studies_page.filter_all
      ? projects
      : projects.filter((p) => p.sector === activeFilter)

  // 3. Animation when filter changes
  useEffect(() => {
    if (!gridRef.current) return

    // Animate items Entrance
    gsap.fromTo(
      gridRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
    )
  }, [activeFilter])

  return (
    <div className="min-h-screen bg-white text-black pt-40 px-4 md:px-10 pb-20">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-20">
        <h1 className="font-serif text-[12vw] leading-[0.8] mb-8">
          {content.case_studies_page.title}
        </h1>
        <p className="text-xl md:text-2xl opacity-60 max-w-2xl">
          {content.case_studies_page.subtitle}
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-wrap gap-4 sticky top-32 z-40 mix-blend-mode-multiply">
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setActiveFilter(sector)}
            className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-all duration-300 border border-black
              ${
                activeFilter === sector
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black hover:bg-black/5'
              }`}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* THE GRID */}
      <div
        ref={gridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20"
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, i) => (
            <Link key={project.id} href={`/case-studies/${project.slug}`} className="group block">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 mb-6">
                <Image
                  src={(project.coverImage as Media)?.url || ''}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>

              {/* Text Info */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 bg-black rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-50">
                      {project.sector}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-5xl group-hover:underline decoration-1 underline-offset-4">
                    {project.title}
                  </h2>
                </div>

                {/* Arrow */}
                <span className="text-2xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  →
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-2 py-20 text-center opacity-40">
            {content.case_studies_page.empty}
          </div>
        )}
      </div>
    </div>
  )
}
