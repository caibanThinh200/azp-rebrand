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
    // defineField({
    //   name: 'linkType',
    //   title: 'Loại đường dẫn',
    //   type: 'string',
    //   initialValue: 'url',
    //   options: {
    //     list: [
    //       {title: 'URL', value: 'href'},
    //       {title: 'Trang', value: 'page'},
    //       // {title: 'Blog', value: 'post'},
    //     ],
    //     layout: 'radio',
    //   },
    // }),
    defineField({
      name: 'href',
      title: 'URL', 
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'href',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
          allowRelative: true
        }),
    }),
    {
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    },
  ],
})
