'use client'

import React, { useState, useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { dictionary } from '@/lib/dictionaries'
import MagneticButton from '@/components/ui/MagneticButton'
import { useLanguage } from '@/context/LanguageContext'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang, content: dict } = useLanguage()
  const pathname = usePathname()

  const menuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  // GSAP Animation for the Curtain
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // We can define named timelines here if we want,
      // but for this simple toggle, we just need the context for cleanup on UNMOUNT.
    }, menuRef)
    return () => ctx.revert() // Only reverts when you leave the website/page entirely
  }, [])

  // 2. Handle Open/Close Animation Separately
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        // OPEN
        gsap.to(menuRef.current, {
          y: '0%',
          duration: 1,
          ease: 'power4.inOut',
        })
        gsap.fromTo(
          '.menu-link',
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.4,
            ease: 'power3.out',
          },
        )
      } else {
        // CLOSE
        gsap.to(menuRef.current, {
          y: '-100%',
          duration: 1,
          ease: 'power4.inOut',
        })
      }
    }, menuRef) // Scope to menuRef

    // NO REVERT HERE! We want the "Close" animation to play out.
    // If we revert, it snaps.
  }, [isOpen])

  // Don't show header on Studio (Admin) pages if you want,
  // but usually layout.tsx handles that.

  return (
    <>
      {/* 1. THE FIXED NAVBAR */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-[60] mix-blend-difference text-white">
        {/* Logo */}
        <Link href="/" className="font-bold tracking-widest text-sm uppercase">
          Taxnisi
        </Link>

        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="hidden md:flex gap-2 text-xs font-bold tracking-wide border border-white/30 rounded-full px-3 py-1">
            <button
              onClick={() => setLang('en')}
              className={`hover:opacity-100 transition-opacity ${lang === 'en' ? 'opacity-100' : 'opacity-40'}`}
            >
              EN
            </button>
            <span className="opacity-20">/</span>
            <button
              onClick={() => setLang('id')}
              className={`hover:opacity-100 transition-opacity ${lang === 'id' ? 'opacity-100' : 'opacity-40'}`}
            >
              ID
            </button>
          </div>

          {/* Menu Button (Hamburger) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex flex-col gap-[6px] w-8 cursor-pointer"
          >
            <span
              className={`block w-full h-[2px] bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}
            />
            <span
              className={`block w-full h-[2px] bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-full h-[2px] bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* 2. THE CURTAIN OVERLAY */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-screen bg-[#111] text-[#f4f4f4] z-[50] flex flex-col justify-center items-center translate-y-[-100%]"
      >
        <div ref={linksRef} className="flex flex-col items-center gap-8 text-center">
          {[
            { label: dict.menu.home, href: '/' },
            { label: dict.menu.about, href: '/about' },
            { label: dict.menu.works, href: '/case-studies' },
            { label: dict.menu.services, href: '/services' },
            { label: dict.menu.contact, href: '/contact' },
            { label: dict.menu.blog || 'Insights', href: '/blog' },
          ].map((link, i) => (
            <div key={i}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="menu-link block font-serif text-6xl md:text-8xl origin-center transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] hover:!-skew-x-12 hover:!scale-105 hover:!translate-x-2"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Footer info in menu */}
        <div className="absolute bottom-10 text-sm uppercase tracking-widest opacity-30">
          Taxnisi ©2026
        </div>
      </div>
    </>
  )
}
