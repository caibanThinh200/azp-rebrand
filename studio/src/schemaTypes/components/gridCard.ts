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
      description:
        'Chọn kích thước hình ảnh theo từng bố cục sau: 1 hàng (1200 × 200 px), 1/2 hàng (596 × 200 px), 1/3 hàng (395 × 200 px), 1/4 (294 × 200 px)',
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
