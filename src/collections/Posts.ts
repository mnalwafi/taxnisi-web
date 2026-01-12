import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate'],
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
      unique: true,
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
      name: 'category',
      type: 'select',
      options: [
        { label: 'Tax Updates', value: 'Tax Updates' },
        { label: 'Regulatory', value: 'Regulatory' },
        { label: 'Business Strategy', value: 'Business Strategy' },
        { label: 'Company News', value: 'Company News' },
        { label: 'Insight', value: 'Insight' },
      ],
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team', // <--- Links to your Team Members
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt', // Short summary for the card
      type: 'textarea',
      required: true,
      maxLength: 200,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
