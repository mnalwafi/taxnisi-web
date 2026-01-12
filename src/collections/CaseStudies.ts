import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sector', 'result'],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
      localized: true, // <--- Add this!
    },
    {
      name: 'sector',
      type: 'text',
      required: true,
      label: 'Client Sector',
      localized: true, // <--- Add this!
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'URL identifier (e.g. "project-alpha")',
      },
      index: true, // Speeds up lookups
    },
    {
      name: 'result',
      type: 'text',
      required: true,
      label: 'Key Result',
      localized: true, // <--- Add this (e.g. "Saved $50k" vs "Hemat $50k")
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      // No localized: true here (same image for both languages)
    },
    {
      name: 'challenge',
      type: 'richText',
      label: 'The Challenge',
      localized: true, // <--- Add this!
    },
    {
      name: 'solution',
      type: 'richText',
      label: 'Our Solution',
      localized: true, // <--- Add this!
    },
  ],
}
