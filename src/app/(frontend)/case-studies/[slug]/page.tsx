import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import RichText from '@/components/RichText'
import MagneticButton from '@/components/ui/MagneticButton'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // 1. Fetch Project by Slug
  const { docs } = await payload.find({
    collection: 'case-studies',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const project = docs[0]
  if (!project) return notFound()

  // 2. Helper for Images
  const coverUrl = (project.coverImage as Media)?.url || ''

  // 3. Find Next Project (Simple Logic: just get one that isn't this one)
  const { docs: nextDocs } = await payload.find({
    collection: 'case-studies',
    where: { id: { not_equals: project.id } },
    limit: 1,
  })
  const nextProject = nextDocs[0]

  return (
    <main className="bg-white text-black font-sans w-full min-h-screen">
      {/* HERO SECTION */}
      <header className="relative w-full h-[80vh] bg-[#111]">
        <Image
          src={coverUrl}
          alt={project.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-10 pb-20 text-white">
          <div className="max-w-4xl">
            <span className="block border border-white/30 px-3 py-1 rounded-full w-fit mb-6 text-xs font-bold uppercase tracking-widest">
              {project.sector}
            </span>
            <h1 className="font-serif text-6xl md:text-9xl leading-[0.9] mb-8">{project.title}</h1>
            <div className="flex gap-12 border-t border-white/30 pt-6">
              <div>
                <span className="block text-xs uppercase opacity-60 mb-1">Key Result</span>
                <span className="font-serif text-3xl md:text-4xl">{project.result}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT SECTION (Editorial Layout) */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {/* Left Column: Challenge */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest mb-8 text-red-600">
              The Challenge
            </span>
            <RichText content={project.challenge} className="text-xl md:text-2xl font-light" />
          </div>

          {/* Right Column: Solution */}
          <div className="md:pt-32">
            {' '}
            {/* Offset for magazine look */}
            <span className="block text-xs font-bold uppercase tracking-widest mb-8 text-green-600">
              The Solution
            </span>
            <RichText content={project.solution} className="text-lg opacity-80" />
          </div>
        </div>
      </section>

      {/* NEXT PROJECT FOOTER */}
      {nextProject && (
        <section className="h-[60vh] bg-[#111] text-white flex flex-col justify-center items-center text-center px-4 relative group overflow-hidden">
          {/* Background Image of Next Project (Reveals on hover) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
            <Image
              src={(nextProject.coverImage as Media)?.url || ''}
              alt="Next"
              fill
              className="object-cover grayscale"
            />
          </div>

          <p className="text-sm uppercase tracking-widest opacity-50 mb-4 z-10">Next Case Study</p>
          <h2 className="font-serif text-[8vw] leading-none mb-8 z-10">{nextProject.title}</h2>
          <Link href={`/case-studies/${(nextProject as any).slug}`} className="z-10">
            <MagneticButton className="bg-white text-black px-10 py-3 rounded-full hover:scale-105 transition-transform">
              View Project
            </MagneticButton>
          </Link>
        </section>
      )}
    </main>
  )
}
