import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description', // The short blurb visible when expanded
      type: 'textarea',
      required: true,
    },
    {
      name: 'features', // Bullet points
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
        },
      ],
    },
  ],
}
