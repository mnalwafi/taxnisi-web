'use client'

import React from 'react'
import Image from 'next/image'
import type { CaseStudy, Media } from '@/payload-types'
import Link from 'next/link'

interface ProjectCardProps {
  project: CaseStudy
  index: number
  total: number
  labels: {
    // <--- Add this new prop
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
    <div
      className="sticky top-0 w-full h-screen flex items-center justify-center p-4 md:p-10"
      style={{ top: `${index * 20}px` }}
    >
      <div
        className="relative w-full max-w-6xl h-[70vh] rounded-3xl overflow-hidden bg-[#111] text-white flex flex-col md:flex-row shadow-2xl border border-white/10"
        style={{ zIndex: index }}
      >
        {/* TEXT SECTION */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between z-10">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full">
                {project.sector}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest opacity-50">
                0{index + 1} / 0{total}
              </span>
            </div>
            <h3 className="font-serif text-4xl md:text-6xl leading-tight mb-6">{project.title}</h3>
            <p className="opacity-70 font-sans text-lg max-w-sm">
              {/* Use the dynamic label here */}
              {labels.key_result}: <span className="text-white font-bold">{project.result}</span>
            </p>
          </div>

          <Link href={`/case-studies/${(project as any).slug}`} className="self-start mt-8 ...">
            <button className="text-sm uppercase tracking-widest border-b border-white pb-1 hover:opacity-50 transition-opacity">
              {labels.read_more}
            </button>
          </Link>
        </div>

        {/* IMAGE SECTION */}
        <div className="absolute inset-0 md:relative md:w-1/2 h-full opacity-20 md:opacity-100">
          <Image src={getCoverUrl(project)} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent md:hidden" />
        </div>
      </div>
    </div>
  )
}
