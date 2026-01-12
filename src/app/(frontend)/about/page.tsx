import { getPayload } from 'payload'
import config from '@/payload.config'
import AboutClient from './AboutClient'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const payload = await getPayload({ config })

  // Fetch Team
  const { docs: team } = await payload.find({
    collection: 'team',
    sort: 'createdAt',
  })

  return <AboutClient team={team} />
}
