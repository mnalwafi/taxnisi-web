import React from 'react'
import NotFoundClient from '@/components/NotFoundClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  // We don't need <html> or <body> here because (frontend)/layout.tsx provides them!
  return <NotFoundClient />
}
