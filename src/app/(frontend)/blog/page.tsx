import { getPayload } from 'payload'
import config from '@/payload.config'
import BlogList from '@/components/BlogList'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    sort: '-publishedDate', // Newest first
    limit: 12,
  })

  return <BlogList posts={posts} />
}
