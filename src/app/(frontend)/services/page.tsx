import { getPayload } from 'payload'
import config from '@/payload.config'
import ServiceItem from '@/components/ServiceItem'
import { dictionary } from '@/lib/dictionaries' // For static labels

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const payload = await getPayload({ config })

  // Fetch Services from DB
  const { docs: services } = await payload.find({
    collection: 'services',
    sort: 'createdAt',
  })

  return (
    <main className="w-full min-h-screen bg-white text-black font-sans">
      {/* HEADER SPACER */}
      <div className="pt-40 px-4 md:px-10 pb-20 max-w-7xl mx-auto">
        <p className="text-sm uppercase tracking-widest opacity-50 font-bold mb-8">
          ( Our Expertise )
        </p>

        <h1 className="font-serif text-[10vw] leading-[0.85] mb-20 border-b border-black/10 pb-10">
          Comprehensive
          <br />
          Solutions.
        </h1>

        {/* SERVICE LIST */}
        <div className="w-full">
          {services.map((service, i) => (
            <ServiceItem key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
