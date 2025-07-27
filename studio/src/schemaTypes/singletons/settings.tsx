import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import * as demo from '../../lib/initialValues'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Chỉnh sửa website',
  type: 'document',
  icon: CogIcon,
  fields: [
    {
      name: 'contact',
      title: 'Thông tin liên hệ',
      type: 'blockContent',
    },
    {
      name: 'phone',
      description: "Mục này sẽ hiển thị rời rạc với thông tin liên hệ, vd: SDT nằm ở điều hướng trên website",
      title: 'Số điện thoại',
      type: 'string',
    },
     {
      name: 'facebook',
      description: "Mục này sẽ hiển thị rời rạc với thông tin liên hệ, vd: SDT nằm ở điều hướng trên website",
      title: 'Facebook',
      type: 'string',
    },
    {
      name: 'productNote',
      title: 'Lưu ý chung cho tất cả sản phẩm',
      type: 'text',
    },
    {
      name: 'productFilter',
      title: 'Bộ lọc sản phẩm',
      type: 'object',
      fields: [
        {name: 'minPrice', title: 'Giá thấp nhất', type: 'number', initialValue: 0},
        {name: 'maxPrice', title: 'Giá cao nhất', type: 'number', initialValue: 50000000},
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          description: 'This field is the title of your blog.',
          title: 'Title',
          type: 'string',
          initialValue: demo.title,
          validation: (rule) => rule.required(),
        },
        {
          name: 'description',
          description: 'Used both for the <meta> description tag for SEO, and the blog subheader.',
          title: 'Description',
          type: 'array',
          initialValue: demo.description,
          of: [
            // Define a minified block content field for the description. https://www.sanity.io/docs/block-content
            {
              type: 'block',
              options: {},
              styles: [],
              lists: [],
              marks: {
                decorators: [],
                annotations: [
                  {
                    type: 'object',
                    name: 'link',
                    fields: [
                      {
                        type: 'string',
                        name: 'href',
                        title: 'URL',
                        validation: (rule) => rule.required(),
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Displayed on social cards and search engine results.',
          options: {
            hotspot: true,
            aiAssist: {
              imageDescriptionField: 'alt',
            },
          },
          fields: [
            {
              name: 'alt',
              description: 'Important for accessibility and SEO.',
              title: 'Alternative text',
              type: 'string',
              validation: (rule) => {
                return rule.custom((alt, context) => {
                  if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                    return 'Required'
                  }
                  return true
                })
              },
            },
            {
              name: 'metadataBase',
              type: 'url',
              description: (
                <a
                  href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
                  rel="noreferrer noopener"
                >
                  More information
                </a>
              ),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
