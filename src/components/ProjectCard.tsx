'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { CaseStudy, Media } from '@/payload-types'

interface ProjectCardProps {
  project: CaseStudy
  index: number
  total: number
  labels: {
    key_result: string
    read_more: string
  }
}

export default function ProjectCard({ project, index, total, labels }: ProjectCardProps) {
  const getCoverUrl = (project: CaseStudy) => {
    const cover = project.coverImage as Media
    return cover?.url || ''
  }

  return (
    // CHANGED: No more 'sticky'. Now it's a slide item.
    // 'snap-center' ensures it locks into place when scrolling.
    <div className="relative w-full h-[50vh] md:h-[60vh] group">
      <Link href={`/case-studies/${(project as any).slug}`} className="block w-full h-full">
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#111] text-white flex flex-col justify-end p-8 md:p-12 shadow-xl border border-white/10 transition-transform duration-500 hover:scale-[0.98]">
          {/* IMAGE BACKGROUND */}
          <div className="absolute inset-0 z-0">
            <Image
              src={getCoverUrl(project)}
              alt={project.title}
              fill
              className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
          </div>

          {/* TEXT CONTENT (Z-Index to sit on top) */}
          <div className="relative z-10 w-full">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest border border-white/30 px-3 py-1 rounded-full mb-6 inline-block backdrop-blur-md">
                  {project.sector}
                </span>
                <h3 className="font-serif text-3xl md:text-5xl leading-tight mb-4 max-w-lg">
                  {project.title}
                </h3>
                <p className="opacity-70 font-sans text-sm md:text-base">
                  {labels.key_result}:{' '}
                  <span className="text-white font-bold">{project.result}</span>
                </p>
              </div>

              {/* Arrow Button */}
              <div className="hidden md:flex w-16 h-16 rounded-full border border-white/20 items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
