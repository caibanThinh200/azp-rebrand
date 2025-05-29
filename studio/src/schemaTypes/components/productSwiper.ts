import {Rule} from 'sanity'

// schemas/productSwiper.js
export default {
  name: 'productSwiper',
  title: 'Danh sách dạng trượt',
  type: 'object',
  fields: [
    {
      name: 'thumbnail',
      title: 'Hình ảnh tham chiếu trên trang web',
      type: 'image',
    },
    {
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'products',
      title: 'Sản phẩm',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}], // References your existing product documents
          options: {
            filter: '', // Optional filter query for products
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: {title: string}) {
      const {title} = selection
      return {
        title: `Danh sách dạng trượt: ${title}`,
      }
    },
  },
}
