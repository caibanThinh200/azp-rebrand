// schemas/gridCard.js
export default {
  name: 'gridCard',
  title: 'Danh mục',
  type: 'object',
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}: {title: string}) {
      return {
        title: `Danh mục: ${title}`,
      }
    },
  },
  fields: [
    {
      name: 'title',
      title: 'Tiêu đề', // "Categories"
      type: 'string',
    },
    {
      name: 'categories',
      title: 'Danh mục', // "Categories"
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
    },
  ],
}
