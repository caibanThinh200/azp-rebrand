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
              name: 'property',
              title: 'Property',
              type: 'reference',
              to: [{type: 'property'}],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              propertyName: 'property.name',
              value: 'value',
            },
            prepare({propertyName, value}: {propertyName?: string; value?: string}) {
              return {
                title: propertyName || 'Property',
                subtitle: value,
              }
            },
          },
        },
      ],
    }),
  ],
}
