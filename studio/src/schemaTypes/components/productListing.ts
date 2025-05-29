export default {
  name: 'productListing',
  title: 'Danh sách sản phẩm',
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
      name: 'products',
      title: 'Sản phẩm',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    },
    {
      name: 'type',
      title: 'Phân trang | Xem thêm',
      type: 'string',
      options: {
        list: [
          {title: 'Xem thêm', value: 'seeMore'},
          {title: 'Phân trang', value: 'pagination'},
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: {title: string}) {
      const {title} = selection
      return {
        title: `Danh sách sản phẩm: ${title}`,
      }
    },
  },
}
