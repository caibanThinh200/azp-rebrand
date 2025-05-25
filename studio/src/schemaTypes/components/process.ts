import {defineArrayMember, defineField, defineType} from 'sanity'

// In your schema file (e.g., ./schemas/blockContent.js)
const processStep = defineType({
  name: 'processStep',
  type: 'object',
  title: 'Quy trình',
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => ({
      title: `Quy trình: ${title}`,
    }),
  },
  fields: [
    {name: 'backgroundColor', title: 'Màu nền', type: 'color'},
    {name: 'title', title: 'Tiêu đề', type: 'string'},
    {
      name: 'steps',
      type: 'array',
      title: 'Các bước',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'title',
              description: 'description',
            },
            prepare: ({title, description}) => ({
              title,
              description,
            }),
          },
          fields: [
            {
              name: 'title',
              title: 'Tiêu đề',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Mô tả',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
})

export default processStep
