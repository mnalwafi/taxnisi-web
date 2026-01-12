import { getPayload } from 'payload'
import config from '@/payload.config'
import ServicesClient from '@/components/ServicesClient' // <--- Use the new component

export const dynamic = 'force-dynamic'

// Add metadata (Static for now, or dynamic if you prefer)
export const metadata = {
  title: 'Our Expertise',
  description: 'Tax planning, auditing, and strategic financial consulting.',
}

export default async function ServicesPage() {
  const payload = await getPayload({ config })

  const { docs: services } = await payload.find({
    collection: 'services',
    sort: 'order', // Ensure you have an 'order' field or sort by 'createdAt'
  })

  return <ServicesClient services={services} />
}
