import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'url',
      options: {
        list: [
          {title: 'URL', value: 'href'},
          {title: 'Trang', value: 'page'},
          {title: 'Blog', value: 'post'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'href',
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'href' && !value) {
            return 'Yêu cầu nhập URL'
          }
          return true
        }),
    }),
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      hidden: ({parent}) => parent?.linkType !== 'post',
      validation: (Rule) =>
        // Custom validation to ensure post reference is provided if the link type is 'post'
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'post' && !value) {
            return 'Yêu cầu chọn bài viết'
          }
          return true
        }),
    },
    {
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    },
  ],
})
