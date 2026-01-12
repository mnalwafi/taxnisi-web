import { getPayload } from 'payload'
import config from '@/payload.config'
import CaseStudyGrid from '@/components/CaseStudyGrid'

export const dynamic = 'force-dynamic'

export default async function CaseStudiesPage() {
  const payload = await getPayload({ config })

  // Fetch ALL case studies
  const { docs: projects } = await payload.find({
    collection: 'case-studies',
    sort: '-createdAt',
    limit: 100, // Fetch plenty
  })

  return <CaseStudyGrid projects={projects} />
}
