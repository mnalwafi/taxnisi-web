import { getPayload } from 'payload'
import config from '@/payload.config'
import BlogPostClient from '@/components/BlogPostClient'
import { notFound } from 'next/navigation'
import { Media } from '@/payload-types'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
  })

  const post = docs[0]

  if (!post) {
    return { title: 'Post Not Found' }
  }

  // Safely get Image URL
  const coverImage = post.coverImage as Media
  const imageUrl = coverImage?.url || '/og-image.jpg' // Fallback

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: imageUrl }],
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
    },
  })

  if (!docs[0]) return notFound()

  return <BlogPostClient post={docs[0]} />
}
