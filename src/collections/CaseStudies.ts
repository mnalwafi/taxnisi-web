import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true, // Important for URLs
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'sector',
      type: 'select',
      options: [
        { label: 'Technology', value: 'Technology' },
        { label: 'Finance', value: 'Finance' },
        { label: 'Legal', value: 'Legal' },
        { label: 'Retail', value: 'Retail' },
        { label: 'Healthcare', value: 'Healthcare' },
      ],
      required: true,
    },
    // --- MISSING FIELDS ADDED BELOW ---
    {
      name: 'client', // <--- Missing
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'date', // <--- Missing
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'url', // <--- Missing (Live Site Link)
      type: 'text',
      label: 'Live Website URL',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'result',
      type: 'text',
      required: true,
      label: 'Key Result (e.g. +300% Growth)',
    },
    {
      name: 'content', // <--- Missing (The main body text)
      type: 'richText',
      required: true,
    },
  ],
}
