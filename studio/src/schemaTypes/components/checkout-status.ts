export default {
    name: 'checkoutStatus',
    title: 'Trạng thái đặt hàng',
    type: 'object',
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
    // preview: {
    //   select: {
    //     title: 'title',
    //   },
    //   prepare(selection: {title: string}) {
    //     const {title} = selection
    //     return {
    //       title: `Form liên lạc: ${title}`,
    //     }
    //   },
    // },
  }
  