import {defineArrayMember, defineField, defineType} from 'sanity'

// In your schema file (e.g., ./schemas/blockContent.js)
const heroSlider = defineType({
  name: 'hero',
  type: 'object',
  title: 'Banner',
  preview: {
    select: {
      sliders: 'sliders',
    },
    prepare: ({sliders}) => ({
      title: `Banner`,
    }),
  },
  fields: [
    {
      name: 'sliders',
      type: 'array',
      title: 'Slide',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'title',
              description: 'description',
              thumbnail: 'thumbnail',
            },
            prepare: ({title, description, thumbnail}) => ({
              title,
              description,
              thumbnail,
            }),
          },
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
            },
            {
              name: 'description',
              title: 'Mô tả',
              type: 'string',
            },
            {
              name: 'image',
              type: 'image',
              description: 'Hãy chọn hình ảnh có kích thước 1200 x 400',
              title: 'Thumbnail',
            },
            {
              name: 'link',
              title: 'Đường dẫn',
              type: 'string',
            },
            {
              name: 'openNewTab',
              title: 'Mở dường dẫn trong tab mới ?',
              type: 'boolean',
            },
          ],
        },
      ],
    },
  ],
})

export default heroSlider
