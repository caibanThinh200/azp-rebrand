import {Rule} from 'sanity'
import {WrenchIcon} from '@sanity/icons'

export default {
  name: 'property',
  title: 'Thuộc tính sản phẩm',
  type: 'document',
  icon: WrenchIcon,
  fields: [
    {
      name: 'title',
      title: 'Tên thuộc tính',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'values',
      title: 'Giá trị lọc',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      description: 'Nhập nhiều giá trị, mỗi giá trị sẽ là 1 option cho bộ lọc',
    },
  ],
}
