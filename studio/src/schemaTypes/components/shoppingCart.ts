export default {
  name: 'shoppingCart',
  title: 'Giỏ hàng',
  type: 'object',
  preview: {
    prepare: () => 'Giỏ hàng',
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Tiêu đề',
    },
  ],
}
