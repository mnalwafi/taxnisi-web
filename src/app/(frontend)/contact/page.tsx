'use client'

import React, { useActionState } from 'react' // Import useState
import { submitContact } from '@/actions/submitContact'
import FloatingInput from '@/components/ui/FloatingInput'
import MagneticButton from '@/components/ui/MagneticButton'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

const initialState = {
  success: false,
  error: '',
}

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState)

  // 1. Add Language State
  const { content } = useLanguage()

  return (
    <main className="w-full min-h-screen bg-[#f4f4f4] text-black">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* LEFT COLUMN */}
        <div className="w-full md:w-1/2 p-8 md:p-20 pt-32 flex flex-col justify-between bg-black text-white">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-50 block mb-8">
              {content.contact.label}
            </span>
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] mb-10">
              {content.contact.title}
            </h1>
            <p className="font-sans opacity-70 text-lg max-w-md">{content.contact.description}</p>
          </div>

          <div className="mt-20 md:mt-0">
            <p className="text-sm uppercase tracking-widest opacity-40 mb-2">
              {content.contact.email_label}
            </p>
            <a
              href="mailto:hello@taxnisi.com"
              className="text-2xl font-serif hover:italic transition-all"
            >
              hello@taxnisi.com
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-1/2 p-8 md:p-20 pt-32 bg-white flex flex-col justify-center">
          {state.success ? (
            <div className="text-center animate-pulse">
              <h2 className="font-serif text-5xl mb-4">{content.contact.form.success_title}</h2>
              <p className="opacity-60">{content.contact.form.success_desc}</p>
              <Link href="/">
                <button className="mt-8 border-b border-black text-sm uppercase tracking-widest">
                  {content.contact.form.back_home}
                </button>
              </Link>
            </div>
          ) : (
            <form action={formAction} className="max-w-lg w-full mx-auto">
              <FloatingInput name="name" label={content.contact.form.name} required />
              <FloatingInput
                name="email"
                type="email"
                label={content.contact.form.email}
                required
              />
              <FloatingInput name="company" label={content.contact.form.company} />
              <FloatingInput
                name="message"
                label={content.contact.form.message}
                multiline
                required
              />

              <div className="mt-12 flex items-center justify-between">
                {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

                <MagneticButton
                  type="submit"
                  disabled={isPending}
                  className="bg-black text-white px-12 py-4 rounded-full text-lg hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {isPending ? content.contact.form.sending : content.contact.form.submit}
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
