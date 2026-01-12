'use client'

import React, { useLayoutEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '@/components/ui/MagneticButton'
import { dictionary } from '@/lib/dictionaries'
import Image from 'next/image'
import type { CaseStudy, Client, Media, Service, Statistic } from '@/payload-types'
import ProjectCard from './ProjectCard'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

interface LandingPageProps {
  clients: Client[]
  stats: Statistic
  projects: CaseStudy[]
  services: Service[] // <--- Add this prop
}

export default function LandingPage({ clients, stats, projects, services }: LandingPageProps) {
  const [lang, setLang] = useState<'en' | 'id'>('en')
  const content = dictionary[lang]
  const containerRef = useRef(null)

  // Infinite Marquee Logic
  const marqueeList = useMemo(() => {
    if (clients.length === 0) return []
    const repeatCount = Math.ceil(20 / clients.length)
    const singleSet = Array(repeatCount).fill(clients).flat()
    return [...singleSet, ...singleSet]
  }, [clients])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from('.char-reveal', {
        y: '100%',
        duration: 1.2,
        stagger: 0.05,
        ease: 'power4.out',
        delay: 0.2,
      }).from(
        '.hero-line',
        {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.8',
      )
    }, containerRef)
    return () => ctx.revert()
  }, [lang])

  const getLogoUrl = (client: Client) => {
    const logo = client.logo as Media
    return logo.url || ''
  }

  return (
    <main ref={containerRef} className="w-full bg-white text-black overflow-hidden font-sans">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 px-4 md:px-10 pt-32">
        <div className="w-full mb-10">
          {content.hero.title_words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <h1 className="char-reveal font-serif text-[13vw] md:text-[15vw] leading-[0.85] uppercase tracking-tighter pb-2">
                {word}
              </h1>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-start border-t border-black/10 pt-6 hero-line">
          <div className="max-w-md">
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-80">
              {content.hero.description}
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex gap-12 text-sm uppercase tracking-wider opacity-60 font-medium">
            <div>
              <p className="font-bold text-black">{content.hero.location_label}</p>
              <p>Jakarta, ID</p>
            </div>
            <div>
              <p className="font-bold text-black">{content.hero.est_label}</p>
              <p>2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION (Updated with Smart Animation) */}
      <section className="py-20 md:py-32 px-4 md:px-10 border-b border-black/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          <StatItem
            value={stats.totalSaved || '0'}
            label={content.stats.label_saved}
            align="start"
          />

          <StatItem
            value={stats.averagePercentage || '0'}
            label={content.stats.label_percent}
            align="center"
            italic
          />

          <StatItem
            value={stats.activeClients || '0'}
            label={content.stats.label_clients}
            align="end"
          />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee-section py-20 border-y border-black overflow-hidden bg-black text-white">
        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
          {clients.length > 0
            ? marqueeList.map((client, i) => (
                <div
                  key={i}
                  className="relative w-64 h-24 mx-10 flex-shrink-0 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                >
                  <Image
                    src={getLogoUrl(client)}
                    alt={client.name}
                    fill
                    className="object-contain invert"
                  />
                </div>
              ))
            : [...content.marquee, ...content.marquee, ...content.marquee, ...content.marquee].map(
                (word, i) => (
                  <div key={i} className="flex-shrink-0 mx-10 flex gap-8 items-center">
                    <span
                      className={`text-7xl md:text-9xl font-serif ${i % 2 === 0 ? 'italic text-transparent stroke-white' : 'text-white'}`}
                    >
                      {word}
                    </span>
                  </div>
                ),
              )}
        </div>
      </section>

      {/* SELECTED WORKS (STICKY STACK) */}
      <section className="relative w-full bg-[#f4f4f4] text-black py-20 md:py-32">
        <div className="px-4 md:px-10 mb-20 max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-widest opacity-50 font-bold mb-4">
            {content.works.label} {/* <--- Translated Label */}
          </p>
          <h2 className="font-serif text-6xl md:text-8xl">
            {content.works.title} {/* <--- Translated Title */}
          </h2>
        </div>

        <div className="relative w-full">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              labels={content.project} // <--- Pass the translated labels here
            />
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-32 px-4 md:px-10" id="services">
        <div className="max-w-7xl mx-auto">
          {/* Keep the Label from Dictionary (so it translates "Layanan" vs "Services") */}
          <p className="text-sm uppercase tracking-widest mb-16 opacity-50 font-bold">
            {content.services.label}
          </p>

          {/* RENDER DYNAMIC SERVICES FROM DB */}
          {services.map((service, index) => (
            <Link key={service.id} href="/services">
              <div className="group border-b border-black/10 py-10 flex justify-between items-center cursor-pointer hover:px-4 transition-all duration-500 ease-out">
                <h3 className="font-serif text-4xl md:text-6xl origin-left transition-transform duration-500 ease-out group-hover:-skew-x-12 group-hover:translate-x-4">
                  {service.title}
                </h3>
                <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <span className="translate-y-[-1.5px]">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <section className="h-[80vh] bg-[#111] text-[#f4f4f4] flex flex-col justify-center items-center text-center px-4">
        <h2 className="font-serif text-[10vw] leading-none mb-8">{content.footer.title}</h2>
        <Link href="/contact">
          <MagneticButton className="bg-white text-black px-12 py-4 rounded-full text-xl hover:scale-105 transition-transform">
            {content.footer.button}
          </MagneticButton>
        </Link>
      </section>
    </main>
  )
}

// --- SUB-COMPONENT: SMART STAT ITEM ---

function StatItem({
  value,
  label,
  align = 'start',
  italic = false,
}: {
  value: string
  label: string
  align?: 'start' | 'center' | 'end'
  italic?: boolean
}) {
  const ref = useRef(null)

  // 1. SMART SIZING LOGIC
  // Calculate font size based on character length
  const getFontSize = (str: string) => {
    if (str.length <= 5) return 'text-8xl md:text-9xl' // e.g. "45M"
    if (str.length <= 10) return 'text-6xl md:text-7xl' // e.g. "$45,000"
    if (str.length <= 15) return 'text-4xl md:text-5xl' // e.g. "Rp 45 Miliar"
    return 'text-2xl md:text-4xl' // e.g. "Rp 45,000,000,000"
  }

  const fontSizeClass = getFontSize(value)
  const alignmentClass =
    align === 'center'
      ? 'md:items-center md:border-r border-black/10 md:px-12'
      : align === 'end'
        ? 'md:items-end md:pl-12'
        : 'md:items-start md:border-r border-black/10 md:pr-12'

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // 2. SMART COUNTING ANIMATION
    // Regex to find the first number in the string (e.g. "45" in "$45M")
    const match = value.match(/(\d+[.,\d]*)/)

    if (match) {
      const numberStr = match[0].replace(/,/g, '').replace(/\./g, '') // Remove formatting for calculation
      const numericValue = parseFloat(numberStr)
      const prefix = value.split(match[0])[0] // Get text before number
      const suffix = value.split(match[0])[1] // Get text after number

      // Animate a proxy object
      const proxy = { val: 0 }

      gsap.to(proxy, {
        val: numericValue,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%', // Start when item is visible
        },
        onUpdate: () => {
          // Re-format the number nicely (add commas back)
          // We assume Indonesian/US locale based on context, but 'en-US' is standard for generic commas
          const current = Math.floor(proxy.val).toLocaleString('en-US')
          if (el) (el as HTMLElement).innerText = `${prefix}${current}${suffix}`
        },
      })
    }
  }, [value])

  return (
    <div
      className={`flex flex-col justify-end text-center ${align === 'end' ? 'md:text-right' : align === 'start' ? 'md:text-left' : ''} ${alignmentClass}`}
    >
      <span
        ref={ref}
        className={`font-serif items-center h-full flex items-center block mb-2 leading-none ${fontSizeClass} ${italic ? 'italic' : ''}`}
      >
        {value} {/* Initial value before animation starts */}
      </span>
      <span className="text-sm uppercase tracking-widest opacity-60 font-bold">{label}</span>
    </div>
  )
}
