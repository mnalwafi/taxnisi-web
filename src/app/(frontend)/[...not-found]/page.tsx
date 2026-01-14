import { notFound } from 'next/navigation'

export default function NotFoundCatchAll() {
  // This triggers the nearest not-found.tsx, which we will create next
  notFound()
}
