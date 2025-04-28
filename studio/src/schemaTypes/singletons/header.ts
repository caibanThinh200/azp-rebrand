import {ComponentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const header = defineType({
  name: 'header',
  title: 'Điều hướng',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Tiêu đề',
      type: 'string',
    },
    {
      name: 'navItems',
      title: 'Trang điều hướng',
      type: 'array',
      of: [{type: 'reference', to: {type: 'page'}}],
    },
    {
      name: 'categories',
      title: 'Danh mục',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    // defineField({
    //   name: 'cta',
    //   title: 'CTA',
    //   type: 'link',
    //   options: {
    //     collapsible: true,
    //   },
    // }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Điều hướng',
      }
    },
  },
})
