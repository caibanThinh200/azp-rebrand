import {Rule, defineField} from 'sanity'
import {PackageIcon} from '@sanity/icons'
import {ConditionalPropertiesInput} from '../../components/condition-properties-input'
import {CategoryTreeInput} from '../../components/category-tree-input'
import {CategoryTreePreview} from '../../components/category-tree-preview'

export default {
  name: 'product',
  title: 'Sản phẩm',
  icon: PackageIcon,
  type: 'document',
  preview: {
    select: {
      productId: 'productId',
    },
    prepare: ({productId}: {productId: string}) => ({
      title: productId,
    }),
  },
  fields: [
    {
      name: 'productId',
      title: 'Mã sản phẩm',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Tên sản phẩm',
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
      title: 'Tóm tắt',
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
          type: 'string',
        },
      ],
    },
    {
      name: 'note',
      title: 'Lưu ý',
      type: 'text',
      initialValue: 'Lưu ý: Giá chưa bao gồm thuế GTGT & Phí Vận Chuyển, Phí Lắp Đặt nếu có.',
    },
    // {
    //   name: 'property',
    //   title: 'Thông số',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'block',
    //     },
    //     {
    //       type: 'image',
    //       fields: [
    //         {
    //           type: 'text',
    //           name: 'alt',
    //           title: 'Alternative text',
    //           options: {
    //             isHighlighted: true,
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
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
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      components: {
        input: CategoryTreeInput,
        preview: CategoryTreePreview,
      },
      autoGenerateArrayKeys: true,
      validation: (Rule: Rule) => Rule.required(),
    },
    defineField({
      name: 'properties',
      title: 'Thuộc tính sản phẩm',
      type: 'array',
      description: "Lưu ý: đối với thuộc tính yêu cầu nhập liệu tự do, sau khi nhập xong vui lòng bấm nút 'Lưu' để lưu lại thuộc tính",
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
