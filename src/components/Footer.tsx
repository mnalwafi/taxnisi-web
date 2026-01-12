'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MagneticButton from '@/components/ui/MagneticButton'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { content } = useLanguage() // <--- Hook for translation
  const pathname = usePathname()
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (pathname === '/contact') return null

  return (
    <footer className="bg-[#111] text-white pt-32 pb-10 px-4 md:px-10 rounded-t-3xl mt-[-20px] relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[60vh]">
        {/* TOP SECTION: CTA */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
            <h2 className="font-serif text-[12vw] leading-[0.8]">
              {content.footer.title} {/* Translated */}
            </h2>
            <Link href="/contact" className="mb-4 md:mb-8">
              <MagneticButton className="border border-white/20 bg-white/5 px-10 py-8 rounded-full hover:bg-white hover:text-black transition-all">
                <span className="text-xl md:text-2xl font-serif italic pr-4">
                  {content.footer.cta} {/* Translated */}
                </span>
                <span className="w-8 h-8 rounded-full bg-white text-black inline-flex items-center justify-center text-sm">
                  →
                </span>
              </MagneticButton>
            </Link>
          </div>

          <div className="w-full h-[1px] bg-white/10" />
        </div>

        {/* BOTTOM SECTION: LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-10">
          {/* Column 1: Brand */}
          <div className="flex flex-col justify-between h-full">
            <span className="font-bold text-2xl tracking-tighter">Taxnisi.</span>
            <span className="text-white/40 text-sm mt-4">
              {content.footer.location} <br />
              {time} WIB
            </span>
          </div>

          {/* Column 2: Sitemaps */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">
              {content.footer.sitemap} {/* Translated */}
            </span>
            <Link href="/" className="hover:underline opacity-70 hover:opacity-100">
              {content.menu.home}
            </Link>
            <Link href="/about" className="hover:underline opacity-70 hover:opacity-100">
              {content.menu.about}
            </Link>
            <Link href="/services" className="hover:underline opacity-70 hover:opacity-100">
              {content.menu.services}
            </Link>
            <Link href="/case-studies" className="hover:underline opacity-70 hover:opacity-100">
              {content.menu.works}
            </Link>
            <Link href="/blog" className="hover:underline opacity-70 hover:opacity-100">
              {content.menu.blog}
            </Link>
          </div>

          {/* Column 3: Socials */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">
              {content.footer.socials} {/* Translated */}
            </span>
            <a href="#" className="hover:underline opacity-70 hover:opacity-100">
              LinkedIn
            </a>
            <a
              href="instragram.com/taxnisi"
              className="hover:underline opacity-70 hover:opacity-100"
            >
              Instagram
            </a>
            <a href="#" className="hover:underline opacity-70 hover:opacity-100">
              Twitter / X
            </a>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col gap-2 md:text-right">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">
              {content.footer.legal} {/* Translated */}
            </span>
            <span className="opacity-40 text-sm">© 2026 Taxnisi Agency</span>
            <span className="opacity-40 text-sm">{content.footer.rights}</span> {/* Translated */}
          </div>
        </div>
      </div>
    </footer>
  )
}
