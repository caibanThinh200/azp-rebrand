export default {
  name: 'contactForm',
  title: 'Form liên lạc',
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
    },
    {
      name: 'description',
      title: 'Mô tả',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: {title: string}) {
      const {title} = selection
      return {
        title: `Form liên lạc: ${title}`,
      }
    },
  },
}
