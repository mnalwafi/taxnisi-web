'use client'

import React, { useState } from 'react'
import { dictionary } from '@/lib/dictionaries'
import TeamSlider from '@/components/TeamSlider'
import type { Team } from '@/payload-types'
import MagneticButton from '@/components/ui/MagneticButton'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutClient({ team }: { team: Team[] }) {
  const { content } = useLanguage()

  return (
    <main className="w-full bg-white text-black font-sans">
      {/* NAVBAR SPACER (Since navbar is fixed) */}
      <div className="pt-32 px-4 md:px-10 pb-20">
        {/* HERO: MANIFESTO */}
        <h1 className="font-serif text-[12vw] leading-[0.85] mb-20">{content.about.title}</h1>

        <div className="flex justify-end">
          <p className="max-w-2xl text-2xl md:text-4xl leading-relaxed font-light indent-20">
            {content.about.manifesto}
          </p>
        </div>
      </div>

      {/* HORIZONTAL SCROLL TEAM SECTION */}
      <TeamSlider team={team} label={content.about.team_label} />
    </main>
  )
}
