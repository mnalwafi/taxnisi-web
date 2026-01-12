import type { Metadata } from 'next'
import { Instrument_Serif, Outfit } from 'next/font/google'
import './styles.css'
import Header from '@/components/Header'
import SmoothScroll from '@/components/SmoothScroll'
import { LanguageProvider } from '@/context/LanguageContext'
import Footer from '@/components/Footer'

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
  title: {
    template: '%s | Taxnisi', // Creates "About | Taxnisi" automatically
    default: 'Taxnisi | Strategic Tax Consultancy', // Default if no title is set
  },
  description:
    'Helping ambitious enterprises navigate complex tax landscapes. We bring structural clarity to financial opacity.',
  openGraph: {
    title: 'Taxnisi | Strategic Tax Consultancy',
    description: 'Helping ambitious enterprises navigate complex tax landscapes.',
    url: 'https://taxnisi.com', // Replace with your actual domain later
    siteName: 'Taxnisi',
    images: [
      {
        url: '/og-image.jpg', // You should put a default branding image in your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-white text-black selection:bg-black selection:text-white">
        <LanguageProvider>
          <SmoothScroll />
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
