import { getPayload } from 'payload'
import config from '@/payload.config'
import LandingPage from '@/components/LandingPage'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const payload = await getPayload({ config })

  // 1. Fetch Clients
  const { docs: clients } = await payload.find({
    collection: 'clients',
    limit: 10,
  })

  // 2. Fetch Stats
  const stats = await payload.findGlobal({
    slug: 'statistics',
  })

  // 3. FETCH CASE STUDIES (New)
  const { docs: projects } = await payload.find({
    collection: 'case-studies',
    limit: 4, // Show top 4 projects
    sort: '-createdAt',
  })

  const { docs: services } = await payload.find({
    collection: 'services',
    sort: 'createdAt',
    limit: 6, // Limit to top 6 for homepage
  })

  // Pass 'projects' to the frontend component
  return <LandingPage clients={clients} stats={stats} projects={projects} services={services} />
}
