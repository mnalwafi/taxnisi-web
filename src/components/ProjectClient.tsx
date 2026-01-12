'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext' // <--- Now we can use this!
import RichText from '@/components/RichText'
import MagneticButton from '@/components/ui/MagneticButton'
import type { CaseStudy, Media } from '@/payload-types'

export default function ProjectClient({
  project,
  nextProject,
}: {
  project: CaseStudy
  nextProject: CaseStudy | null
}) {
  const { content } = useLanguage() // Get translations

  return (
    <main className="bg-white text-black min-h-screen">
      {/* HERO HEADER */}
      <header className="pt-32 px-4 md:px-10 pb-20 max-w-7xl mx-auto">
        <Link
          href="/case-studies"
          className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity mb-8 block"
        >
          ← {content.menu.works}
        </Link>

        <h1 className="font-serif text-[10vw] leading-[0.85] mb-12">{project.title}</h1>

        {/* METADATA GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black/10 pt-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 block mb-2">
              {content.project_page.client}
            </span>
            <p className="text-lg">{project.client}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 block mb-2">
              {content.project_page.sector}
            </span>
            <p className="text-lg">{project.sector}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 block mb-2">
              {content.project_page.year}
            </span>
            <p className="text-lg">{new Date(project.date).getFullYear()}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 block mb-2">
              {content.project_page.result}
            </span>
            <p className="text-lg font-bold">{project.result}</p>
          </div>
        </div>
      </header>

      {/* HERO IMAGE */}
      <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
        <Image
          src={(project.coverImage as Media)?.url || ''}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT BODY */}
      <section className="px-4 md:px-10 py-20 md:py-32 max-w-4xl mx-auto">
        <RichText content={project.content} className="text-lg md:text-xl leading-relaxed" />

        {project.url && (
          <div className="mt-20">
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <MagneticButton className="border border-black px-10 py-4 rounded-full hover:bg-black hover:text-white transition-colors">
                {content.project_page.visit_site}
              </MagneticButton>
            </a>
          </div>
        )}
      </section>

      {/* NEXT PROJECT FOOTER */}
      {nextProject && (
        <section className="bg-[#111] text-white py-32 px-4 md:px-10 text-center">
          <p className="text-sm uppercase tracking-widest opacity-50 mb-8">
            {content.project_page.next_project}
          </p>
          <Link href={`/case-studies/${nextProject.slug}`} className="block">
            <h2 className="font-serif text-6xl md:text-8xl hover:italic transition-all duration-300">
              {nextProject.title}
            </h2>
          </Link>
        </section>
      )}
    </main>
  )
}
