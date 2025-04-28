import {defineField} from 'sanity'

export default defineField({
  name: 'blogContent',
  title: 'Quản lí bài viết',
  type: 'object',
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => {
      return {
        title: `Quản lí bài viết: ${title}`,
      }
    },
  },
  fields: [
    {
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
    },
    {
      name: 'thumbnail',
      title: 'Hình ảnh',
      description: 'Vui lòng chọn ảnh có kích thước 500x500px',
      hotspot: true,
      type: 'image',
    },
    {
      name: 'sections',
      title: 'Nội dung bài viết',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {type: 'string', name: 'title', title: 'Tiêu đề'},
            {
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              validation: (Rule) => Rule.required(),
              options: {
                source: (doc, ctx) => {
                  return (ctx?.parent as Record<string, {title: string}>)['title']
                },
                maxLength: 96,
              },
            },
            {type: 'blockContent', title: 'Nội dung', name: 'content'},
          ],
        },
      ],
    },
  ],
})
