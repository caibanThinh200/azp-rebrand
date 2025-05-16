import {defineType} from 'sanity'
import ReadOnly from '../../components/read-only'
import {BillIcon} from '@sanity/icons'

export const order = defineType({
  type: 'document',
  icon: BillIcon,
  name: 'order',
  title: 'Đơn hàng',
  readOnly: true,
  preview: {
    select: {
      id: '_id',
    },
    prepare: ({id}: {id: string}) => ({
      title: `Đơn hàng: ${id.slice(0, 10)}`,
    }),
  },
  fields: [
    {
      name: 'id',
      title: 'Mã đơn hàng',
      type: 'string',
      readOnly: true,
      components: {
        input: ReadOnly,
      },
    },
    {
      name: 'contact',
      title: 'Thông tin liên lạc',
      type: 'object',
      fields: [
        {name: 'fullName', title: 'Họ tên', type: 'string', readOnly: true},
        {name: 'address', title: 'Địa chỉ', type: 'string', readOnly: true},
        {name: 'email', title: 'Email', type: 'string', readOnly: true},
        {name: 'phone', title: 'SDT', type: 'string', readOnly: true},
        {name: 'note', title: 'Ghi chú', type: 'text', readOnly: true},
      ],
    },
    {
      name: 'orderSummary',
      title: 'Thông tin sản phẩm',
      type: 'object',
      fields: [
        {name: 'subTotal', title: 'Tổng tạm tính', type: 'number', readOnly: true},
        {name: 'ship', title: 'Phí Ship', type: 'number', readOnly: true},
        {name: 'tax', title: 'Thuế', type: 'number', readOnly: true},
        {name: 'total', title: 'Tổng hóa đơn', type: 'number', readOnly: true},
        {
          name: 'products',
          title: 'Sản phẩm',
          type: 'array',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'product.title',
                },
                prepare: ({title}: {title: string}) => ({
                  title,
                }),
              },
              fields: [
                {
                  type: 'product',
                  name: 'product',
                  title: 'Sản phẩm',
                  readOnly: true,
                },
                {
                  type: 'number',
                  name: 'quanity',
                  title: 'Số lượng',
                  readOnly: true,
                },
                {
                  type: 'number',
                  name: 'price',
                  title: 'Giá',
                  readOnly: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})
