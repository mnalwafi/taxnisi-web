import type { Metadata } from 'next'
import { Instrument_Serif, Outfit } from 'next/font/google' // <--- CHANGE THIS
import './styles.css'
import SmoothScroll from '@/components/SmoothScroll'
import Header from '@/components/Header'

const instrument = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument',
})

// "Outfit" is the best free alternative to Product Sans
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit', // <--- RENAME VARIABLE
})

export const metadata: Metadata = {
  title: 'Taxnisi - Strategic Tax Consulting',
  description: 'Advanced tax optimization for modern enterprises.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Update variable name here
    <html lang="en" className={`${instrument.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-white text-black selection:bg-black selection:text-white">
        <SmoothScroll />
        <Header />
        {children}
      </body>
    </html>
  )
}
