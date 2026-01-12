import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // Everyone can see the logos
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media', // Connects to your Media collection
      required: true,
    },
  ],
}
