import { getPayload } from 'payload'
import config from '@/payload.config'
import ProjectClient from '@/components/ProjectClient' // <--- Import the new client component
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: slug } },
  })

  const project = docs[0]

  if (!project) return { title: 'Project Not Found' }

  const coverImage = project.coverImage as Media
  const imageUrl = coverImage?.url || '/og-image.jpg'

  return {
    title: `${project.title} | Case Study`,
    description: `Key Result: ${project.result}. A strategic intervention in the ${project.sector} sector by Taxnisi.`,
    openGraph: {
      title: project.title,
      description: `Key Result: ${project.result}`,
      images: [{ url: imageUrl }],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // 1. Fetch Current Project
  const { docs } = await payload.find({
    collection: 'case-studies',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!docs[0]) return notFound()

  const project = docs[0]

  // 2. Fetch "Next Project" for the footer
  const { docs: nextDocs } = await payload.find({
    collection: 'case-studies',
    limit: 1,
    where: {
      createdAt: {
        less_than: project.createdAt, // Get an older project (or just random)
      },
    },
  })

  return <ProjectClient project={project} nextProject={nextDocs[0] || null} />
}
