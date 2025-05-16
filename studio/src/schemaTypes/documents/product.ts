import {Rule, defineField} from 'sanity'
import {PackageIcon} from '@sanity/icons'
import {ConditionalPropertiesInput} from '../../components/condition-properties-input'

export default {
  name: 'product',
  title: 'Sản phẩm',
  icon: PackageIcon,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tên sản phẩm',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'productId',
      title: 'Mã sản phẩm',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Link',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'originPrice',
      title: 'Giá tiền',
      description: 'Chỉ được nhập số, không cần thêm ký tự khác. Vd: 5 triệu = 5000000',
      type: 'number',
      validation: (Rule: Rule) => Rule.required().positive(),
    },
    {
      name: 'discountPrice',
      description: 'Chỉ được nhập số, không cần thêm ký tự khác. Vd: 5 triệu = 5000000',
      title: 'Giá tiền sau khi giảm',
      type: 'number',
      validation: (Rule: Rule) => Rule.required().positive(),
    },
    {
      name: 'description',
      title: 'Mô tả',
      type: 'text',
    },
    {
      name: 'content',
      title: 'Thông tin chi tiết',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'colors',
      title: 'Màu sắc',
      type: 'array',
      of: [
        {
          type: 'color',
          options: {
            colorList: [
              '#FF6900',
              {hex: '#FCB900'},
              {r: 123, g: 220, b: 181},
              {r: 0, g: 208, b: 132, a: 0.5},
              {h: 203, s: 95, l: 77, a: 1},
              {h: 202, s: 95, l: 46, a: 0.5},
              {h: 345, s: 43, v: 97},
              {h: 344, s: 91, v: 92, a: 0.5},
            ],
          },
        },
      ],
    },
    {
      name: 'property',
      title: 'Thông số',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'images',
      title: 'Hình ảnh',
      type: 'array',
      description: 'Hãy chọn hình ảnh có kích thước 300 × 300',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    },
    {
      name: 'category',
      title: 'Danh mục',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule: Rule) => Rule.required(),
    },
    defineField({
      name: 'properties',
      title: 'Thuộc tính sản phẩm',
      type: 'array',
      components: {
        input: ConditionalPropertiesInput,
      },
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Tên thuộc tính',
              type: 'string',

              // validation: (Rule) => Rule.required(),
            },
            {
              name: 'values',
              title: 'Value',
              type: 'string',
              // validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              values: 'values',
            },
            prepare({title, values}: {title?: string; values?: string}) {
              return {
                title: title || 'Property',
                subtitle: values,
              }
            },
          },
        },
      ],
    }),
  ],
}
