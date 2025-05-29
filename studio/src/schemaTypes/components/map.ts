export default {
  name: 'map',
  title: 'Map',
  type: 'object',
  fields: [
    {
      name: 'thumbnail',
      title: 'Hình ảnh tham chiếu trên trang web',
      type: 'image',
    },
    {
      name: 'address',
      title: 'Địa chỉ',
      type: 'string',
    },
    {
      name: 'code',
      title: 'Mã nhúng',
      type: 'string',
    },
  ],
  preview: {
    select: {
      address: 'address',
    },
    prepare(selection: {address: string}) {
      const {address} = selection
      return {
        title: `Bản đồ: ${address}`,
      }
    },
  },
}
