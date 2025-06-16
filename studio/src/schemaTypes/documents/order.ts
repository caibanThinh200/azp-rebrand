import {defineType} from 'sanity'
import ReadOnly from '../../components/read-only'
import {BillIcon} from '@sanity/icons'
import {ContactInfoInput} from '../../components/contact-info-input'
import {OrderItemsTable} from '../../components/order-table'
import dayjs from 'dayjs'

export const order = defineType({
  type: 'document',
  icon: BillIcon,
  name: 'order',
  title: 'Đơn hàng',
  readOnly: true,
  preview: {
    select: {
      id: '_id',
      _createdAt: '_createdAt',
    },
    prepare: ({id, _createdAt}: {id: string; _createdAt: string}) => ({
      title: `Đơn hàng-${dayjs(_createdAt).format('DD/MM/YYYY-hh:mm:ss')}`,
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
      name: 'orderSummary',
      title: 'Thông tin sản phẩm',
      type: 'object',
      components: {
        input: OrderItemsTable,
      },
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
                  type: 'string',
                  name: 'color',
                  title: 'Màu sắc',
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
    {
      name: 'contact',
      title: 'Thông tin liên lạc',
      type: 'object',
      components: {
        input: ContactInfoInput,
      },
      fields: [
        {name: 'fullName', title: 'Họ tên', type: 'string', readOnly: true},
        {name: 'address', title: 'Địa chỉ', type: 'string', readOnly: true},
        {name: 'email', title: 'Email', type: 'string', readOnly: true},
        {name: 'phone', title: 'SDT', type: 'string', readOnly: true},
        {name: 'note', title: 'Ghi chú', type: 'text', readOnly: true},
      ],
    },
  ],
})
