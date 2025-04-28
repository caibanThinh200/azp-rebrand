import {ComponentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: ComponentIcon,
  preview: {
    prepare() {
      return {
        title: 'Chân trang',
      }
    },
  },
  fields: [
    // defineField({
    //   name: 'logo',
    //   title: 'Logo',
    //   type: 'image',
    //   validation: (Rule) => Rule.required(),
    // }),
    {
      name: 'headline',
      title: 'Tiêu đề',
      type: 'string',
    },
    {
      name: 'supportColumn',
      title: 'Hỗ trợ khách hàng',
      type: 'array',
      of: [
        {
          //   type: 'reference',
          //   to: [{type: 'page'}],
          type: 'link',
        },
      ],
    },
    {
      name: 'socials',
      title: 'Mạng xã hội',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'logo', title: 'Logo', type: 'image'},
            {name: 'name', title: 'Tên', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    },
    {
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
    },
  ],
})
