import type { GlobalConfig } from 'payload'

export const Statistics: GlobalConfig = {
  slug: 'statistics',
  label: 'Key Metrics',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'totalSaved',
          type: 'text',
          label: 'Total Tax Saved (e.g. "45M")',
          required: true,
          localized: true,
        },
        {
          name: 'averagePercentage',
          type: 'text',
          label: 'Avg. Reduction % (e.g. "35%")',
          required: true,
          localized: true,
        },
        {
          name: 'activeClients',
          type: 'text',
          label: 'Active Enterprise Clients (e.g. "150+")',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
